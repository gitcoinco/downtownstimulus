import React, { useContext, useEffect } from "react";
import "./Home.scss";
import { ActionContext, StateContext } from "../../hooks";
import HomeTopBar from "../HomeTopBar";
import BusinessItem from "../BusinessItem";

function Home() {
  const { setModalConfig } = useContext(ActionContext);
  const { businesses } = useContext(StateContext);

  return (
    <div className="home">
      <HomeTopBar></HomeTopBar>
      <ul className="business-list">
        {businesses.map((business, i) => (
          <BusinessItem key={i} business={business} />
        ))}
      </ul>
    </div>
  );
}

export default Home;
