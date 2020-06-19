import React, { useContext } from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container-left container-spacing-set">
        <h3 className="top-margin-set">About QF-For-Businesses</h3>
        <p className="top-margin-set">
          {" "}
          Downtown Stimulus is a democratic way of funding projects. They’ve put together a matching pool of $30k from local philanthropists that is going to be distributed to downtown Boulder Businesses, to help bridge the gap between normal and now.
        </p>
        <h3 className="top-margin-set">Legal Info</h3>
        <p className="top-margin-set bottom-margin-set">
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut orci
          arcu. Integer semper lobortis eleifend. In id urna nec magna blandit
          tempor ornare sed purus. Nulla mattis magna ex, eu volutpat augue
          volutpat non. Nam tellus est, volutpat at viverra sit amet, interdum
          eget nulla. Nulla et tellus ut dolor lacinia egestas ut vitae urna.
          Aliquam sit amet tempus sapien, in varius massa. Etiam iaculis dolor
          odio, ut ultrices ex dignissim id. Nunc nec vestibulum est.{" "}
        </p>
      </div>
      <div className="footer-container-right container-spacing-set">
        <h3 className="top-margin-set">Contact & Follow</h3>
        <div className="footer-contact-container top-margin-set">
          <span className="footer-contact-icon"><a href={"mailto: founders@gitcoin.co"}><img src={require("../../assets/email.svg")} alt="mail" /></a></span>
          <span className="footer-contact-icon"><a href={"https://twitter.com/gitcoin"} target="_blank"><img src={require("../../assets/tw.svg")} alt="twitter" /></a></span>
          <span className="footer-contact-icon"><a href={"https://medium.com/gitcoin"} target="_blank"><img src={require("../../assets/medium.svg")} alt="medium" /></a></span>
        </div>
        <h3 className="top-margin-set">Logos of Sponsors</h3>
        <div className="top-margin-set bottom-margin-set">
          <div className="footer-sponsors-icon">
            <a href={"https://gitcoin.co/"} target="_blank">
              <img src={require("../../assets/image 23.png")} alt="Gitcoin" />
            </a>
          </div>
          <div className="footer-sponsors-icon">
            <a href={"https://boulderstartupweek.com/"} target="_blank">
              <img src={require("../../assets/image 26.png")} alt="Boulder Startup Week" />
            </a>
          </div>
          <div className="footer-sponsors-icon">
            <a href={"https://labs.consensys.net/"} target="_blank">
              <img style={{height: "50px"}} src={"https://labs.consensys.net/static/45c707c85b9d26f5c1eb2976856974a7/af144/consensys-labs-typeface-logo-white.png"} alt="ConsenSys Labs" />
            </a>
          </div>
          <div className="footer-sponsors-icon">
            <a href={"https://www.boulderdowntown.com/"} target="_blank">
              <img style={{height: "150px"}} src={require("../../assets/boulderdowntown.jpg")} alt="Boulder Down Town" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
