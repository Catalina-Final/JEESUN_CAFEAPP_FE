import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../redux/actions";

const PublicNavbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const authLinks = (
    <Nav>
      <Nav.Link as={Link} to="/dashboard">
        Dashboard
      </Nav.Link>

      <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
    </Nav>
  );

  const publicLinks = (
    <Nav>
      <Nav.Link as={Link} to="/register">
        Register
      </Nav.Link>
      <Nav.Link as={Link} to="/login">
        Login
      </Nav.Link>
    </Nav>
  );

  return (
    <Navbar className="top-bar">
      <Navbar.Brand as={Link} to="/" style={{ padding: "-2rem" }}>
        <img src={logo} alt="CoffeeSociety" style={{ height: "4rem" }} />
        <small className="ml-2"> Saigon Coffee Showroom </small>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        {!loading && <>{isAuthenticated ? authLinks : publicLinks}</>}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default PublicNavbar;
