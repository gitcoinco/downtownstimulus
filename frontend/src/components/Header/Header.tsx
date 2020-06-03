import React, { useContext } from "react";
import "./Header.scss";
import { Home } from "react-feather";
import { ActionContext, StateContext } from "../../hooks";
import { Link } from "react-router-dom";

function Header() {
  const { setModalConfig } = useContext(ActionContext);
  const { user } = useContext(StateContext);

  return (
    <div className="header">
      <Link to="/" className="header-home-container">
        <Home />
      </Link>
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
