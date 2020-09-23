import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../redux/actions";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShare } from "@fortawesome/free-solid-svg-icons";

const PublicNavbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const authLinks = (
    <Nav>
      <Nav.Link className="menu-button" as={Link} to="/dashboard">
        Dashboard
      </Nav.Link>

      <Nav.Link className="menu-button" onClick={handleLogout}>
        Logout
      </Nav.Link>
    </Nav>
  );

  const publicLinks = (
    <Nav>
      <Nav.Link className="menu-button" as={Link} to="/register">
        Register
      </Nav.Link>
      <Nav.Link className="menu-button" as={Link} to="/login">
        Login
      </Nav.Link>
    </Nav>
  );

  return (
    <div className="fixed-top">
      <div className="very-top-bar text-center">
        {" "}
        <Nav.Link as={Link} to="/ourcompany">
          {" "}
          <p className="white"> SAIGON COFFEE SHOWROOM. FOR MORE INFO{" >>"}</p>
        </Nav.Link>{" "}
      </div>
      <Navbar className="logo-top-bar">
        <Navbar.Brand as={Link} to="/" style={{ padding: "-2rem" }}>
          <img
            src={logo}
            className="navbar-logo"
            alt="CoffeeSociety"
            style={{ height: "4rem" }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          {!loading && <>{isAuthenticated ? authLinks : publicLinks}</>}
        </Navbar.Collapse>
      </Navbar>

      <Nav className="justify-content-center menu-top-bar  border-bottom border-top border-gray">
        <Nav.Item className="menu-button">
          <Nav.Link as={Link} to="/ranking">
            <p className="label"> CAFE RANKING</p>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="menu-button">
          <Nav.Link as={Link} to="/events">
            <p className="label"> UPCOMING EVENTS</p>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="menu-button">
          <Nav.Link as={Link} to="/gears">
            <p className="label"> SHOP GEARS</p>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="menu-button">
          <Nav.Link as={Link} to="/taste">
            <p className="label"> TASTE COFFEE</p>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="menu-button">
          <Nav.Link as={Link} to="/beans">
            <p className="label"> SPECIAL BEANS</p>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="menu-button">
          <Nav.Link as={Link} to="/master">
            <p className="label"> BARISTA CLASS</p>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default PublicNavbar;
