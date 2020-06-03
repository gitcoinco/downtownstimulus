import React, { useContext } from "react";
import "./HomeTopBar.scss";
import { ActionContext, StateContext } from "../../hooks";
import { Search, ChevronDown } from "react-feather";
function HomeTopBar() {
  const { setModalConfig } = useContext(ActionContext);
  const { user } = useContext(StateContext);

  return (
    <div className="home-top-bar">
      <div className="app-icon-container">
        <img src={require("../../assets/app-icon.svg")} alt="app-icon" />
      </div>
      <h1 className="home-head-line">Support Local Businesses</h1>
      <p className="home-tag-line">Round 1 of the Downtown Stimulus</p>
      <div className="list-action-container">
        <div className="home-search-container">
          <Search></Search>
          <input
            type="search"
            className="search-input"
            placeholder="Quick Search"
          />
        </div>
        <div className="home-sort-container">
          <span>Sort By:</span>
          <div className="home-sort-value">
            <span>Least Funded</span>
            <ChevronDown></ChevronDown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeTopBar;
