import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../css/landing.css";
const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Online Quize Editor</h1>
          <p className="lead">
            Create a profile, create quizes and share with friends or others to
            check there IQ
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            {"  "}
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.prototype = {
  isAuthenticated: PropTypes.bool,
};

const mapStateTpProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateTpProps)(Landing);
