import React, { useContext } from "react";
import "./SocialLogin.scss";
import { ActionContext } from "../../hooks";

function SocialLogin() {
  const { googleSignIn, facebookSignIn } = useContext(ActionContext);

  return (
    <>
      <div className="login-facebook-button-container">
        <button
          type="button"
          className="login-facebook-button"
          onClick={(e) => facebookSignIn()}
        >
          Login with Facebook
        </button>
      </div>
      <div className="login-google-button-container">
        <button
          type="button"
          className="login-google-button"
          onClick={(e) => googleSignIn()}
        >
          Login with Google
        </button>
      </div>
    </>
  );
}

export default SocialLogin;
