import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import {
  resetPasswordLinkValidation,
  resetPasswordVaiEmail,
} from "../../_actions/forgotPassword";
import { setAlert } from "../../_actions/alert";
import { Redirect } from "react-router-dom";

const ResetPassword = ({
  setAlert,
  resetPasswordLinkValidation,
  resetPasswordVaiEmail,
  match,
  email,
  error,
  loading,
  updated,
}) => {
  useEffect(() => {
    resetPasswordLinkValidation(match.params.token);
  }, [resetPasswordLinkValidation, match.params.token]);
  const [formData, setFormData] = useState({
    password: "",
    password2: "",
  });
  const { password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password === password2) {
      resetPasswordVaiEmail({ email, password });
    } else {
      setAlert("Password do not match", "danger");
    }
  };
  if (updated) {
    return <Redirect to="/login" />;
  } else if (error) {
    return (
      <div>
        <h1>Invalid Reset Link Error PLS Try Again Later</h1>
      </div>
    );
  } else {
    return (
      <div>
        <form onSubmit={(e) => onSubmit(e)}>
          <input
            type="text"
            name="password"
            value={password}
            placeholder="password"
            onChange={(e) => onChange(e)}
            required
          />
          <input
            type="text"
            name="password2"
            value={password2}
            placeholder="confirm password"
            onChange={(e) => onChange(e)}
            required
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
};
ResetPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  resetPasswordLinkValidation: PropTypes.func.isRequired,
  resetPasswordVaiEmail: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  updated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  email: state.forgotPassword.email,
  error: state.forgotPassword.error,
  loading: state.forgotPassword.loading,
  updated: state.forgotPassword.updated,
});
export default connect(mapStateToProps, {
  setAlert,
  resetPasswordLinkValidation,
  resetPasswordVaiEmail,
})(ResetPassword);
