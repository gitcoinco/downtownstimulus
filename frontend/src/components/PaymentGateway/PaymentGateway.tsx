import React, { useContext } from "react";
import { Elements } from "@stripe/react-stripe-js";
import "./PaymentGateway.scss";
import CheckoutForm from "./components/CheckoutForm";
import { StateContext } from "../../hooks";

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
    },
  ],
};

const PaymentGateway = () => {
  const { stripePromise } = useContext(StateContext);
  return (
    <div className="AppWrapper">
      <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default PaymentGateway;
