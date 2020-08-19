import React, { Fragment, useState } from "react";
import { connect } from "react-redux";

import { Link, Redirect } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import { setAlert } from "../../../_actions/alert";
import { register } from "../../../_actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated, otpSend }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    password2: "",
  });
  const { name, email, mobile, password, password2 } = formData;

  const onChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("password And Confirm Password not match");
    } else {
      register({ name, email, mobile, password });
    }
  };
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  if (otpSend) {
    return <Redirect to="/verifyotp" />;
  }

  return (
    <Fragment>
      <div className=" container-fluid form-groups">
        <h2>Sign Up </h2>
        <Form onSubmit={(e) => onSubmit(e)} className="my-4">
          <Form.Group controlId="registerFormName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
              placeholder="Enter Full Name"
              onChange={(e) => onChange(e)}
              required
            />
          </Form.Group>
          <Form.Group controlId="registerFormEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => onChange(e)}
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="registerFormMobile">
            <Form.Label>Mobile number</Form.Label>
            <Form.Control
              type="text"
              name="mobile"
              value={mobile}
              placeholder="Enter Mobile"
              onChange={(e) => onChange(e)}
              minLength="10"
              maxLength="10"
              required
            />
          </Form.Group>
          <Form.Group controlId="loginFormPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              placeholder="password"
              onChange={(e) => onChange(e)}
              required
            />
          </Form.Group>
          <Form.Group controlId="loginFormConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="password2"
              value={password2}
              placeholder="confirm password"
              onChange={(e) => onChange(e)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            SEND OTP
          </Button>
        </Form>

        <div>
          <Link to="/login">Already have an Account? Login</Link>
        </div>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  otpSend: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  otpSend: state.auth.otpSend,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
