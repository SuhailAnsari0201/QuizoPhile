import axios from "axios";
import {
  CREATE_EXAM_SUCCESS,
  CREATE_EXAM_FAIL,
  START_EXAM_SUCCESS,
  START_EXAM_FAIL,
  SET_EXAM_RESULT_PASS,
  SET_EXAM_RESULT_FAIL,
} from "./types";

import { setAlert } from "./alert";

// Create exam
export const createExam = ({
  exam_code,
  exam_name,
  exam_passkey,
  expire_time,
  questions,
}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    exam_code,
    exam_name,
    exam_passkey,
    expire_time,
    questions,
  });
  try {
    const res = await axios.post("/api/exam", body, config);
    console.log(res);

    dispatch({ type: CREATE_EXAM_SUCCESS, payload: res.data });

    dispatch(setAlert(res.data.msg));
  } catch (err) {
    console.log("111" + err.message);
    const errors = err.response.data.errors;
    if (errors) errors.forEach((error) => dispatch(setAlert(error.msg)));
    dispatch({
      type: CREATE_EXAM_FAIL,
    });
  }
};

// Strat Exam
export const startExam = ({ exam_code, passkey, history }) => async (
  dispatch
) => {
  try {
    const res = await axios.get(`/api/exam/${exam_code}/${passkey}`);
    console.log("passkey valid--" + res);

    dispatch({ type: START_EXAM_SUCCESS, payload: res.data });
    dispatch(setAlert(res.data.msg));
    history.push("/play-quiz/quizinstruction", res.data);
  } catch (err) {
    console.log("111" + err.message);
    const errors = err.response.data.errors;
    if (errors) errors.forEach((error) => dispatch(setAlert(error.msg)));
    dispatch({
      type: START_EXAM_FAIL,
    });
  }
};

// Set Student Exam Result in Database.
export const setExamResult = ({
  exam_code,
  exam_name,
  numberOfQuestions,
  score,
}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    exam_code,
    exam_name,
    numberOfQuestions,
    score,
  });
  try {
    console.log("i am called" + exam_code, exam_name, numberOfQuestions, score);
    const res = await axios.put("/api/exam/result", body, config);
    dispatch({ type: SET_EXAM_RESULT_PASS, payload: res.data });
    dispatch(setAlert(res.data.msg));
  } catch (err) {
    console.log("111" + err.message);
    const errors = err.response.data.errors;
    if (errors) errors.forEach((error) => dispatch(setAlert(error.msg)));
    dispatch({
      type: SET_EXAM_RESULT_FAIL,
    });
  }
};
