import React, { useContext } from "react";
import "./Home.scss";
import { ActionContext, StateContext } from "../../hooks";
import HomeTopBar from "../HomeTopBar";

function Home() {
  const { setModalConfig } = useContext(ActionContext);
  const { user } = useContext(StateContext);

  return (
    <div className="home">
      <HomeTopBar></HomeTopBar>
    </div>
  );
}

export default Home;
