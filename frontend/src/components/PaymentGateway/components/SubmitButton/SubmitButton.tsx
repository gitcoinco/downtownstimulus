import React from "react";
import "./SubmitButton.scss";

const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    className={`SubmitButton top-margin-set ${
      error ? "SubmitButton--error" : ""
    }`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? "Processing..." : children}
  </button>
);

export default SubmitButton;
