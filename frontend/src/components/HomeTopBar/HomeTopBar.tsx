import React, { useContext } from "react";
import "./HomeTopBar.scss";
import { ActionContext, StateContext } from "../../hooks";

function HomeTopBar() {
  const { setModalConfig } = useContext(ActionContext);
  const { user } = useContext(StateContext);

  return (
    <div className="home-top-bar">
      <div></div>
      <h1 className="home-head-line">Support Local Businesses</h1>
      <p className="home-tag-line">Round 1 of the Downtown Stimulus</p>
      <div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default HomeTopBar;
