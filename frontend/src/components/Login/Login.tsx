import React, { useContext } from "react";
import "./Login.scss";
import SocialLogin from "../SocialLogin";
import { ActionContext } from "../../hooks";

function Login() {
  const { setModalConfig } = useContext(ActionContext);

  return (
    <div className="login">
      <h2 className="login-header top-margin-set">
        Login to Downtown Stimulus
      </h2>
      <SocialLogin type="login" />
      {/* <p className="login-text top-margin-set">Or login with your email!</p>
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
        <a
          className="login-create-link"
          onClick={(e) => setModalConfig(true, { type: "signUp" })}
        >
          Need to create an account? Click here!
        </a>
      </div>
      {/* <div className="login-email-submit-container top-margin-set">
        <button type="button" className="login-email-submit-button" disabled>
          Login
        </button>
      </div> */}
    </div>
  );
}

export default Login;
