import React, { useContext } from "react";
import "./DonationThank.scss";
import { StateContext } from "../../hooks";
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import copy from "clipboard-copy";
import slugify from "react-slugify";

function DonationThank() {
  const { selectedBusiness, user } = useContext(StateContext);
  const shareUrl = `https://downtownstimulus.com/business/${
    selectedBusiness.id
  }/${slugify(selectedBusiness.name)}`;

  const copyShareUrl = (pValue: string) => {
    copy(pValue);
  };
  return (
    <div className="donation-thanks">
      <h2 className="donation-thanks-header top-margin-set">
        Thank you for your donation, {user.first_name} {user.last_name}!
      </h2>
      <div className="donation-thanks-company-container top-margin-set">
        <div className="donation-thanks-company-left">
          <img
            src={selectedBusiness.logo}
            alt="business logo"
            className="donation-thanks-company-logo"
          />
          <h3>{selectedBusiness.name}</h3>
        </div>
        <div className="donation-thanks-company-right">
          <p>
            "We can’t tell you what your donation means to us! Thank you for helping
            us weather the storm!"
          </p>
        </div>
      </div>
      <p className="top-margin-set">
        Please considering sharing with your friends and family! If we all pitch in,
        we can keep our community a vital and vibrant place for locally owned
        businesses in this difficult time.
      </p>
      <div className="donation-thanks-links-container top-margin-set">
        <div className="donation-thanks-links-item">
          <div className="donation-thanks-links-icon">
            <FacebookShareButton
              url={shareUrl}
              quote={`I just donated to ${selectedBusiness.name} as part of the Downtown Stimulus pilot program! \nFollow the link to donate to the 6 Boulder businesses participating in this new fundraiser aimed at distributing philanthropic funds to local businesses during the COVID-19 pandemic.`}
            >
              <FacebookIcon size={56} round />
            </FacebookShareButton>
          </div>
          <div>Facebook</div>
        </div>
        <div className="donation-thanks-links-item">
          <div className="donation-thanks-links-icon">
            <TwitterShareButton
              url={shareUrl}
              title={`I just donated to ${selectedBusiness.name} as part of the Downtown Stimulus pilot program! \nFollow the link to donate to the 6 Boulder businesses participating in this new fundraising pilot! `}
            >
              <TwitterIcon size={56} round />
            </TwitterShareButton>
          </div>
          <div>Twitter</div>
        </div>
        <div className="donation-thanks-links-item">
          <EmailShareButton
            url={shareUrl}
            subject={`Help ${selectedBusiness.name}‘s Fundraise!`}
            body={`I just donated to ${selectedBusiness.name} as part of the Downtown Stimulus pilot program! \nFollow the link to donate to the 6 Boulder businesses participating in this new fundraiser aimed at distributing philanthropic funds to local businesses during the COVID-19 pandemic.`}
          >
            <EmailIcon size={56} round />
          </EmailShareButton>
          <div>Mail</div>
        </div>
      </div>
      <div className="donation-thanks-link-copy-container top-margin-set">
        <input
          type="text"
          className="donation-thanks-link-copy-input"
          value={shareUrl}
          disabled
        />
        <button
          className="donation-thanks-link-copy-button"
          onClick={(e) => copyShareUrl(shareUrl)}
        >
          Copy
        </button>
      </div>
      <p className="top-margin-set">
        Finished sharing? Scroll down to check out a few more businesses that need
        our help and please consider donating to the local small businesses that make
        living in Boulder so amazing.
      </p>
    </div>
  );
}

export default DonationThank;
