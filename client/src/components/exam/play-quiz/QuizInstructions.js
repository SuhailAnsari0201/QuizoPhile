import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const QuizInstructions = () => {
  return (
    <Fragment>
      <h1>How to do exam</h1>
      <p>Ensure you read the guide from start to finish.</p>
      <p>...................</p>
      <div>
        <a href="/dashboard">no,take me back </a>
        <br />
        <Link to="/play-quiz"> Play</Link>
      </div>
    </Fragment>
  );
};
export default QuizInstructions;
