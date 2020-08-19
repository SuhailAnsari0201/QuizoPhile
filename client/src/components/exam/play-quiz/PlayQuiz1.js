import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import isEmpty from "../../../_utils/is-empty";
import { setExamResult } from "../../../_actions/exam";
import "../../../css/play.css";

class PlayQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: this.props.questionsArray.questions,
      currentQuestion: {},
      nextQuestion: {},
      previousQuestion: {},
      answer: "",
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      nextButtonDisabled: false,
      previousButtonDisabled: true,
    };
  }

  componentDidMount() {
    const {
      questions,
      currentQuestion,
      nextQuestion,
      previousQuestion,
    } = this.state;
    this.displayQuestions(
      questions,
      currentQuestion,
      nextQuestion,
      previousQuestion
    );
  }

  displayQuestions = (
    questions = this.state.questions,
    currentQuestion,
    nextQuestion,
    previousQuestion
  ) => {
    let { currentQuestionIndex } = this.state;
    if (!isEmpty(this.state.questions)) {
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      previousQuestion = questions[currentQuestionIndex - 1];
      const answer = currentQuestion.answer;
      this.setState(
        {
          currentQuestion: currentQuestion,
          nextQuestion,
          previousQuestion,
          numberOfQuestions: questions.length,
          answer,
        },
        () => {
          this.handleDisableButton();
          this.unCheckedOptions();
        }
      );
    }
  };
  unCheckedOptions = () => {
    var opt = document.querySelector('input[name="option"]:checked');
    if (opt != null) opt.checked = false;
  };

  handleNextButtonClick = (e) => {
    e.preventDefault();

    var option = document.querySelector('input[name="option"]:checked');
    var selectedOption = option != null ? option.value.toLowerCase() : null;

    if (selectedOption === this.state.answer.toLowerCase()) {
      this.setState((prevState) => ({
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      }));
    } else if (selectedOption != null) {
      this.setState((prevState) => ({
        wrongAnswers: prevState.wrongAnswers + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      }));
    }

    if (this.state.nextQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
        }),
        () => {
          this.displayQuestions(
            this.state.question,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    } else {
      this.endGame();
    }
  };

  // handlePreviousButtonClick = () => {
  //   if (this.state.previousQuestion !== undefined) {
  //     this.setState(
  //       (prevState) => ({
  //         currentQuestionIndex: prevState.currentQuestionIndex - 1,
  //       }),
  //       () => {
  //         this.displayQuestions(
  //           this.state.question,
  //           this.state.currentQuestion,
  //           this.state.nextQuestion,
  //           this.state.previousQuestion
  //         );
  //       }
  //     );
  //   }
  // };

  handleQuitButtonClick = () => {
    if (window.confirm("Are you sure want to quite Quiz")) {
      //  this.props.history.push("/");
    }
  };
  handleButtonClick = (e) => {
    e.preventDefault();

    switch (e.target.id) {
      case "next-button":
        this.handleNextButtonClick(e);
        break;

      case "previous-button":
        this.handlePreviousButtonClick(e);
        break;

      case "quit-button":
        this.handleQuitButtonClick(e);
        break;

      default:
        break;
    }
  };

  handleDisableButton = () => {
    if (
      this.state.previousQuestion === undefined ||
      this.state.currentQuestionIndex === 0
    ) {
      this.setState({
        previousButtonDisabled: true,
      });
    } else {
      this.setState({
        previousButtonDisabled: false,
      });
    }

    if (
      this.state.nextQuestion === undefined ||
      this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions
    ) {
      this.setState({
        nextButtonDisabled: true,
      });
    } else {
      this.setState({
        nextButtonDisabled: false,
      });
    }
  };
  endGame = () => {
    alert("Game has ended.");
    const { state } = this;
    const playerStats = {
      score: state.score,
      numberOfQuestions: state.numberOfQuestions,
      numberOfAnsweredQuestions: state.correctAnswers + state.wrongAnswers,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
    };
    console.log(playerStats);
    const { exam_name, exam_code } = this.props.questionsArray;
    const { numberOfQuestions, score } = this.state;
    console.log("quiz1 print" + exam_code, exam_name, numberOfQuestions, score);
    this.props.setExamResult({
      exam_code,
      exam_name,
      numberOfQuestions,
      score,
    });
    setTimeout(() => {
      this.props.history.push("/play-quiz/quizsummary", playerStats);
    }, 1000);
  };

  render() {
    const {
      currentQuestion,
      currentQuestionIndex,
      numberOfQuestions,
    } = this.state;
    return (
      <Fragment>
        <div>
          <h2>Quiz Mode</h2>
          <h5>
            {currentQuestionIndex + 1}.{currentQuestion.question}
          </h5>
          <div className="options-container">
            <label id="opt1Label" for="opt1" className="option">
              <input
                type="radio"
                name="option"
                id="opt1"
                value={currentQuestion.opt1}
              />{" "}
              {currentQuestion.opt1}
            </label>
            <label id="opt2Label" for="opt2" className="option">
              <input
                type="radio"
                name="option"
                id="opt2"
                value={currentQuestion.opt2}
              />{" "}
              {currentQuestion.opt2}
            </label>
          </div>
          <div className="options-container">
            <label id="opt3Label" for="opt3" className="option">
              <input
                type="radio"
                name="option"
                id="opt3"
                value={currentQuestion.opt3}
              />{" "}
              {currentQuestion.opt3}
            </label>
            <label id="opt4Label" for="opt4" className="option">
              <input
                type="radio"
                name="option"
                id="opt4"
                value={currentQuestion.opt4}
              />{" "}
              {currentQuestion.opt4}
            </label>
          </div>
          <div className="button-container">
            {/* <button
              className={classnames("", {
                disabled: this.state.nextButtonDisabled,
              })}
              id="previous-button"
              onClick={this.handleButtonClick}
            >
              Previous
            </button> */}
            <button
              className={classnames("", {
                disabled: this.state.nextButtonDisabled,
              })}
              id="next-button"
              onClick={this.handleButtonClick}
            >
              Next
            </button>
            <button id="quit-button" onClick={this.handleButtonClick}>
              Quit
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  questionsArray: state.exam.payload,
});
export default connect(mapStateToProps, { setExamResult })(PlayQuiz);
