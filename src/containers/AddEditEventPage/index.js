import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  ButtonGroup,
  Container,
} from "react-bootstrap";
import { eventActions } from "../../redux/actions";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TimePicker from "react-bootstrap-time-picker";
import DatePicker from "react-datepicker";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  // geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";

import "react-datepicker/dist/react-datepicker.css";

const AddEditEventPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    // owner: "",
    shop: "",
    images: null,
    description: "",
    address: "",
    coords: [],
    phone: "",
    date: "",
    startHour: "",
    endHour: "",
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
      dispatch(eventActions.updateEvent(params.id, formData));
    }
  };

  const handleChangeStartTime = (time) => {
    const dateTime = new Date(time * 1000).toISOString().substr(11, 8);
    setFormData({
      ...formData,
      startHour: dateTime,
    });
  };

  const handleChangeEndTime = (time) => {
    const dateTime = new Date(time * 1000).toISOString().substr(11, 8);
    setFormData({
      ...formData,
      endHour: dateTime,
    });
  };

  const handleChangeDate = (date) => {
    setFormData({
      ...formData,
      date: date,
    });
  };
  console.log("date :", formData);

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then(async (results) => {
        const foo = await getLatLng(results[0]);
        return [foo, results[0].formatted_address];
      })
      .then(([latLng, address]) =>
        setFormData({ ...formData, coords: [latLng.lng, latLng.lat], address })
      )
      .catch((error) => console.error("Error", error));
  };

  const handleChangeAddress = (address) => {
    setFormData({ ...formData, address });
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
    if (params && params.id && selectedEvent && selectedEvent._id) {
      setFormData((formData) => ({
        ...formData,
        title: selectedEvent.title,
        shop: selectedEvent.shop,
        images: selectedEvent.images,
        description: selectedEvent.description,
        address: selectedEvent.address,
        coords: selectedEvent.coords.coordinates,
        phone: selectedEvent.phone,
        // date: selectedEvent.date,
        startHour: selectedEvent.startHour,
        endHour: selectedEvent.endHour,
      }));
    }
  }, [currentUser, params]);

  // useEffect(() => {
  //   dispatch(event);
  // }, [[]]);

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
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
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
                  <Button
                    variant="info"
                    onClick={uploadWidget}
                    style={{
                      backgroundColor: "#F57F5B",
                      color: "white",
                      border: "none",
                    }}
                  >
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
              {/* <Form.Group>
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
            </Form.Group> */}
              {/* <Form.Group>
              <Form.Label>Store Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Store Name"
                name="shop"
                value={formData.shop}
                onChange={handleChange}
              />
            </Form.Group> */}
              <Form.Group>
                <Form.Label>Choose Your Shop</Form.Label>

                <Form.Control
                  as="select"
                  required
                  className="mr-sm-2"
                  id="inlineFormCustomSelect"
                  custom
                  name="shop"
                  value={formData.shop}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  {currentUser?.shops?.map((shop) => (
                    <option key={shop._id} value={shop._id}>
                      {shop.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label className="mr-3">Event Date</Form.Label>
                <DatePicker
                  selected={formData.date}
                  name="date"
                  value={formData.date}
                  onChange={handleChangeDate}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="mr-3">Event Hour</Form.Label>
                <Row>
                  <Col>
                    <span>
                      <small>Start Hour</small>
                    </span>
                    <TimePicker
                      start="00:00"
                      end="23:59"
                      step={30}
                      name="startHour"
                      value={formData.startHour}
                      onChange={handleChangeStartTime}
                    />
                  </Col>
                  <Col>
                    <span>
                      <small>End Hour</small>
                    </span>
                    <TimePicker
                      start="00:00"
                      end="23:59"
                      step={30}
                      name="endHour"
                      value={formData.endHour}
                      onChange={handleChangeEndTime}
                    />
                  </Col>
                </Row>
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
                <Form.Label>Street Address</Form.Label>
                <PlacesAutocomplete
                  value={formData.address}
                  onChange={handleChangeAddress}
                  onSelect={handleSelect}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div>
                      <input
                        style={{ width: "34rem" }}
                        {...getInputProps({
                          placeholder: "Street Adrress",
                          className: "location-search-input",
                        })}
                      />
                      <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion) => {
                          const className = suggestion.active
                            ? "suggestion-item--active"
                            : "suggestion-item";
                          // inline style for demonstration purpose
                          const style = suggestion.active
                            ? { backgroundColor: "#fafafa", cursor: "pointer" }
                            : { backgroundColor: "#ffffff", cursor: "pointer" };
                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                              })}
                              key={suggestion.placeId}
                            >
                              <span>{suggestion.description}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
              </Form.Group>

              <Form.Group>
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Contact Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Form.Group>

              <ButtonGroup className="d-flex mb-3">
                {loading ? (
                  <Button
                    className="mr-3"
                    variant="dark"
                    type="button"
                    disabled
                  >
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Submitting...
                  </Button>
                ) : (
                  <Button
                    className="mr-3"
                    type="submit"
                    variant="dark"
                    style={{ backgroundColor: "#B7A986", border: "none" }}
                  >
                    Submit
                  </Button>
                )}
                <Button
                  variant="light"
                  onClick={handleCancel}
                  disabled={loading}
                >
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
      </Container>
    </div>
  );
};

export default AddEditEventPage;
