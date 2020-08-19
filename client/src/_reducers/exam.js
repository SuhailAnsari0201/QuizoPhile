import {
  CREATE_EXAM_SUCCESS,
  CREATE_EXAM_FAIL,
  START_EXAM_SUCCESS,
  START_EXAM_FAIL,
  CLEAR_QUIZ,
  SET_EXAM_RESULT_PASS,
  SET_EXAM_RESULT_FAIL,
} from "../_actions/types";

const initialState = {
  loading: true,
  examCreated: null,
  examStarted: null,
  payload: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_EXAM_SUCCESS:
      return {
        loading: false,
        examCreated: true,
      };
    case CREATE_EXAM_FAIL:
      return {
        loading: false,
        examCreated: false,
      };
    case START_EXAM_SUCCESS:
      return {
        loading: false,
        examStarted: true,
        payload: payload.exam,
      };
    case START_EXAM_FAIL:
      return {
        examStarted: false,
        loading: false,
      };
    case SET_EXAM_RESULT_PASS:
      return {
        loading: false,
      };
    case SET_EXAM_RESULT_FAIL:
      return {
        loading: false,
      };
    case CLEAR_QUIZ:
    default:
      return state;
  }
}
