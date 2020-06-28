import React, { useContext } from "react";
import "./BusinessItem.scss";
import { Link } from "react-router-dom";
import { ActionContext } from "../../hooks";
import slugify from "react-slugify";
import Truncate from "react-truncate";

function BusinessItem({ business }: any) {
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
      }, 100);
    }
  }, [floatingImgId, floatingNameId]);

  return (
    <Link
      className="business-item"
      to={`/business/${business.id}/${slugify(business.name)}`}
      onClick={(e) => selectBusiness(business.id)}
    >
      <div className="business-item-cover-image-container">
        {/* <img
          src={business.cover_image}
          alt="cover-image"
          className="business-item-cover-image"
        /> */}
        <div
          className="business-item-cover-image"
          style={{ backgroundImage: `url('${business.cover_image}')` }}
        ></div>
        <div className="business-item-cover-bottom-border"></div>
        <div className="business-item-logo-image-container" id={floatingImgId}>
          <img
            src={business.logo}
            alt="logo"
            className="business-item-logo-image"
          />
        </div>
      </div>
      <h2 className="business-item-name" id={floatingNameId}>
        {business.name}
      </h2>
      <p className="business-item-description top-margin-set">
        <Truncate lines={2} ellipsis={<span>...</span>}>
          {business.short_description}
        </Truncate>
      </p>
      <div className="business-item-progress-container">
        <div
          className="business-item-progress"
          style={{
            width:
              (business.current_clr_matching_amount / business.goal_amount) *
                100 +
              "%",
          }}
        ></div>
      </div>
      <div className="business-item-progress-labels-container">
        <span className="business-item-progress-label">
          ${Number.parseFloat(business.current_clr_matching_amount).toFixed(0)}{" "}
          matched
        </span>
        <span className="business-item-progress-label">
          ${business.goal_amount} goal
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
