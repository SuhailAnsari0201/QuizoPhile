import axios from "axios";
import {
  MAIL_SEND_SUCCESS,
  MAIL_SEND_FAIL,
  VALID_RESET_LINK,
  INVALID_RESET_LINK,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
} from "./types";
import { setAlert } from "./alert";
// Forgate Password (send password reset link on user mail)
export const forgotPassword = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email });
  try {
    const res = await axios.post("/api/forgotPassword", body, config);
    if (res) dispatch(setAlert(res.data.msg));
    dispatch({
      type: MAIL_SEND_SUCCESS,
    });
  } catch (err) {
    console.log(err.response.data);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: MAIL_SEND_FAIL,
    });
  }
};

// Check forgate password link validation
export const resetPasswordLinkValidation = (token) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/forgotPassword/${token}`);
    dispatch({
      type: VALID_RESET_LINK,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: INVALID_RESET_LINK,
    });
  }
};

// Reset Password Via Email (after checking resetpassword link is valid)
export const resetPasswordVaiEmail = ({ email, password }) => async (
  dispatch
) => {
  try {
    const res = await axios.put("/api/forgotPassword", { email, password });
    if (res) dispatch(setAlert(res.data.msg));

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
    });
  }
};
