import React, { useContext, useEffect } from "react";
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
} from "react-feather";
import { ActionContext, StateContext } from "../../hooks";
import BusinessItem from "../BusinessItem";

function BusinessPage() {
  let { id } = useParams();
  const { setModalConfig, selectBusiness } = useContext(ActionContext);
  const { backupBusinesses, selectedBusiness } = useContext(StateContext);

  useEffect(() => {
    if (id) {
      const selectedBusinessFound = backupBusinesses.filter(
        (business) => Number.parseInt(business.id) === Number.parseInt(id)
      )[0];
      selectBusiness(selectedBusinessFound);
    }
  }, [id]);
  return (
    <div className="business-page">
      {selectedBusiness ? (
        <>
          <div className="business-page-container">
            <div className="business-details-container">
              <div className="business-details-header-container">
                <img
                  src={require("../../assets/Rectangle 1.png")}
                  alt="cover"
                  className="business-details-cover-image"
                />
                <div className="business-details-cover-bottom-border"></div>
                <div className="business-details-floating-container">
                  <img
                    src={require("../../assets/image 49.png")}
                    alt="business-icon"
                    className="business-details-floating-icon"
                  />
                  <h1 className="business-details-floating-title top-margin-set">
                    {selectedBusiness.name}
                  </h1>
                </div>
                <div className="business-details-body-links-container top-margin-set">
                  <div className="business-details-links">
                    <span>
                      <Globe />
                    </span>
                    <span>chelseaboulder.com</span>
                  </div>
                  <div className="business-details-links">
                    <span>
                      <Facebook />
                    </span>
                    <span>chelsea.boulder</span>
                  </div>
                  <div className="business-details-links">
                    <span>
                      <Instagram />
                    </span>
                    <span>chelseas.boutique</span>
                  </div>
                </div>
              </div>
              <div className="business-details-body-container container-spacing-set">
                <p className="business-details-body-description top-margin-set">
                  {selectedBusiness.description}
                </p>
                <h2 className="business-details-body-title top-margin-set">
                  History of Company
                </h2>
                <p className="business-details-body-content top-margin-set">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  ut orci arcu. Integer semper lobortis eleifend. In id urna nec
                  magna blandit tempor ornare sed purus. Nulla mattis magna ex,
                  eu volutpat augue volutpat non.{" "}
                </p>
                <h2 className="business-details-body-title top-margin-set">
                  And Then COVID Happened...
                </h2>
                <p className="business-details-body-content top-margin-set">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  ut orci arcu. Integer semper lobortis eleifend. In id urna nec
                  magna blandit tempor ornare sed purus. Nulla mattis magna ex,
                  eu volutpat augue volutpat non. Nam tellus est, volutpat at
                  viverra sit amet, interdum eget nulla. Nulla et tellus ut
                  dolor lacinia egestas ut vitae urna. Aliquam sit amet tempus
                  sapien, in varius massa. Etiam iaculis dolor odio, ut ultrices
                  ex dignissim id. Nunc nec vestibulum est.
                </p>
                <p className="business-details-body-content top-margin-set">
                  Story about pivoting, and what’s provided.
                </p>
                <div className="business-details-body-staff-images top-margin-set bottom-margin-set"></div>
              </div>
            </div>
            <div className="business-donation-container">
              <div className="business-donation-widget-container container-spacing-set">
                <h3 className="business-donation-widget-title top-margin-set">
                  Support {selectedBusiness.name}
                </h3>
                <div className="business-donation-progress-container">
                  <div
                    className="business-item-progress"
                    style={{ width: selectedBusiness.donationPercent + "%" }}
                  ></div>
                </div>
                <div className="business-donation-progress-labels-container">
                  <span className="business-donation-progress-label">$0</span>
                  <span className="business-donation-progress-label">
                    ${selectedBusiness.donationCap} goal
                  </span>
                </div>
                <div className="business-donation-tabs">
                  <div className="business-donation-tab-item selected-tab">
                    <span>
                      <Target />
                    </span>
                    <span className="tab-text">Set Amounts</span>
                  </div>
                  <div className="business-donation-tab-item">
                    <span>
                      <CornerRightUp />
                    </span>
                    <span className="tab-text">Custom</span>
                  </div>
                </div>
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
                <a className="business-donation-qf-link">
                  How does Quadratic Funding Work?
                </a>
              </div>
              <div className="business-donation-details-container container-spacing-set">
                <h2>How we use the funds</h2>
                <div className="business-donation-details-types-container top-margin-set">
                  <div className="business-donation-details-type">
                    <span>
                      <DollarSign />
                    </span>
                    <span>Employee Salaries</span>
                  </div>
                  <div className="business-donation-details-type">
                    <span>
                      <Home />
                    </span>
                    <span>Rent</span>
                  </div>
                  <div className="business-donation-details-type">
                    <span>
                      <Globe />
                    </span>
                    <span>Inventory</span>
                  </div>
                </div>
                <p className="top-margin-set">
                  Our biggest cost is rent and employee salaries. If we hit our
                  goals, we’ll keep 4 of our staff of 20 on salary and be able
                  to pay for all full-time employee’s healthcare during their
                  furlough.{" "}
                </p>
              </div>
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
