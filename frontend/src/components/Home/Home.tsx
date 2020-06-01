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
      <ul className="business-list">
        <li className="business-item">
          <div className="business-item-cover-image-container">
            <img
              src={require("../../assets/image 48.png")}
              alt="cover-image"
              className="business-item-cover-image"
            />
            <div className="business-item-cover-bottom-border"></div>
          </div>
          <div className="business-item-logo-image-container">
            <img
              src={require("../../assets/image 49.png")}
              alt="logo-image"
              className="business-item-logo-image"
            />
          </div>
          <h2 className="business-item-name">Chelsea Boutique</h2>
          <p className="business-item-description">
            is a women's designer boutique that has been a Boulder favorite for
            over fifteen years.
          </p>
          <div className="business-item-progress-container">
            <div className="business-item-progress"></div>
          </div>
          <div className="business-item-progress-labels-container">
            <span className="business-item-progress-label">$0</span>
            <span className="business-item-progress-label">$5,500 goal</span>
          </div>
          <div className="business-item-button-container">
            <button type="button" className="business-item-button">
              Read More
            </button>
          </div>
        </li>
        <li className="business-item">
          <div className="business-item-cover-image-container">
            <img
              src={require("../../assets/image 50.png")}
              alt="cover-image"
              className="business-item-cover-image"
            />
            <div className="business-item-cover-bottom-border"></div>
          </div>
          <div className="business-item-logo-image-container">
            <img
              src={require("../../assets/image 53.png")}
              alt="logo-image"
              className="business-item-logo-image"
            />
          </div>
          <h2 className="business-item-name">Cured</h2>
          <p className="business-item-description">
            ...is a small shop focused on preserving a personal connection to
            food. We offer a hand-picked selection of cheeses, charcuterie,
            wines, Colorado beers and spirits, and unique grocery items,
          </p>
          <div className="business-item-progress-container">
            <div
              className="business-item-progress"
              style={{ width: "20%" }}
            ></div>
          </div>
          <div className="business-item-progress-labels-container">
            <span className="business-item-progress-label">$0</span>
            <span className="business-item-progress-label">$5,500 goal</span>
          </div>
          <div className="business-item-button-container">
            <button type="button" className="business-item-button">
              Read More
            </button>
          </div>
        </li>
        <li className="business-item">
          <div className="business-item-cover-image-container">
            <img
              src={require("../../assets/image 48.png")}
              alt="cover-image"
              className="business-item-cover-image"
            />
            <div className="business-item-cover-bottom-border"></div>
          </div>
          <div className="business-item-logo-image-container">
            <img
              src={require("../../assets/image 49.png")}
              alt="logo-image"
              className="business-item-logo-image"
            />
          </div>
          <h2 className="business-item-name">Chelsea Boutique</h2>
          <p className="business-item-description">
            is a women's designer boutique that has been a Boulder favorite for
            over fifteen years.
          </p>
          <div className="business-item-progress-container">
            <div className="business-item-progress"></div>
          </div>
          <div className="business-item-progress-labels-container">
            <span className="business-item-progress-label">$0</span>
            <span className="business-item-progress-label">$5,500 goal</span>
          </div>
          <div className="business-item-button-container">
            <button type="button" className="business-item-button">
              Read More
            </button>
          </div>
        </li>
        <li className="business-item">
          <div className="business-item-cover-image-container">
            <img
              src={require("../../assets/image 48.png")}
              alt="cover-image"
              className="business-item-cover-image"
            />
            <div className="business-item-cover-bottom-border"></div>
          </div>
          <div className="business-item-logo-image-container">
            <img
              src={require("../../assets/image 49.png")}
              alt="logo-image"
              className="business-item-logo-image"
            />
          </div>
          <h2 className="business-item-name">Chelsea Boutique</h2>
          <p className="business-item-description">
            is a women's designer boutique that has been a Boulder favorite for
            over fifteen years.
          </p>
          <div className="business-item-progress-container">
            <div className="business-item-progress"></div>
          </div>
          <div className="business-item-progress-labels-container">
            <span className="business-item-progress-label">$0</span>
            <span className="business-item-progress-label">$5,500 goal</span>
          </div>
          <div className="business-item-button-container">
            <button type="button" className="business-item-button">
              Read More
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Home;
