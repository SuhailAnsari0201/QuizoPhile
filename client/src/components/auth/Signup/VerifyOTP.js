import React, { useState, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { activateAccount } from "../../../_actions/auth";

const VerifyOTP = ({
  activateAccount,
  token,
  otpSend,
  otpValid,
  isAuthenticated,
}) => {
  const [formData, setFormData] = useState({
    userotp: "",
  });
  const { userotp } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    activateAccount(token, userotp);
  };
  if (otpValid) {
    return <Redirect to="/login" />;
  }
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return otpSend ? (
    <Fragment>
      <h1>OTP Send Sucessfully Pls Check your Sms Inbox</h1>
      <div className=" container-fluid form-groups">
        <Form onSubmit={(e) => onSubmit(e)} className="my-4">
          <Form.Group controlId="otpFormSignup">
            <Form.Label>Enter OTP</Form.Label>
            <Form.Control
              size="sm"
              type="number"
              name="userotp"
              value={userotp}
              placeholder="Enter 6 Digit OTP"
              maxLength="6"
              onChange={(e) => onChange(e)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div>Something Went Wrong Pls Try again</div>
      <div>
        <Link to="/register">Back To Registration</Link>
      </div>
    </Fragment>
  );
};
VerifyOTP.propTypes = {
  setAlert: PropTypes.func.isRequired,
  activateAccount: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  token: PropTypes.string.isRequired,
  otpSend: PropTypes.bool.isRequired,
  otpValid: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
  isAuthenticated: state.auth.isAuthenticated,
  otpSend: state.auth.otpSend,
  otpValid: state.auth.otpValid,
});
export default connect(mapStateToProps, { activateAccount })(VerifyOTP);
