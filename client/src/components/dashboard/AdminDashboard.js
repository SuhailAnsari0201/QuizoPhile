import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AdminDashboard = ({ isAuthenticated, loading }) => {
  let msg = "";
  if (!loading && isAuthenticated) {
    msg = (
      <div>
        <h2>Welcome to admin dashboard..</h2>
        <Link to="/create-exam">Create exam</Link>
      </div>
    );
  }
  return (
    <Fragment>
      <div>{msg}</div>
    </Fragment>
  );
};

AdminDashboard.prototype = {
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.admin.isAuthenticated,
  loading: state.admin.loading,
});

export default connect(mapStateToProps)(AdminDashboard);
