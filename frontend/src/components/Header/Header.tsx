import React, { useContext, useState } from "react";
import "./Header.scss";
import { Home, ChevronDown, ChevronUp } from "react-feather";
import { ActionContext, StateContext } from "../../hooks";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const { setModalConfig, logoutUser } = useContext(ActionContext);
  const { user } = useContext(StateContext);
  const [dropdownActive, setDropdownActive] = useState(false);
  return (
    <div
      className={`header ${
        location.pathname !== "/" ? "header-with-shadow" : ""
      }`}
    >
      <Link to="/" className="header-home-container">
        <Home />
      </Link>
      <div className="header-profile-container">
        {user ? (
          <>
            <img
              src={user.profile_pic}
              alt="profile"
              className="profile-icon"
            />
            <div
              className="header-profile-drop-down-icon"
              onClick={(e) => setDropdownActive(!dropdownActive)}
            >
              {!dropdownActive ? (
                <ChevronDown></ChevronDown>
              ) : (
                <ChevronUp></ChevronUp>
              )}
            </div>
          </>
        ) : (
          <>
            <div
              className="profile-item"
              onClick={(e) => setModalConfig(true, { type: "signUp" })}
            >
              Create an account
            </div>
            <div
              className="profile-item"
              onClick={(e) => setModalConfig(true, { type: "login" })}
            >
              Login
            </div>
          </>
        )}
        {dropdownActive && (
          <div
            className="menu-overlay"
            onClick={(e) => setDropdownActive(false)}
          ></div>
        )}
        {dropdownActive && (
          <div className="toolbar-menu-box">
            <div
              className="toolbar-menu-box-item"
              onClick={(e) => {
                setDropdownActive(false);
              }}
            >
              <Link className="toolbar-menu-box-item-title" to="/account">
                Account Info
              </Link>
            </div>
            <div
              className="toolbar-menu-box-item"
              onClick={(e) => {
                logoutUser();
                setDropdownActive(false);
              }}
            >
              <span className="toolbar-menu-box-item-title">Logout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
