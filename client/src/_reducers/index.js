import { combineReducers } from "redux";
import admin from "./admin";
import alert from "./alert";
import auth from "./auth";
import forgotPassword from "./forgotPassword";
import profile from "./profile";
import exam from "./exam";
export default combineReducers({
  alert,
  admin,
  auth,
  forgotPassword,
  profile,
  exam,
});
