import React, { useContext } from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container-left">
        <h3>About QF-For-Businesses</h3>
        <p>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut orci
          arcu. Integer semper lobortis eleifend. In id urna nec magna blandit
          tempor ornare sed purus. Nulla mattis magna ex, eu volutpat augue
          volutpat non. Nam tellus est, volutpat at viverra sit amet, interdum
          eget nulla. Nulla et tellus ut dolor lacinia egestas ut vitae urna.
          Aliquam sit amet tempus sapien, in varius massa. Etiam iaculis dolor
          odio, ut ultrices ex dignissim id. Nunc nec vestibulum est.{" "}
        </p>
        <h3>Legal Info</h3>
        <p>
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
      <div className="footer-container-right">
        <h3>Contact & Follow</h3>
        <div className="footer-contact-container">
          <span className="footer-contact-icon"></span>
          <span className="footer-contact-icon"></span>
          <span className="footer-contact-icon"></span>
          <span className="footer-contact-icon"></span>
        </div>
        <h3>Logos of Sponsors</h3>
        <div>
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
