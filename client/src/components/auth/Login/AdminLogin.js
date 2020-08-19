import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { loginAdmin } from "../../../_actions/admin";

const AdminLogin = ({ loginAdmin, isAuthenticated, match }) => {
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
    loginAdmin(email, password);
  };
  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/admin-dashboard" />;
  }
  return (
    <Fragment>
      <div className=" container-fluid form-groups">
        <h2> Admin Login Page </h2>
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
      </div>
    </Fragment>
  );
};

AdminLogin.prototype = {
  loginAdmin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.admin.isAuthenticated,
});

export default connect(mapStateToProps, { loginAdmin })(AdminLogin);
