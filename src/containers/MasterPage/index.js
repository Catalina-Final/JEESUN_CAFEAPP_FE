import React, { useState } from "react";
import { Col, Form, Button, Container } from "react-bootstrap";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";

const MasterPage = () => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [content, setContent] = useState("");
  const loading = useSelector((state) => state.shop.loading);

  function FormExample() {
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      setValidated(true);
      window.open(`mailto:luckymeday@gmail.com?&body=${content}`);
    };
    return (
      <div className="detail-container montserrat">
        <Container>
          <div className="text-center">
            <p
              style={{
                fontSize: "23px",
                color: "black",
                fontFamily: "Montserrat, sans-serif",
                marginTop: "3rem",
                marginBottom: "5rem",
              }}
            >
              We do One on One coffee class with Saigon top Barista.
              <br></br>If you are interested in or have questions, feel free to
              email us.
            </p>
          </div>
          {loading ? (
            <ClipLoader color="#b7a986" size={150} loading={loading} />
          ) : (
            <Col md={{ span: 6, offset: 3 }}>
              <Form noValidate validated={validated} className="text-left">
                <Form.Row>
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      className="form"
                      required
                      type="text"
                      placeholder="First name"
                      // defaultValue="Christina"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Last name"
                      // defaultValue="Hohng"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="12" controlId="validationCustom03">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid email.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Label>Please introduce your self</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="6"
                    onChange={(e) => setContent(e.target.value)}
                    required
                    maxLength={400}
                  />
                </Form.Row>
                <Form.Group>
                  <Form.Check
                    required
                    label="Agree to terms and conditions"
                    feedback="You must agree before submitting."
                  />
                </Form.Group>
                <div className=" d-flex align-content-center flex-column align-items-end">
                  <Button
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                    style={{ backgroundColor: "#B7A986", border: "none" }}
                  >
                    Submit form
                  </Button>
                </div>
              </Form>
            </Col>
          )}
        </Container>
      </div>
    );
  }

  return FormExample();
};

export default MasterPage;
