import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, ButtonGroup } from "react-bootstrap";
import { eventActions } from "../../redux/actions";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const AddEditEventPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    owner: "",
    images: null,
    description: "",
    address: "",
    phone: "",
  });
  const params = useParams();
  const dispatch = useDispatch();
  const addOrEdit = params.id ? "Edit" : "Add";
  const selectedEvent = useSelector((state) => state.event.selectedEvent);
  const loading = useSelector((state) => state.event.loading);
  const currentUser = useSelector((state) => state.auth.user);
  const history = useHistory();
  const redirectTo = useSelector((state) => state.event.redirectTo);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("value :", e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (addOrEdit === "Add") {
      dispatch(eventActions.createNewEvent(formData));
    } else if (addOrEdit === "Edit") {
      dispatch(eventActions.updateEvent(selectedEvent._id, formData));
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleDelete = () => {
    dispatch(eventActions.deleteEvent(selectedEvent._id));
  };

  useEffect(() => {
    if (currentUser.role && currentUser.role === "owner") {
      setFormData((formData) => ({ ...formData, owner: currentUser.name }));
    }
  }, [currentUser]);

  useEffect(() => {
    if (redirectTo) {
      if (redirectTo === "__GO_BACK__") {
        history.goBack();
        dispatch(eventActions.setRedirectTo(""));
      } else {
        history.push(redirectTo);
        dispatch(eventActions.setRedirectTo(""));
      }
    }
  }, [redirectTo, dispatch, history]);

  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
        tags: ["coffeeSociety", "eventImages"],
      },
      function (error, result) {
        if (result && result.length) {
          setFormData({
            ...formData,
            images: result.map((res) => res.secure_url),
          });
        }
      }
    );
  };

  return (
    <div className="add-shop-container">
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <div className="text-center mb-3">
              <h1 className="text-dark">{addOrEdit} Event</h1>
            </div>

            <Form.Group>
              {formData?.images?.map((image) => (
                <img
                  src={image}
                  key={image}
                  width="150px"
                  height="150px"
                  alt="event images"
                ></img>
              ))}
              <span
                className="d-flex align-content-center flex-column align-items-center"
                style={{ marginTop: "2rem" }}
              >
                <Button variant="info" onClick={uploadWidget}>
                  {addOrEdit} Images
                </Button>
              </span>
            </Form.Group>
            <Form.Group>
              <Form.Label>Event Title</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Event Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Owner Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Owner Name"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                disabled={currentUser?.role === "owner"}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Event Description</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Event Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Contact Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>

            <ButtonGroup className="d-flex mb-3">
              {loading ? (
                <Button className="mr-3" variant="dark" type="button" disabled>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Submitting...
                </Button>
              ) : (
                <Button className="mr-3" type="submit" variant="dark">
                  Submit
                </Button>
              )}
              <Button variant="light" onClick={handleCancel} disabled={loading}>
                Cancel
              </Button>
            </ButtonGroup>
            {addOrEdit === "Edit" && (
              <ButtonGroup className="d-flex">
                <Button
                  variant="danger"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  Delete Event
                </Button>
              </ButtonGroup>
            )}
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default AddEditEventPage;
