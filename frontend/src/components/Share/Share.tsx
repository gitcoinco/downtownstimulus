import React, { useContext } from "react";
import "./Share.scss";
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

function Share() {
  const { selectedBusiness } = useContext(StateContext);
  const shareUrl = `https://downtownstimulus.com/business/${
    selectedBusiness.id
  }/${slugify(selectedBusiness.name)}`;
  const emailBody = `Great news -- we have been invited to participate in a pilot program called Downtown Stimulus that will distribute $30K to 6 local Boulder businesses over the next two weeks! The pilot runs through July 3 and the money will be distributed based on number and size of donations made to the participating businesses. All funds raised during this pilot will go to pay for ${selectedBusiness.expenditure_details.reduce(
    (prevDet: string, currDet: string) => `${prevDet}, ${currDet}`,
  )} and if the pilot is successful, it will be used as a template for helping keep downtowns all across America vibrant in spite of COVID-19. \n\nFollow the link in bio to our page where you can learn about our business, make a donation, and find all of the other great participating businesses! \n@downtownboulder @tridentboulder @pieceloveandchocolate @_jlounge_ @kondition_fitness @amanayoga @timewarp_comics \n\n#lovethelocal #downtownboulder #boulder #myboulder #bouldercolorado #pearlstreet #pearlstreetmall #colorado #coloradoliving`;

  const copyShareUrl = (pValue: string) => {
    copy(pValue);
  };
  return (
    <div className="share">
      <h2 className="share-header top-margin-set">
        Help {selectedBusiness.name}‘s Fundraise!
      </h2>
      <p className="top-margin-set">
        Please considering sharing with your friends and family! If we all pitch in,
        we can keep our community a vital and vibrant place for locally owned
        businesses in this difficult time.
      </p>
      <div className="share-links-container top-margin-set">
        <div className="share-links-item">
          <div className="share-links-icon">
            <FacebookShareButton url={shareUrl} quote={emailBody}>
              <FacebookIcon size={56} round />
            </FacebookShareButton>
          </div>
          <div>Facebook</div>
        </div>
        <div className="share-links-item">
          <div className="share-links-icon">
            <TwitterShareButton
              url={shareUrl}
              title={`Help ${selectedBusiness.name} and other local #boulder businesses and see every dollar matched! Check out @dtstimulus for more info!\n#lovethelocal #downtownboulder #boulder #myboulder #bouldercolorado #pearlstreet #pearlstreetmall #colorado #coloradoliving`}
            >
              <TwitterIcon size={56} round />
            </TwitterShareButton>
          </div>
          <div>Twitter</div>
        </div>
        <div className="share-links-item">
          <div className="share-links-icon">
            <EmailShareButton
              url={shareUrl}
              subject={`Help ${selectedBusiness.name}‘s Fundraise!`}
              body={emailBody}
            >
              <EmailIcon size={56} round />
            </EmailShareButton>
          </div>
          <div>Mail</div>
        </div>
      </div>
      <div className="share-link-copy-container top-margin-set">
        <input
          type="text"
          className="share-link-copy-input"
          value={shareUrl}
          disabled
        />
        <button
          className="share-link-copy-button"
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

export default Share;
