import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
import "./CardField.scss";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};
const CardField = ({ onChange }) => (
  <div className="FormRow">
    <CardElement options={CARD_ELEMENT_OPTIONS} onChange={onChange} />
  </div>
);

export default CardField;
