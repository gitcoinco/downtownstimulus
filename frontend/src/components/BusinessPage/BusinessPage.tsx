import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import "./BusinessPage.scss";
import {
  Globe,
  Facebook,
  Instagram,
  Target,
  CornerRightUp,
  DollarSign,
  Home,
  Share2,
  ChevronDown,
  ChevronUp,
} from "react-feather";
import StickyBox from "react-sticky-box";
import { ActionContext, StateContext } from "../../hooks";
import BusinessItem from "../BusinessItem";

function BusinessPage() {
  let { id } = useParams();
  const { setModalConfig, selectBusiness, fetchAllBusinesses } = useContext(
    ActionContext
  );
  const { backupBusinesses, selectedBusiness } = useContext(StateContext);

  const [donationType, setDonationType] = useState(0);
  const [donationAmount, setDonationAmount] = useState("1");

  useEffect(() => {
    fetchAllBusinesses();
    if (id) {
      selectBusiness(id);
    }
  }, [id]);

  const getExpenditureIcons = (type: string) => {
    switch (type) {
      case "Employee Salaries":
        return <DollarSign />;
      case "Rent":
        return <Home />;
      case "Inventory":
        return <Globe />;
    }
  };

  const decreaseDonation = () => {
    const amount = Number.parseInt(donationAmount);
    setDonationAmount(amount - 1 + "");
  };

  const increaseDonation = () => {
    const amount = Number.parseInt(donationAmount);
    setDonationAmount(amount + 1 + "");
  };
  return (
    <div className="business-page">
      {selectedBusiness ? (
        <>
          <div className="business-page-container">
            <div className="business-details-container">
              <div className="business-details-header-container">
                <img
                  src={selectedBusiness.main_business_image}
                  alt="cover"
                  className="business-details-cover-image"
                />
                <div className="business-details-cover-bottom-border"></div>
                <div className="business-details-floating-container">
                  <img
                    src={selectedBusiness.logo}
                    alt="business-icon"
                    className="business-details-floating-icon"
                  />
                  <h1 className="business-details-floating-title top-margin-set">
                    {selectedBusiness.name}
                  </h1>
                </div>
                <div className="business-details-body-links-container top-margin-set">
                  <a
                    className="business-details-links"
                    href={`https://${selectedBusiness.website_link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>
                      <Globe />
                    </span>
                    <span>{selectedBusiness.website_link}</span>
                  </a>
                  <a
                    className="business-details-links"
                    href={`https://facebook.com/${selectedBusiness.website_link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>
                      <Facebook />
                    </span>
                    <span>{selectedBusiness.facebook_profile_link}</span>
                  </a>
                  <a
                    className="business-details-links"
                    href={`https://instagram.com/${selectedBusiness.website_link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>
                      <Instagram />
                    </span>
                    <span>{selectedBusiness.instagram_profile_link}</span>
                  </a>
                </div>
              </div>
              <div className="business-details-body-container container-spacing-set">
                <p className="business-details-body-description top-margin-set">
                  {selectedBusiness.short_description}
                </p>
                <h2 className="business-details-body-title top-margin-set">
                  History of Company
                </h2>
                <p className="business-details-body-content top-margin-set">
                  {selectedBusiness.history}
                </p>
                <h2 className="business-details-body-title top-margin-set">
                  And Then COVID Happened...
                </h2>
                <p className="business-details-body-content top-margin-set">
                  {selectedBusiness.covid_story}
                </p>
                <p className="business-details-body-content top-margin-set">
                  Story about pivoting, and what’s provided.
                </p>
                <img
                  className="business-details-body-staff-images top-margin-set bottom-margin-set"
                  src={selectedBusiness.staff_images[0]}
                  alt="cover"
                ></img>
              </div>
            </div>
            <div className="business-donation-container">
              <StickyBox offsetTop={24} offsetBottom={24}>
                <div className="business-donation-widget-container container-spacing-set">
                  <h3 className="business-donation-widget-title top-margin-set">
                    Support {selectedBusiness.name}
                  </h3>
                  <div className="business-donation-progress-container">
                    <div
                      className="business-item-progress"
                      style={{
                        width:
                          (selectedBusiness.donation_received /
                            selectedBusiness.goal_amount) *
                            100 +
                          "%",
                      }}
                    ></div>
                  </div>
                  <div className="business-donation-progress-labels-container">
                    <span className="business-donation-progress-label">$0</span>
                    <span className="business-donation-progress-label">
                      ${selectedBusiness.goal_amount} goal
                    </span>
                  </div>
                  <a className="business-donation-qf-link top-margin-set bottom-margin-set">
                    Learn how our donation matching works
                  </a>
                  <div className="business-donation-tabs">
                    <div
                      className={`business-donation-tab-item ${
                        donationType === 0 ? "selected-tab" : ""
                      }`}
                      onClick={(e) => setDonationType(0)}
                    >
                      <span>
                        <Target />
                      </span>
                      <span className="tab-text">Set Amounts</span>
                    </div>
                    <div
                      className={`business-donation-tab-item ${
                        donationType === 1 ? "selected-tab" : ""
                      }`}
                      onClick={(e) => setDonationType(1)}
                    >
                      <span>
                        <CornerRightUp />
                      </span>
                      <span className="tab-text">Custom</span>
                    </div>
                  </div>
                  {donationType === 0 && (
                    <div className="business-donation-suggestions-lists">
                      <div className="business-donation-suggestion-item">
                        <div className="business-donation-suggestion-amount-container">
                          <span className="business-donation-suggestion-amount-sign">
                            $
                          </span>
                          <span className="business-donation-suggestion-amount">
                            10
                          </span>
                        </div>
                        <p className="business-donation-suggestion-match">
                          for a <b>$54</b> match
                        </p>
                        <div className="business-donation-suggestion-button-container">
                          <button
                            type="button"
                            className="business-donation-suggestion-button"
                            onClick={(e) =>
                              setModalConfig(true, { type: "payment" })
                            }
                          >
                            Donate
                          </button>
                        </div>
                      </div>
                      <div className="business-donation-suggestion-item">
                        <div className="business-donation-suggestion-best-match">
                          <img
                            src={require("../../assets/Group 56.svg")}
                            alt="smile"
                            className="business-best-match-icon"
                          />
                          <span>Best Match</span>
                        </div>
                        <div className="business-donation-suggestion-amount-container">
                          <span className="business-donation-suggestion-amount-sign">
                            $
                          </span>
                          <span className="business-donation-suggestion-amount">
                            23
                          </span>
                        </div>
                        <p className="business-donation-suggestion-match">
                          for a <b>$144</b> match
                        </p>
                        <div className="business-donation-suggestion-button-container">
                          <button
                            type="button"
                            className="business-donation-suggestion-button business-donation-best-match-button "
                            onClick={(e) =>
                              setModalConfig(true, { type: "payment" })
                            }
                          >
                            Donate
                          </button>
                        </div>
                      </div>
                      <div className="business-donation-suggestion-item">
                        <div className="business-donation-suggestion-amount-container">
                          <span className="business-donation-suggestion-amount-sign">
                            $
                          </span>
                          <span className="business-donation-suggestion-amount">
                            10
                          </span>
                        </div>
                        <p className="business-donation-suggestion-match">
                          for a <b>$54</b> match
                        </p>
                        <div className="business-donation-suggestion-button-container">
                          <button
                            type="button"
                            className="business-donation-suggestion-button"
                            onClick={(e) =>
                              setModalConfig(true, { type: "payment" })
                            }
                          >
                            Donate
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {donationType === 1 && (
                    <div className="business-donation-custom-container top-margin-set bottom-margin-set">
                      <label className="business-donation-custom-label">
                        Matched Amount
                      </label>
                      <div className="business-donation-custom-output bottom-margin-set">
                        <span className="business-donation-custom-output-label">
                          $
                        </span>
                        <span className="business-donation-custom-output-number">
                          {donationAmount}
                        </span>
                      </div>
                      <label className="business-donation-custom-label">
                        You Donate
                      </label>
                      <div className="business-donation-custom-input-container">
                        <div
                          className="business-donation-custom-input-button"
                          onClick={(e) => decreaseDonation()}
                        >
                          <ChevronDown />
                        </div>
                        <div className="business-donation-custom-input">
                          <span className="business-donation-custom-input-label">
                            $
                          </span>
                          <span>
                            <input
                              type="number"
                              className="business-donation-custom-input-number"
                              value={donationAmount}
                              onChange={(e) =>
                                setDonationAmount(e.target.value)
                              }
                            />
                          </span>
                        </div>
                        <div
                          className="business-donation-custom-input-button"
                          onClick={(e) => increaseDonation()}
                        >
                          <ChevronUp />
                        </div>
                      </div>
                      <div className="business-donation-donate-container top-margin-set">
                        <button
                          type="button"
                          className="business-donation-donate-button"
                          onClick={(e) =>
                            setModalConfig(true, { type: "share" })
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
                      onClick={(e) => setModalConfig(true, { type: "share" })}
                    >
                      <Share2 />
                      <span>SHARE</span>
                    </button>
                  </div>
                </div>
                <div className="business-donation-details-container container-spacing-set">
                  <h2>How we use the funds</h2>
                  <div className="business-donation-details-types-container top-margin-set">
                    {selectedBusiness.expenditure_details.map((tag) => (
                      <div className="business-donation-details-type">
                        <span>{getExpenditureIcons(tag)}</span>
                        <span>{tag}</span>
                      </div>
                    ))}
                  </div>
                  <p className="top-margin-set">
                    {selectedBusiness.other_content}
                  </p>
                </div>
              </StickyBox>
            </div>
          </div>
          <div className="other-business-container">
            <div className="other-business-list-container">
              <h2>Other Local Businesses</h2>
              <p>
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                ut orci arcu. Integer semper lobortis eleifend. In id urna nec
                magna blandit tempor ornare sed purus.
              </p>
              <ul className="business-list">
                {backupBusinesses.map((business, i) => (
                  <BusinessItem key={i} business={business} />
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default BusinessPage;
