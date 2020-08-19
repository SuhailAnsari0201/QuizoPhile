import axios from "axios";
import {
  ADMIN_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../_utils/setAuthToken";

// Load Admin
export const loadAdmin = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/admin");

    dispatch({ type: ADMIN_LOADED, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: AUTH_ERROR });
  }
};

// Login Admin
export const loginAdmin = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/admin", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadAdmin());
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
  dispatch({ type: LOGOUT });
};
