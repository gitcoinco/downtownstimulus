import React, { useContext } from "react";
import "./BusinessItem.scss";
import { Link } from "react-router-dom";
import { ActionContext } from "../../hooks";
import slugify from "react-slugify";
import Truncate from "react-truncate";

function BusinessItem({ business }: any) {
  const { selectBusiness } = useContext(ActionContext);

  return (
    <Link
      className="business-item"
      to={`/business/${business.id}/${slugify(business.name)}`}
      onClick={(e) => selectBusiness(business.id)}
    >
      <div className="business-item-cover-image-container">
        <div className="business-item-header-container">
          <div>
            <div
              className="business-item-cover-image"
              style={{ backgroundImage: `url('${business.cover_image}')` }}
            ></div>
            <div className="business-item-cover-bottom-border"></div>
          </div>
          <div className="business-item-logo-image-container">
            <img
              src={business.logo}
              alt="logo"
              className="business-item-logo-image"
            />
          </div>
        </div>
      </div>
      <h2 className="business-item-name">{business.name}</h2>
      <p className="business-item-description top-margin-set">
        <Truncate lines={2} ellipsis={<span>...</span>}>
          {business.short_description}
        </Truncate>
      </p>
      <p className="top-margin-set business-donation-widget-donation-details">
        <span className="business-donation-widget-donation-details-amount">
          ${Number.parseFloat(business.donation_received).toFixed(2)}
        </span>{" "}
        donated +{" "}
        <span className="business-donation-widget-donation-details-amount">
          ${Number.parseFloat(business.current_clr_matching_amount).toFixed(2)}
        </span>{" "}
        estimated match
      </p>
      <div className="business-item-progress-container">
        <div
          className="business-item-progress"
          style={{
            width: `${
              ((Number.parseFloat(business.donation_received) +
                Number.parseFloat(business.current_clr_matching_amount)) /
                business.goal_amount) *
              100
            }%`,
          }}
        ></div>
      </div>
      <div className="business-item-progress-labels-container">
        <span className="business-item-progress-label">
          $
          {(
            Number.parseFloat(business.donation_received) +
            Number.parseFloat(business.current_clr_matching_amount)
          ).toFixed(0)}{" "}
          estimated total
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
