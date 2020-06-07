import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./PaymentGateway.scss";
import CheckoutForm from "./components/CheckoutForm";

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
    },
  ],
};

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const PaymentGateway = () => (
  <div className="AppWrapper">
    <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
      <CheckoutForm />
    </Elements>
  </div>
);

export default PaymentGateway;
