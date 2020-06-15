import React from "react";
import "./ErrorMessage.scss";

const ErrorMessage = ({ children }) => (
  <div className="ErrorMessage" role="alert">
    {children}
  </div>
);

export default ErrorMessage;
