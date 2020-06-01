import React, { useContext } from "react";
import "./BusinessItem.scss";

function BusinessItem() {
  return (
    <li className="business-item">
      <div className="business-item-cover-image-container">
        <img
          src={require("../../assets/image 48.png")}
          alt="cover-image"
          className="business-item-cover-image"
        />
        <div className="business-item-cover-bottom-border"></div>
      </div>
      <div className="business-item-logo-image-container">
        <img
          src={require("../../assets/image 49.png")}
          alt="logo-image"
          className="business-item-logo-image"
        />
      </div>
      <h2 className="business-item-name">Chelsea Boutique</h2>
      <p className="business-item-description">
        is a women's designer boutique that has been a Boulder favorite for over
        fifteen years.
      </p>
      <div className="business-item-progress-container">
        <div className="business-item-progress"></div>
      </div>
      <div className="business-item-progress-labels-container">
        <span className="business-item-progress-label">$0</span>
        <span className="business-item-progress-label">$5,500 goal</span>
      </div>
      <div className="business-item-button-container">
        <button type="button" className="business-item-button">
          Read More
        </button>
      </div>
    </li>
  );
}

export default BusinessItem;
