import React, { useState, Fragment } from "react";
import { Redirect, Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { forgotPassword } from "../../_actions/forgotPassword";

const ForgotPassword = ({ forgotPassword, mailSend, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const { email } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    forgotPassword(email);
  };
  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return mailSend ? (
    <Fragment>
      <h1>Mail Send Sucessfully Pls Check your mail</h1>
      <Link to="/login">
        <Button>Back To Login</Button>
      </Link>
    </Fragment>
  ) : (
    <Fragment>
      <div className=" container-fluid form-groups">
        <Form onSubmit={(e) => onSubmit(e)} className="my-4">
          <Form.Group controlId="forgateFormEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              size="sm"
              type="email"
              name="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => onChange(e)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <h3>We are Working on Reset Password By Using Mobile Number.</h3>
      </div>
    </Fragment>
  );
};
ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  mailSend: PropTypes.bool,
  isAuthenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  mailSend: state.forgotPassword.mailSend,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { forgotPassword })(ForgotPassword);
