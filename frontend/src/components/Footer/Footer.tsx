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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut orci
          arcu. Integer semper lobortis eleifend. In id urna nec magna blandit
          tempor ornare sed purus. Nulla mattis magna ex, eu volutpat augue
          volutpat non. Nam tellus est, volutpat at viverra sit amet, interdum
          eget nulla. Nulla et tellus ut dolor lacinia egestas ut vitae urna.
          Aliquam sit amet tempus sapien, in varius massa. Etiam iaculis dolor
          odio, ut ultrices ex dignissim id. Nunc nec vestibulum est.{" "}
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
          <span className="footer-contact-icon"></span>
          <span className="footer-contact-icon"></span>
          <span className="footer-contact-icon"></span>
          <span className="footer-contact-icon"></span>
        </div>
        <h3 className="top-margin-set">Logos of Sponsors</h3>
        <div className="top-margin-set bottom-margin-set">
          <div className="footer-sponsors-icon">
            <img src={require("../../assets/image 23.png")} alt="" />
          </div>
          <div className="footer-sponsors-icon">
            <img src={require("../../assets/image 25.png")} alt="" />
          </div>
          <div className="footer-sponsors-icon">
            <img src={require("../../assets/image 27.png")} alt="" />
          </div>
          <div className="footer-sponsors-icon">
            <img src={require("../../assets/image 26.png")} alt="" />
          </div>
          <div className="footer-sponsors-icon">
            <img src={require("../../assets/image 24.png")} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
