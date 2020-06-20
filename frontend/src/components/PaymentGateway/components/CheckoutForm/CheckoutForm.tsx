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
  const { setModalConfig } = useContext(ActionContext);
  const { user, donationAmount, selectedBusiness } = useContext(StateContext);
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    name: "",
  });

  useEffect(() => {
    if (user) {
      setBillingDetails({ ...billingDetails, email: user.email });
    } else {
      setError({ message: "Please login first" });
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
        selectedBusiness.stripe_id
      ).subscribe(async (data) => {
        if (data.ok) {
          console.log("Success");
          const response = await data.json();
          console.log(response);
          const result = await stripe.confirmCardPayment(
            response.client_secret,
            {
              payment_method: {
                card: elements.getElement(CardElement),
                billing_details: billingDetails,
              },
            }
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
              console.log(result.paymentIntent);
              reset();
              setModalConfig(true, { type: "thankYouDonation" });
            }
          }
        } else {
          console.log("Error", await data.json());
        }
      });
    } else {
      setError({ message: "Please login first" });
    }
  };

  const reset = () => {
    setError(null);
    setProcessing(false);
    setBillingDetails({
      email: "",
      name: "",
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
        disabled={!stripe && !user}
      >
        Pay ${donationAmount}
      </SubmitButton>
    </form>
  );
};

export default CheckoutForm;
