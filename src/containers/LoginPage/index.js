import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../redux/actions";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault(); // avoid other changes except handleSubmit
    const { email, password } = formData;
    dispatch(authActions.loginRequest(email, password));
  };

  const loginWithFacebook = (response) => {
    dispatch(authActions.loginFacebookRequest(response.accessToken));
  };

  const loginWithGoogle = (response) => {
    dispatch(authActions.loginGoogleRequest(response.accessToken));
  };

  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <div className="text-center mb-3">
              <h1 className="text-primary">Sign In</h1>
              <p className="lead">Sign Into Your Account </p>
            </div>
            <Form.Group>
              <Form.Control
                type="email"
                required
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <small className="form-text text-danger">{errors.email}</small>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                required
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                minLength="3"
              />
              {errors.password && (
                <small className="form-text text-danger">
                  {errors.password}
                </small>
              )}
            </Form.Group>

            {loading ? (
              <Button
                className="btn-block"
                variant="primary"
                type="button"
                disabled
              >
                <span
                  className="spinner-border cpinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                Loading...
              </Button>
            ) : (
              <Button className="btn-block" type="submit" variant="primary">
                Login
              </Button>
            )}
            <p>
              Don't have an account? <Link to="/register">Sing Up</Link>
            </p>

            <FacebookLogin
              appId="719439585274379"
              fields="name,email,picture"
              callback={loginWithFacebook}
              autoLoad={false}
              className="facebook-button-class"
              onFailure={(err) => {
                console.log("FB LOGIN ERROR:", err);
              }}
            />

            <GoogleLogin
              clientId="1006409012852-ek4fmm753gjgruoljlrkjnhuep75kdqq.apps.googleusercontent.com"
              buttonText="LOGIN WITH GOOGLE"
              onSuccess={loginWithGoogle}
              onFailure={(err) => {
                console.log("GOOGLE LOGIN ERROR:", err);
              }}
            />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
