import React, { useContext } from "react";
import "./Home.scss";
import { ActionContext, StateContext } from "../../hooks";
import HomeTopBar from "../HomeTopBar";
import BusinessItem from "../BusinessItem";

function Home() {
  const { setModalConfig } = useContext(ActionContext);
  const { user } = useContext(StateContext);

  return (
    <div className="home">
      <HomeTopBar></HomeTopBar>
      <ul className="business-list">
        <BusinessItem />
        <BusinessItem />
        <BusinessItem />
        <BusinessItem />
        <BusinessItem />
        <BusinessItem />
      </ul>
    </div>
  );
}

export default Home;
