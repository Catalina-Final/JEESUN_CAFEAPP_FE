import React from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import logo from "../../images/logo10.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faInstagram,
//   faFacebook,
//   faTwitter,
//   faPinterest,
//   faYoutube,
// } from "@fortawesome/free-solid-svg-icons";

const PublicFooter = () => {
  return (
    <div className="footer-container">
      <Container>
        <Row>
          <img
            src={logo}
            className="navbar-logo"
            alt="CoffeeSociety"
            style={{ height: "4rem" }}
          />
        </Row>
        <br></br>
        <Row style={{ marginTop: "2rem" }}>
          <Col xs lg="1">
            <p className="footer-menu">RANKING</p>
            <p className="footer-menu">EVENTS</p>
            <p className="footer-menu">GEARS</p>
            <p className="footer-menu">TASTE</p>
            <p className="footer-menu">BEANS</p>
            <p className="footer-menu">CLASS</p>
          </Col>
          <Col xs lg="2">
            {" "}
            <p className="footer-menu">JOBS</p>
            <p className="footer-menu">LOGIN</p>
            <p className="footer-menu">CONTACT</p>
            <p className="footer-menu">HELP</p>
            <p className="footer-menu">POLICY</p>
            <p className="footer-menu">TERM</p>
          </Col>
          <Col xs lg="6">
            <Row>
              <p className="footer-menu text-center">
                WE BELIEVE THE COFFEE EXPERIENCE IS OUR RESPONSIBILITY FROM SEED
                TO CUP. COFFEE IS OUR CRAFT, OUR RITUAL, OUR PASSION. IT DRIVES
                US AND INSPIRES US. WITH THIS SIMPLE TRUTH AND RESPONSIBILITY WE
                ARE BRIDGING THE GAP FROM FARMLEVEL TO STREETLEVEL.
                <p style={{ marginTop: "2rem" }}>
                  WE ARE COFFEE SOCIETY. MADE IN SAIGON.
                </p>
              </p>
            </Row>
            <Row
              className="d-flex align-content-center justify-content-center align-items-center"
              style={{ marginTop: "1rem" }}
            >
              <i
                className="fab fa-instagram fa-lg"
                style={{ paddingRight: "2rem" }}
              ></i>
              <i
                className="fab fa-facebook-f fa-lg"
                style={{ paddingRight: "2rem" }}
              ></i>
              <i
                className="fab fa-twitter fa-lg"
                style={{ paddingRight: "2rem" }}
              ></i>
              <i
                className="fab fa-pinterest fa-lg"
                style={{ paddingRight: "2rem" }}
              ></i>
              <i
                className="fab fa-youtube fa-lg"
                style={{ paddingRight: "2rem" }}
              ></i>
            </Row>
          </Col>
          <Col xs lg="1"></Col>
          <Col xs lg="2">
            <p className="footer-menu">BE THE FIRST TO KNOW!</p>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter you email"
                className="montserrat-small"
                style={{ width: "12rem" }}
              />
            </Form.Group>
            <Button
              style={{
                backgroundColor: "#F57F5B",
                color: "white",
                border: "none",
                width: "12rem",
              }}
              variant="light"
            >
              Subscribe
            </Button>
            <h6 className="montserrat-small" style={{ marginTop: "1rem" }}>
              SUBSCRIBERS WILL RECEIVE FIRST ACCESS TO SPECIAL OFFERS AND
              LIMITED RELEASES.
            </h6>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PublicFooter;
