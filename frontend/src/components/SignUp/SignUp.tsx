import React, { useContext } from "react";
import "./SignUp.scss";
import SocialLogin from "../SocialLogin";
import { ActionContext } from "../../hooks";

function SignUp() {
  const { setModalConfig } = useContext(ActionContext);
  return (
    <div className="signUp">
      <h2 className="login-header top-margin-set">Create an Account</h2>
      <SocialLogin type="signUp" />
      {/* <p className="login-text top-margin-set">
        Or create an account with your email address!
      </p>
      <div className="login-input-container top-margin-set">
        <label className="login-input-label">Email</label>
        <input
          type="email"
          placeholder="e.g. John Doe"
          className="login-input"
        />
      </div>
      <div className="login-input-container top-margin-set">
        <label className="login-input-label">Password</label>
        <input type="password" className="login-input" />
      </div> */}
      <div className="login-create-link-container top-margin-set">
        {/* eslint-disable-next-line */}
        <a
          className="login-create-link"
          onClick={(e) => setModalConfig(true, { type: "login" })}
        >
          Already have an account? Log in here.
        </a>
      </div>
      {/* <div className="login-email-submit-container top-margin-set">
        <button type="button" className="login-email-submit-button" >
          Create Account
        </button>
      </div> */}
    </div>
  );
}

export default SignUp;
