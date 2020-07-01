import React from "react";
import "./SubmitButton.scss";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    className={`SubmitButton top-margin-set ${error ? "SubmitButton--error" : ""}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? (
      <Loader type="Oval" color="#FFF" height={24} width={24} />
    ) : (
      children
    )}
  </button>
);

export default SubmitButton;
