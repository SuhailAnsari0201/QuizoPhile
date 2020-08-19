import {
  MAIL_SEND_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  VALID_RESET_LINK,
  INVALID_RESET_LINK,
  MAIL_SEND_FAIL,
  RESET_PASSWORD_FAIL,
} from "../_actions/types";

const initialState = {
  email: null,
  loading: true,
  error: false,
  updated: false,
  mailSend: false,
};
// BUG  after changing password email is not remove in the forgatepassword redux storage area
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case MAIL_SEND_SUCCESS:
      return {
        ...state,
        loading: false,
        mailSend: true,
      };
    case VALID_RESET_LINK:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        updated: true,
      };
    case MAIL_SEND_FAIL:
    case INVALID_RESET_LINK:
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
}
