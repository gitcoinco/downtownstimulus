import React, { useContext } from "react";
import "./Share.scss";
import { ActionContext, StateContext } from "../../hooks";
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
} from "react-share";
import copy from "clipboard-copy";

function Share() {
  const { setModalConfig } = useContext(ActionContext);
  const { selectedBusiness } = useContext(StateContext);
  const shareUrl = "https://www.boulderfund.com/-biznumber-refname";
  const title = "Boulder Fund Share";

  const copyShareUrl = (pValue: string) => {
    copy(pValue);
  };
  return (
    <div className="share">
      <h2 className="share-header top-margin-set">
        Help {selectedBusiness.name}‘s Fundraise!
      </h2>
      <p className="top-margin-set">
        Please considering sharing with your friends and family! If we all pitch
        in, we can keep our community a vital and vibrant place for locally
        owned businesses in this difficult time.
      </p>
      <div className="share-links-container top-margin-set">
        <div className="share-links-item">
          <div className="share-links-icon">
            <FacebookShareButton url={shareUrl} quote={title}>
              <FacebookIcon size={56} round />
            </FacebookShareButton>
          </div>
          <div>Facebook</div>
        </div>
        <div className="share-links-item">
          <div className="share-links-icon">
            <TwitterShareButton url={shareUrl} title={title}>
              <TwitterIcon size={56} round />
            </TwitterShareButton>
          </div>
          <div>Twitter</div>
        </div>
        <div className="share-links-item">
          <div className="share-links-icon">
            <img src={require("../../assets/mail.png")} alt="mail" />
          </div>
          <div>Mail</div>
        </div>
      </div>
      <div className="share-link-copy-container top-margin-set">
        <input
          type="text"
          className="share-link-copy-input"
          value="https://www.boulderfund.com/-biznumber-refname"
          disabled
        />
        <button
          className="share-link-copy-button"
          onClick={(e) =>
            copyShareUrl("https://www.boulderfund.com/-biznumber-refname")
          }
        >
          Copy
        </button>
      </div>
      <p className="top-margin-set">
        Finished sharing? Scroll down to check out a few more businesses that
        need our help and please consider donating to the local small businesses
        that make living in Boulder so amazing.
      </p>
    </div>
  );
}

export default Share;
