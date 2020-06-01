import React, { useContext } from "react";
import "./Header.scss";
import { Home } from "react-feather";
import { ActionContext, StateContext } from "../../hooks";

function Header() {
  const { setModalConfig } = useContext(ActionContext);
  const { user } = useContext(StateContext);

  return (
    <div className="header">
      <div className="header-home-container">
        <Home />
      </div>
      <div className="header-profile-container">
        {user ? (
          <img src={user.photoURL} alt="profile" className="profile-icon" />
        ) : (
          <>
            <div
              className="profile-item"
              onClick={(e) => setModalConfig(true, { type: "signUp" })}
            >
              Create a new account
            </div>
            <div
              className="profile-item"
              onClick={(e) => setModalConfig(true, { type: "login" })}
            >
              Login
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
