import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

const QuizSummary = (props) => {
  const [resuiltSummary, setResultSummary] = useState({
    score: 0,
    numberOfQuestions: 0,
    numberOfAnswerdQuestions: 0,
    correctAnswer: 0,
    worngAnswer: 0,
    remark: "",
  });

  useEffect(() => {
    const { state } = props.location;
    if (state) {
      let userScore = (state.score / state.numberOfQuestions) * 100;
      let userRemark = "";
      if (userScore <= 30) {
        userRemark = "You need more Practice.";
      } else if (userScore > 30 && userScore <= 50) {
        userRemark = "Better luck next Time.";
      } else if (userScore <= 70 && userScore > 50) {
        userRemark = "Yoou can do better.";
      } else if (userScore <= 71 && userScore <= 84) {
        userRemark = "You did great.";
      } else {
        userRemark = "You are an absolute genius.";
      }
      setResultSummary({
        score: userScore,
        numberOfQuestions: state.numberOfQuestions,
        numberOfAnswerdQuestions: state.numberOfAnswerdQuestions,
        correctAnswer: state.correctAnswer,
        worngAnswer: state.worngAnswer,
        remark: userRemark,
      });
    }
  }, []);
  let status;
  if (props.location.state !== undefined) {
    status = (
      <Fragment>
        <h1>Quiz has ended.</h1>
        <div className="container">
          <h4>{resuiltSummary.remark}</h4>
          <h2>Your Score : {resuiltSummary.score.toFixed(2)}</h2>
        </div>
        <section>
          <Link to="/">Back to home</Link>
        </section>
      </Fragment>
    );
  } else {
    status = (
      <Fragment>
        <h1>No Statistics available.</h1>
        <Link to="/">Back to home</Link>
      </Fragment>
    );
  }
  return <Fragment>{status}</Fragment>;
};
export default QuizSummary;
