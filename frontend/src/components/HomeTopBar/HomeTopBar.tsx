import React, { useContext } from "react";
import "./HomeTopBar.scss";
import { ActionContext, StateContext } from "../../hooks";
import { Search } from "react-feather";
function HomeTopBar() {
  const { searchBusinesses } = useContext(ActionContext);
  const { searchText, backupBusinesses, roundDetails } = useContext(StateContext);

  return (
    <div className="home-top-bar">
      {/* <div className="app-icon-container">
        <img src={require("../../assets/app-icon.svg")} alt="app-icon" />
      </div> */}
      <h1 className="home-head-line">Support Local Businesses</h1>
      {roundDetails.round_status === "Ongoing" ? (
        <div>
          <h3 className="home-tag-line">$25k Pilot Round Live Now</h3>
          <h4 className="home-tag-line">
            Contribute by July 15th 2020 to get your contribution Matched!
          </h4>
        </div>
      ) : (
        <p className="home-tag-line">
          <span role="img" aria-label="tada">
            🎉
          </span>{" "}
          <i>Important Note</i>: Round 1 of the Downtown Stimulus has closed! Thank
          you for your support!!{" "}
          <span role="img" aria-label="tada">
            🎉
          </span>
        </p>
      )}
      <div className="list-action-container">
        <div className="home-search-container">
          <Search></Search>
          <input
            type="search"
            className="search-input"
            placeholder="Quick Search"
            value={searchText}
            onChange={(e) => searchBusinesses(e.target.value, backupBusinesses)}
          />
        </div>
        {/* <div className="home-sort-container">
          <span>Sort By:</span>
          <div className="home-sort-value">
            <span>Least Funded</span>
            <ChevronDown></ChevronDown>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default HomeTopBar;
