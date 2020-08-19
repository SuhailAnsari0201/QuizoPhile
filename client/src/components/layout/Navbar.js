import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../../_actions/auth";

const navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <Fragment>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="#!">
          userLink1
        </Nav.Link>
        <Nav.Link as={Link} to="#!">
          userLink2
        </Nav.Link>
        <Nav.Link as={Link} to="/profile">
          Profile
        </Nav.Link>
        <Nav.Link as={Link} to="/dashboard">
          Dashboard
        </Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link href="#!" onClick={(e) => logout()}>
          <i className="fas fa-sign-out-alt" /> Logout
        </Nav.Link>
      </Nav>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">
          guestLink1
        </Nav.Link>
        <Nav.Link as={Link} to="/">
          guestLink2
        </Nav.Link>
        <Nav.Link as={Link} to="/">
          guestLink3
        </Nav.Link>
        <Nav.Link as={Link} to="/login">
          Login
        </Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link as={Link} to="/login">
          Login
        </Nav.Link>
        <Nav.Link as={Link} to="/register">
          Register
        </Nav.Link>
      </Nav>
    </Fragment>
  );
  return (
    <Navbar collapseOnSelect sticky="top" expand="lg" bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">
        OnlineQuize
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {!loading && (isAuthenticated ? authLinks : guestLinks)}
      </Navbar.Collapse>
    </Navbar>
  );
};
navbar.prototype = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(navbar);
