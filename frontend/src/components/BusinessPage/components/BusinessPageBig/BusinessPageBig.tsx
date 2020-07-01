import React from "react";
import {
  Globe,
  Facebook,
  Instagram,
  Target,
  CornerRightUp,
  Share2,
} from "react-feather";
import StickyBox from "react-sticky-box";
import DonationCustomInput from "../DonationCustomInput";
import NumberFormat from "react-number-format";

function BusinessPageBig(props) {
  return props.selectedBusiness ? (
    <>
      <div className="business-page-container-big">
        <div className="business-details-container">
          <div className="business-details-header-container">
            <div
              className="business-details-cover-image"
              style={{
                background: `linear-gradient(360deg, rgba(0, 0, 0, 0.49) 0%, rgba(0, 0, 0, 0) 94.89%), url(${props.selectedBusiness.main_business_image})`,
              }}
            ></div>
            <div className="business-details-cover-bottom-border"></div>
            <div className="business-details-floating-container">
              <img
                src={props.selectedBusiness.logo}
                alt="business-icon"
                className="business-details-floating-icon"
              />
              <h1 className="business-details-floating-title top-margin-set">
                {props.selectedBusiness.name}
              </h1>
            </div>
            <div className="business-details-body-links-container top-margin-set">
              <a
                className="business-details-links"
                href={`https://${props.selectedBusiness.website_link}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <Globe />
                </span>
                <span>{props.selectedBusiness.website_link}</span>
              </a>
              <a
                className="business-details-links"
                href={`https://facebook.com/${props.selectedBusiness.facebook_profile_link}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <Facebook />
                </span>
                <span>{props.selectedBusiness.facebook_profile_link}</span>
              </a>
              <a
                className="business-details-links"
                href={`https://instagram.com/${props.selectedBusiness.instagram_profile_link}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <Instagram />
                </span>
                <span>{props.selectedBusiness.instagram_profile_link}</span>
              </a>
            </div>
          </div>
          <div className="business-details-body-container container-spacing-set">
            <p className="business-details-body-description top-margin-set">
              {props.selectedBusiness.short_description}
            </p>
            <h2 className="business-details-body-title top-margin-set">
              History of Company
            </h2>
            <p className="business-details-body-content top-margin-set">
              {props.selectedBusiness.history}
            </p>
            {props.selectedBusiness.business_video_link && (
              <div className="top-margin-set ">
                <iframe
                  className="business-detail-video-iframe"
                  src={props.selectedBusiness.business_video_link}
                  frameBorder="0"
                  title="business youtube video"
                />
              </div>
            )}
            <h2 className="business-details-body-title top-margin-set">
              And Then COVID Happened...
            </h2>
            <p className="business-details-body-content top-margin-set">
              {props.selectedBusiness.covid_story}
            </p>
            <img
              className="business-details-body-staff-images top-margin-set bottom-margin-set"
              src={props.selectedBusiness.staff_images[0]}
              alt="cover"
            ></img>
          </div>
        </div>
        <div className="business-donation-container">
          <StickyBox offsetTop={24} offsetBottom={24}>
            <div className="business-donation-widget-container container-spacing-set">
              <h3 className="business-donation-widget-title top-margin-set">
                Support {props.selectedBusiness.name}
              </h3>
              <p className="top-margin-set business-donation-widget-donation-details">
                <span className="business-donation-widget-donation-details-amount">
                  <NumberFormat
                    value={Number.parseFloat(
                      props.selectedBusiness.donation_received,
                    ).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </span>{" "}
                donated +{" "}
                <span className="business-donation-widget-donation-details-amount">
                  <NumberFormat
                    value={Number.parseFloat(
                      props.selectedBusiness.current_clr_matching_amount,
                    ).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </span>{" "}
                estimated match
              </p>
              <div className="business-donation-progress-container">
                <div
                  className="business-item-progress"
                  style={{
                    width: `${
                      ((Number.parseFloat(props.selectedBusiness.donation_received) +
                        Number.parseFloat(
                          props.selectedBusiness.current_clr_matching_amount,
                        )) /
                        props.selectedBusiness.goal_amount) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
              <div className="business-donation-progress-labels-container">
                <span className="business-donation-progress-label">
                  <NumberFormat
                    value={(
                      Number.parseFloat(props.selectedBusiness.donation_received) +
                      Number.parseFloat(
                        props.selectedBusiness.current_clr_matching_amount,
                      )
                    ).toFixed(0)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />{" "}
                  estimated total
                </span>
                <span className="business-donation-progress-label">
                  <NumberFormat
                    value={props.selectedBusiness.goal_amount}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />{" "}
                  goal
                </span>
              </div>
              {props.roundDetails.round_status === "Completed" && (
                <p className="top-margin-set complete-round-content">
                  <span role="img" aria-label="tada">
                    🎉
                  </span>{" "}
                  Important Note: Round 1 of the Downtown Stimulus has closed! Thank
                  you for your support!!{" "}
                  <span role="img" aria-label="tada">
                    🎉
                  </span>
                </p>
              )}
              {/* eslint-disable-next-line */}
              <a
                className="business-donation-qf-link top-margin-set bottom-margin-set"
                onClick={(e) => props.setModalConfig(true, { type: "qfExplainer" })}
              >
                Learn how our donation matching works
              </a>
              {props.roundDetails.round_status === "Ongoing" && (
                <>
                  <div className="business-donation-tabs">
                    <div
                      className={`business-donation-tab-item ${
                        props.donationType === 0 ? "selected-tab" : ""
                      }`}
                      onClick={(e) => props.setDonationType(0)}
                    >
                      <span>
                        <Target />
                      </span>
                      <span className="tab-text">Set Amounts</span>
                    </div>
                    <div
                      className={`business-donation-tab-item ${
                        props.donationType === 1 ? "selected-tab" : ""
                      }`}
                      onClick={(e) => props.setDonationType(1)}
                    >
                      <span>
                        <CornerRightUp />
                      </span>
                      <span className="tab-text">Custom</span>
                    </div>
                  </div>
                  {Number.parseInt(
                    props.selectedBusiness.current_clr_matching_amount,
                  ) >= 8000 && (
                    <p className="top-margin-set complete-round-content">
                      <span role="img" aria-label="tada">
                        🎉
                      </span>{" "}
                      Important Note: <b>{props.selectedBusiness.name}</b> is
                      currently at max limit of CLR Match!!{" "}
                      <span role="img" aria-label="tada">
                        🎉
                      </span>
                    </p>
                  )}
                  {props.donationType === 0 && (
                    <div className="business-donation-suggestions-lists">
                      <div
                        className="business-donation-suggestion-item"
                        onClick={(e) => {
                          props.setDonationAmountState(10);
                          props.setModalConfig(true, { type: "payment" });
                        }}
                      >
                        <div className="business-donation-suggestion-amount-container">
                          <span className="business-donation-suggestion-amount-sign">
                            $
                          </span>
                          <span className="business-donation-suggestion-amount">
                            10
                          </span>
                        </div>
                        {Number.parseInt(
                          props.selectedBusiness.current_clr_matching_amount,
                        ) < 8000 && (
                          <span className="business-donation-suggestion-match">
                            Estimated match of{" "}
                            <b>
                              <NumberFormat
                                value={
                                  props.fixedDonationMatching[0].toFixed(2) < 0
                                    ? 0
                                    : props.fixedDonationMatching[0].toFixed(2)
                                }
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                              />
                            </b>
                          </span>
                        )}
                        <div className="business-donation-suggestion-button-container top-margin-set">
                          <button
                            type="button"
                            className="business-donation-suggestion-button"
                          >
                            Donate
                          </button>
                        </div>
                      </div>
                      <div
                        className="business-donation-suggestion-item"
                        onClick={(e) => {
                          props.setDonationAmountState(50);
                          props.setModalConfig(true, { type: "payment" });
                        }}
                      >
                        <div className="business-donation-suggestion-amount-container">
                          <span className="business-donation-suggestion-amount-sign">
                            $
                          </span>
                          <span className="business-donation-suggestion-amount">
                            50
                          </span>
                        </div>
                        {Number.parseInt(
                          props.selectedBusiness.current_clr_matching_amount,
                        ) < 8000 && (
                          <span className="business-donation-suggestion-match">
                            Estimated match of{" "}
                            <b>
                              <NumberFormat
                                value={
                                  props.fixedDonationMatching[1].toFixed(2) < 0
                                    ? 0
                                    : props.fixedDonationMatching[1].toFixed(2)
                                }
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                              />
                            </b>
                          </span>
                        )}
                        <div className="business-donation-suggestion-button-container top-margin-set">
                          <button
                            type="button"
                            className="business-donation-suggestion-button"
                          >
                            Donate
                          </button>
                        </div>
                      </div>
                      <div
                        className="business-donation-suggestion-item"
                        onClick={(e) => {
                          props.setDonationAmountState(100);
                          props.setModalConfig(true, { type: "payment" });
                        }}
                      >
                        <div className="business-donation-suggestion-amount-container">
                          <span className="business-donation-suggestion-amount-sign">
                            $
                          </span>
                          <span className="business-donation-suggestion-amount">
                            100
                          </span>
                        </div>
                        {Number.parseInt(
                          props.selectedBusiness.current_clr_matching_amount,
                        ) < 8000 && (
                          <span className="business-donation-suggestion-match">
                            Estimated match of{" "}
                            <b>
                              <NumberFormat
                                value={
                                  props.fixedDonationMatching[2].toFixed(2) < 0
                                    ? 0
                                    : props.fixedDonationMatching[2].toFixed(2)
                                }
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                              />
                            </b>
                          </span>
                        )}
                        <div className="business-donation-suggestion-button-container top-margin-set">
                          <button
                            type="button"
                            className="business-donation-suggestion-button"
                          >
                            Donate
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {props.donationType === 1 && (
                    <div className="business-donation-custom-container top-margin-set bottom-margin-set">
                      <label className="business-donation-custom-label">
                        Donate
                      </label>
                      <div className="business-donation-custom-input-container">
                        <div className="business-donation-custom-input">
                          <span className="business-donation-custom-input-label">
                            $
                          </span>
                          <span>
                            <DonationCustomInput
                              handleCustomClrMatchingAmount={
                                props.handleCustomClrMatchingAmount
                              }
                              setDonationAmountState={props.setDonationAmountState}
                            />
                          </span>
                        </div>
                      </div>
                      {Number.parseInt(
                        props.selectedBusiness.current_clr_matching_amount,
                      ) < 8000 && (
                        <p className="business-donation-custom-match bottom-margin-set">
                          Estimated match of{" "}
                          <span className="business-donation-custom-match-amount">
                            <NumberFormat
                              value={
                                props.customDonationMatching[0].toFixed(2) < 0
                                  ? 0
                                  : Math.abs(
                                      props.customDonationMatching[0].toFixed(2),
                                    )
                              }
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                            />
                          </span>
                        </p>
                      )}
                      <div className="business-donation-donate-container top-margin-set">
                        <button
                          type="button"
                          className="business-donation-donate-button"
                          onClick={(e) =>
                            props.setModalConfig(true, { type: "payment" })
                          }
                        >
                          <span>DONATE</span>
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="business-donation-share-container">
                    <button
                      type="button"
                      className="business-donation-share-button"
                      onClick={(e) => props.setModalConfig(true, { type: "share" })}
                    >
                      <Share2 />
                      <span>SHARE</span>
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="business-donation-details-container container-spacing-set">
              <h2>How we use the funds</h2>
              <div className="business-donation-details-types-container top-margin-set">
                {props.selectedBusiness.expenditure_details.map(
                  (tag: any, i: number) => (
                    <div className="business-donation-details-type" key={i}>
                      <span>{props.getExpenditureIcons(tag)}</span>
                      <span>{tag}</span>
                    </div>
                  ),
                )}
              </div>
              <p className="top-margin-set">
                {props.selectedBusiness.other_content}
              </p>
            </div>
          </StickyBox>
        </div>
      </div>
    </>
  ) : null;
}

export default BusinessPageBig;
