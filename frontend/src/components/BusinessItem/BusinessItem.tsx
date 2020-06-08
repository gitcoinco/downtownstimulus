import React, { useContext } from "react";
import "./BusinessItem.scss";
import { Link } from "react-router-dom";

function BusinessItem(props: any) {
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
        floatingContainer.style.marginTop =
          "-" + topMarginReq + "px" + " !important";
        console.log(floatingContainer.style.marginTop);
      }, 50);
    }
  }, [floatingImgId, floatingNameId]);

  return (
    <Link className="business-item" to="/business/1">
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
              props.hii === "true" ? "image 53" : "image 49"
            }.png`)}
            alt="logo-image"
            className="business-item-logo-image"
          />
        </div>
      </div>
      <h2 className="business-item-name" id={floatingNameId}>
        {props.hii === "true" ? "Cured" : "Art Source International"}
      </h2>
      <p className="business-item-description top-margin-set">
        {props.hii === "true"
          ? "...is a small shop focused on preserving a personal connection to food. We offer a hand-picked selection of cheeses, charcuterie, wines, Colorado beers and spirits, and unique grocery items,"
          : "...specializes in antique maps, prints, original and reproduced vintage posters. Custom framing with over 25 years of service to Boulder."}
      </p>
      <div className="business-item-progress-container">
        <div className="business-item-progress" style={{ width: "50%" }}></div>
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
    </Link>
  );
}

export default BusinessItem;
