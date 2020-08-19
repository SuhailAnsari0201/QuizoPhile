import React, { Fragment, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import classnames from "classnames";
import isEmpty from "../../../_utils/is-empty";
import questionsArray from "../../../_utils/questions.json";

const PlayQuiz = ({ history, questionsData, loading }) => {
  const [questions, setQuestions] = useState(questionsArray);
  const [currentQuestion, setCurrentQuestion] = useState({
    content: "",
    question: "",
    opt1: "",
    opt2: "",
    opt3: "",
    opt4: "",
    answer: "",
  });
  const [nextQuestion, setNextQuestion] = useState({
    content: "",
    question: "",
    opt1: "",
    opt2: "",
    opt3: "",
    opt4: "",
    answer: "",
  });
  const [previousQuestion, setPreviousQuestion] = useState({
    content: "",
    question: "",
    opt1: "",
    opt2: "",
    opt3: "",
    opt4: "",
    answer: "",
  });
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [numberOfAnsweredQuestions, setNumberOfAnsweredQuestions] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [nextButtonDisabled, toggleNextButtonDisabled] = useState(false);
  const [previousButtonDisabled, togglePreviousButtonDisabled] = useState(true);

  useEffect(() => {
    console.log("useEffect");
    displayQuestion(questions, currentQuestion, nextQuestion, previousQuestion);
  }, []);

  const displayQuestion = (
    questions,
    currentQuestion,
    nextQuestion,
    previousQuestion
  ) => {
    if (!isEmpty(questions)) {
      // questions = questions;
      console.log("current Question Index:" + currentQuestionIndex);
      console.log("display");
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      previousQuestion = questions[currentQuestionIndex - 1];
      setCurrentQuestion(currentQuestion);
      setNextQuestion(nextQuestion);
      setPreviousQuestion(previousQuestion);
      setNumberOfQuestions(questions.length);
      // showOption();
      handleDisableButton();
    }
  };

  const handleOptionClick = (e) => {
    e.preventDefault();
    if (
      e.target.innerHTML.toLowerCase() === currentQuestion.answer.toLowerCase()
    ) {
      console.log("correct");
      correctAnswer();
    } else {
      console.log("incorrect");
      wrongAnswer();
    }
  };

  const correctAnswer = () => {
    setScore(score + 1);
    setCorrectAnswers(correctAnswers + 1);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setNumberOfAnsweredQuestions(numberOfAnsweredQuestions + 1);

    if (nextQuestion === undefined) {
      endQuiz();
    } else {
      displayQuestion(
        questions,
        currentQuestion,
        nextQuestion,
        previousQuestion
      );
    }
  };

  const wrongAnswer = () => {
    setWrongAnswers(wrongAnswers + 1);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setNumberOfAnsweredQuestions(numberOfAnsweredQuestions + 1);

    if (nextQuestion === undefined) {
      endQuiz();
    } else {
      displayQuestion(
        questions,
        currentQuestion,
        nextQuestion,
        previousQuestion
      );
    }
  };

  const handleNextButtonClick = (e) => {
    e.preventDefault();

    if (nextQuestion !== undefined) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      displayQuestion(
        questions,
        currentQuestion,
        nextQuestion,
        previousQuestion
      );
    }
  };

  const handlePreviousButtonClick = (e) => {
    e.preventDefault();

    if (previousQuestion !== undefined) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      displayQuestion(
        questions,
        currentQuestion,
        nextQuestion,
        previousQuestion
      );
    }
  };

  const handleQuitButtonClick = () => {
    if (window.confirm("Are you sure want to quite Quiz")) {
      //  this.props.history.push("/");
    }
  };
  const handleButtonClick = (e) => {
    e.preventDefault();

    switch (e.target.id) {
      case "next-button":
        handleNextButtonClick(e);
        break;

      case "previous-button":
        handlePreviousButtonClick(e);
        break;

      case "quit-button":
        handleQuitButtonClick(e);
        break;

      default:
        break;
    }
  };

  const handleDisableButton = () => {
    if (previousQuestion === undefined || currentQuestionIndex === 0) {
      togglePreviousButtonDisabled(true);
    } else {
      togglePreviousButtonDisabled(false);
    }

    if (
      nextQuestion === undefined ||
      currentQuestionIndex + 1 === numberOfQuestions
    ) {
      toggleNextButtonDisabled(true);
    } else {
      toggleNextButtonDisabled(false);
    }
  };
  const endQuiz = () => {
    alert("Quiz has ended.");
    const playerStats = {
      score: score,
      numberOfQuestions: numberOfQuestions,
      numberOfAnsweredQuestions: numberOfAnsweredQuestions,
      correctAnswers: correctAnswers,
      wrongAnswers: wrongAnswers,
    };
    console.log(playerStats);
    console.log(questionsData.questions);
    console.log(questionsArray);

    history.push("/play-quiz/QuizSummary", playerStats);
  };

  return (
    <Fragment>
      <div className="questions">
        <h2>Quiz Mode</h2>
        <br />
        <h5>
          {currentQuestionIndex + 1}.{currentQuestion.question}
        </h5>
        <div className="options-container">
          <p onClick={(e) => handleOptionClick(e)} className="option">
            {currentQuestion.opt1}
          </p>
          <p onClick={(e) => handleOptionClick(e)} className="option">
            {currentQuestion.opt2}
          </p>
        </div>
        <div className="options-container">
          <p onClick={(e) => handleOptionClick(e)} className="option">
            {currentQuestion.opt3}
          </p>
          <p onClick={(e) => handleOptionClick(e)} className="option">
            {currentQuestion.opt4}
          </p>
        </div>
        <div className="button-container">
          <button
            className={classnames("", { disabled: previousButtonDisabled })}
            id="previous-button"
            onClick={(e) => handleButtonClick(e)}
          >
            Previous
          </button>
          <button
            className={classnames("", { disabled: nextButtonDisabled })}
            id="next-button"
            onClick={(e) => handleButtonClick(e)}
          >
            Next
          </button>
          <button id="quit-button" onClick={(e) => handleButtonClick(e)}>
            Quit
          </button>
        </div>
      </div>
    </Fragment>
  );
};
PlayQuiz.prototype = {
  examStarted: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  questionsData: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  loading: state.exam.loading,
  examStarted: state.exam.examStarted,
  questionsData: state.exam.payload,
});

export default connect(mapStateToProps)(withRouter(PlayQuiz));
