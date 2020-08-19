import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { login } from "../../../_actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };
  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <div className=" container-fluid form-groups">
        <h2> Login Page </h2>
        {/* <div style={{ border- radius: "-5"+ px;}}>// */}

        <Form onSubmit={(e) => onSubmit(e)}>
          <Form.Group controlId="loginFormEmail">
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

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <br />
        <Link to="/register">click here forSign Up</Link>
        <br />
        <br />
        <a href="/forgotPassword"> Forgot Password?</a>
      </div>
    </Fragment>
  );
};

Login.prototype = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
