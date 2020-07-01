import React, { useState, useContext, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./CheckoutForm.scss";
import Field from "../Field";
import CardField from "../CardField";
import ErrorMessage from "../ErrorMessage";
import SubmitButton from "../SubmitButton";
import { ActionContext, StateContext } from "../../../../hooks";
import { WebService } from "../../../../services";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { setModalConfig, fetchAllBusinesses, selectBusiness } = useContext(
    ActionContext,
  );
  const { user, donationAmount, selectedBusiness } = useContext(StateContext);
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    name: "",
    address: "",
    country: "",
  });

  useEffect(() => {
    if (user) {
      setBillingDetails({ ...billingDetails, email: user.email });
    } else {
      // setError({ message: "Please login first" });
      setModalConfig(true, { type: "login" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (user) {
      if (error) {
        elements.getElement("card").focus();
        return;
      }

      if (cardComplete) {
        setProcessing(true);
      }

      WebService.getClientSecretKey(
        donationAmount * 100,
        selectedBusiness.id,
        billingDetails.name,
        billingDetails.address,
        billingDetails.country,
      ).subscribe(async (data) => {
        if (data.ok) {
          const response = await data.json();
          const result = await stripe.confirmCardPayment(
            JSON.parse(response).secret_key,
            {
              payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                  email: billingDetails.email,
                  name: billingDetails.name,
                },
              },
            },
          );

          setProcessing(false);

          if (result.error) {
            setError(result.error);
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === "succeeded") {
              // Show a success message to your customer
              // There's a risk of the customer closing the window before callback
              // execution. Set up a webhook or plugin to listen for the
              // payment_intent.succeeded event that handles any business critical
              // post-payment actions.
              reset();
              setModalConfig(true, { type: "thankYouDonation" });
              setTimeout(() => {
                fetchAllBusinesses();
                selectBusiness(selectedBusiness.id);
              }, 5000);
            }
          }
        } else {
          // eslint-disable-next-line
          console.log("Error", await data.json());
        }
      });
    } else {
      // setError({ message: "Please login first" });
      setModalConfig(true, { type: "login" });
    }
  };

  const reset = () => {
    setError(null);
    setProcessing(false);
    setBillingDetails({
      email: "",
      name: "",
      address: "",
      country: "",
    });
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <div className="payment-title">Your card details</div>
      <fieldset className="FormGroup top-margin-set">
        <Field
          label="Name"
          id="name"
          type="text"
          placeholder="Jane Doe"
          required
          autoComplete="name"
          value={billingDetails.name}
          disabled={false}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, name: e.target.value });
          }}
        />
        <Field
          label="Email"
          id="email"
          type="email"
          placeholder="janedoe@gmail.com"
          required
          autoComplete="email"
          value={billingDetails.email}
          disabled={true}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, email: e.target.value });
          }}
        />
        <Field
          label="Address"
          id="address"
          type="text"
          placeholder="510 Townsend St"
          required
          autoComplete="address"
          value={billingDetails.address}
          disabled={false}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, address: e.target.value });
          }}
        />
        <Field
          label="Country"
          id="country"
          type="text"
          placeholder="US"
          required
          autoComplete="address"
          value={billingDetails.country}
          disabled={false}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, country: e.target.value });
          }}
        />
      </fieldset>
      <fieldset className="FormGroup top-margin-set">
        <CardField
          onChange={(e) => {
            setError(e.error);
            setCardComplete(e.complete);
          }}
        />
      </fieldset>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <SubmitButton
        processing={processing}
        error={error}
        disabled={!stripe || !user || !selectedBusiness.accepting_donations}
      >
        Pay ${donationAmount}
      </SubmitButton>
    </form>
  );
};

export default CheckoutForm;
