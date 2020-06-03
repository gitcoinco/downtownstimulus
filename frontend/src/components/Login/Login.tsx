import React, { useContext } from "react";
import "./Login.scss";
import SocialLogin from "../SocialLogin";
import { ActionContext } from "../../hooks";

function Login() {
  const { setModalConfig } = useContext(ActionContext);

  return (
    <>
      <h2 className="login-header">Login to Downtown Stimulus</h2>
      <SocialLogin />
      <p className="login-text">Or login with your email!</p>
      <div className="login-input-container">
        <label className="login-input-label">Email</label>
        <input
          type="email"
          placeholder="e.g. John Doe"
          className="login-input"
        />
      </div>
      <div className="login-input-container">
        <label className="login-input-label">Password</label>
        <input type="password" className="login-input" />
      </div>
      <a
        className="login-create-link"
        onClick={(e) => setModalConfig(true, { type: "signUp" })}
      >
        Need to create an account? Click here!
      </a>
      <div className="login-email-submit-container">
        <button type="button" className="login-email-submit-button">
          Login
        </button>
      </div>
    </>
  );
}

export default Login;
