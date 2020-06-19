import React, { useContext } from "react";
import "./QFExplainer.scss";
import { ActionContext, StateContext } from "../../hooks";

function QFExplainer() {
  const { setModalConfig } = useContext(ActionContext);
  const { selectedBusiness } = useContext(StateContext);

  return (
    <div className="qf-explainer">
      <h2 className="top-margin-set text-center">
        How our donation matching works?
      </h2>
      <p className="top-margin-set">
        <b>Downtown Stimulus</b> is a democratic way of funding projects.
        They’ve put together a matching pool of $30k from local philanthropists
        that is going to be distributed to downtown Boulder Businesses, to help
        bridge the gap between normal and now.
      </p>

      <p className="top-margin-set">
        Downtown Stimulus is going to match contributions based on the{" "}
        <b>number of people</b> contributing more so than the amount they
        contribute. This is a way of making sure that the{" "}
        <b>matching power of each contributor</b> is maximized.
      </p>
      <h3 className="top-margin-set text-center">
        How does it work in practice?
      </h3>
      <p className="top-margin-set">In traditional 1:1 Matching</p>
      <ul className="top-margin-set">
        <li>Grant 1 gets $100</li>
        <li>Grant 2 gets $100</li>
        <li>
          <b>Result: Both grants get $100 in matching</b>
        </li>
      </ul>
      <p className="top-margin-set">In Downtown Stimulus’ Matching Formula:</p>
      <ul className="top-margin-set">
        <li>Grant 1 gets $100 from 1 funder.</li>
        <li>Grant 2 gets $100 from 10 funders.</li>
        <li>
          <b>Grant 1 gets $10 in matching, Grant 2 gets $190 in matching</b>
        </li>
      </ul>
      <p className="top-margin-set">
        In Downtown Stimulus, the preferences of the many outweigh the
        preferences of the few.{" "}
        <a
          href="https://gitcoin.co/blog/experiments-with-liberal-radicalism/"
          target="_blank"
          rel="noopener noreferrer"
          className="top-margin-set text-center"
        >
          Further Reading
        </a>
      </p>
      {/* <div className="text-center"></div> */}
    </div>
  );
}

export default QFExplainer;
