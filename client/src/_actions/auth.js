import axios from "axios";
import {
  OTP_SEND,
  OTP_INVALID,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_PROFILE,
  CLEAR_QUIZ,
  LOGOUT,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../_utils/setAuthToken";

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");

    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: AUTH_ERROR });
  }
};

// Register User (SEND OTP)
export const register = ({ name, email, mobile, password }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, mobile, password });
  try {
    const res = await axios.post("/api/users", body, config);
    console.log(res);

    dispatch({ type: OTP_SEND, payload: res.data });

    dispatch(setAlert(res.data.msg));
  } catch (err) {
    console.log("111" + err.message);
    const errors = err.response.data.errors;
    if (errors) errors.forEach((error) => dispatch(setAlert(error.msg)));
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
// Activate Account (Verify OTP)
export const activateAccount = (token, userotp) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ token, userotp });
  try {
    const res = await axios.post("/api/users/activateAccount", body, config);
    console.log(res);
    dispatch({ type: REGISTER_SUCCESS });
    dispatch(setAlert(res.data.msg));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: OTP_INVALID,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg)));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout/clear profile
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: CLEAR_QUIZ });
  dispatch({ type: LOGOUT });
};
