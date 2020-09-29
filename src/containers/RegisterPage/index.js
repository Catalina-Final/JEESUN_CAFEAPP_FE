import React, { useState, useEffect } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux/actions";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const redirectTo = useSelector((state) => state.auth.redirectTo);
  const history = useHistory();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, password2 } = formData;
    if (password !== password2) {
      setErrors({ ...errors, password2: "Passwords do not match" });
      return;
    }
    dispatch(authActions.register(name, email, password));
  };

  // const fillFakeData = () => {
  //   setFormData({
  //     name: "Jeesun",
  //     email: "luckymeday@gmail.com",
  //     password: "123",
  //     password2: "123",
  //   });
  // };

  useEffect(() => {
    if (redirectTo) {
      if (redirectTo === "__GO_BACK__") {
        history.goBack();
        dispatch(authActions.setRedirectTo(""));
      } else {
        history.push(redirectTo);
        dispatch(authActions.setRedirectTo(""));
      }
    }
  }, [dispatch, history, redirectTo]);

  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="main-container montserrat">
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <div className="text-center mb-3">
              <h1 className="point">Sign Up</h1>
              <p className="lead label"> Create Your Account</p>
            </div>

            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  type="text"
                  required
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <small className="form-text text-danger">{errors.name}</small>
                )}
                {/* 동일한 내용 -> {errors.name ? (
                <small className="form-text text-danger">{errors.name}</small>
              ) : null} */}
              </Form.Group>

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
                  <small className="form-text text-danger">
                    {errors.email}
                  </small>
                )}
                {/* 동일한 내용 -> {errors.email ? (
                <small className="form-text text-danger">{errors.email}</small>
              ) : null} */}
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="password"
                  required
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <small className="form-text text-danger">
                    {errors.password}
                  </small>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                />
                {/* {errors.password2 && (
                <small className="form-text text-danger">
                  {errors.password2}
                </small>
              )} -> 이미 암호1에 에러메세지가 있긴 때문에 굳이 쓰지 않아도 됨 */}
              </Form.Group>

              {loading ? (
                <Button
                  className="btn-block"
                  variant="primary"
                  type="button"
                  style={{ backgroundColor: "#f57f5b", border: "none" }}
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>{" "}
                  Loading...
                </Button>
              ) : (
                <Button
                  className="btn-block"
                  type="submit"
                  variant="primary"
                  style={{ backgroundColor: "#f57f5b", border: "none" }}
                >
                  Register
                </Button>
              )}
              {/* <Button
              className="btn-block"
              type="button"
              variant="light"
              onClick={fillFakeData}
            >
              Fill in fake data
            </Button> */}
              <p>
                Already have an account?{" "}
                <Link to="/login" className="point">
                  Sign In
                </Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterPage;
