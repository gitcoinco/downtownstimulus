import React, { useContext } from "react";
import "./BusinessItem.scss";
import { Link } from "react-router-dom";
import { ActionContext } from "../../hooks";

function BusinessItem({ hii, business }: any) {
  const { selectBusiness } = useContext(ActionContext);

  // dynamic styling for logo
  const [floatingImgId, setFloatingImgId] = React.useState("");
  const [floatingNameId, setFloatingNameId] = React.useState("");
  React.useEffect(() => {
    const randomID1 = (Math.random() * 1e32).toString(36).substring(0, 10);
    const randomID2 = (Math.random() * 1e32).toString(36).substring(0, 10);
    setFloatingImgId("floating-image-" + randomID1);
    setFloatingNameId("item-name-" + randomID2);
  }, []);

  React.useEffect(() => {
    if (floatingImgId !== "" && floatingNameId !== "") {
      setTimeout(() => {
        const floatingImg = document.getElementById(floatingImgId);
        const floatingHeight = floatingImg.offsetHeight;
        const topMarginReq = floatingHeight / 2 - 12;
        const floatingContainer = document.getElementById(floatingNameId);
        floatingContainer.style.setProperty(
          "margin-top",
          "-" + topMarginReq + "px",
          "important"
        );
      }, 50);
    }
  }, [floatingImgId, floatingNameId]);

  return (
    <Link
      className="business-item"
      to={`/business/${business.id}`}
      onClick={(e) => selectBusiness(business)}
    >
      <div className="business-item-cover-image-container">
        <img
          src={require("../../assets/image 48.png")}
          alt="cover-image"
          className="business-item-cover-image"
        />
        <div className="business-item-cover-bottom-border"></div>
        <div className="business-item-logo-image-container" id={floatingImgId}>
          <img
            src={require(`../../assets/${
              hii === "true" ? "image 53" : "image 49"
            }.png`)}
            alt="logo-image"
            className="business-item-logo-image"
          />
        </div>
      </div>
      <h2 className="business-item-name" id={floatingNameId}>
        {business.name}
      </h2>
      <p className="business-item-description top-margin-set">
        {business.description}
      </p>
      <div className="business-item-progress-container">
        <div
          className="business-item-progress"
          style={{ width: business.donationPercent + "%" }}
        ></div>
      </div>
      <div className="business-item-progress-labels-container">
        <span className="business-item-progress-label">$0</span>
        <span className="business-item-progress-label">
          ${business.donationCap} goal
        </span>
      </div>
      <div className="business-item-button-container">
        <button type="button" className="business-item-button">
          Read More
        </button>
      </div>
    </Link>
  );
}

export default BusinessItem;
