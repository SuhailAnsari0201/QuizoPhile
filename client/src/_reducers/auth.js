import {
  OTP_SEND,
  OTP_INVALID,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../_actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  otpSend: false,
  otpValid: false,
  loading: true,
  user: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      console.log(payload);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case OTP_SEND:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        token: payload.token,
        isAuthenticated: false,
        otpSend: true,
        loading: false,
      };
    case REGISTER_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        otpValid: true,
        user: null,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case OTP_INVALID:
    default:
      return state;
  }
}
