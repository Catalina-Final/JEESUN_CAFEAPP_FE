import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  ButtonGroup,
  Container,
} from "react-bootstrap";
import { shopActions } from "../../redux/actions";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  // geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import TimePicker from "react-bootstrap-time-picker";

const tagTypes = ["modern", "traditional", "specialty", "dessert", "brunch"];

const AddEditShopPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    owner: "",
    images: null,
    address: "",
    district: "",
    phone: "",
    tags: [],
    coords: [],
    openHour: "",
    closeHour: "",
  });
  console.log("data: ", formData);
  const params = useParams();
  const dispatch = useDispatch();
  const addOrEdit = params.id ? "Edit" : "Add";
  const selectedShop = useSelector((state) => state.shop.selectedShop);
  const loading = useSelector((state) => state.shop.loading);
  const currentUser = useSelector((state) => state.auth.user);
  const history = useHistory();
  const redirectTo = useSelector((state) => state.shop.redirectTo);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeOpenTime = (time) => {
    const dateTime = new Date(time * 1000).toISOString().substr(11, 8);
    setFormData({
      ...formData,
      openHour: dateTime,
    });
  };

  const handleChangeCloseTime = (time) => {
    const dateTime = new Date(time * 1000).toISOString().substr(11, 8);
    setFormData({
      ...formData,
      closeHour: dateTime,
    });
  };
  const handleChangeTags = (e, tag) => {
    console.log(e.target.checked, tag);
    if (e.target.checked) {
      // add the tag
      if (formData.tags.indexOf(tag) === -1)
        setFormData((formData) => ({
          ...formData,
          tags: [...formData.tags, tag],
        }));
    } else {
      // remove the tag
      if (formData.tags.indexOf(tag) !== -1) {
        setFormData((formData) => ({
          ...formData,
          tags: formData.tags.filter((t) => t !== tag),
        }));
      }
    }
  };

  const handleChangeAddress = (address) => {
    setFormData({ ...formData, address });
  };

  // const handleChangeOnDistrict = (e) => {
  //   console.log(e.target.name);
  //   setFormData({ ...formData, district: e.target.value });
  // };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (addOrEdit === "Add") {
      dispatch(shopActions.createNewShop(formData));
    } else if (addOrEdit === "Edit") {
      dispatch(shopActions.updateShop(selectedShop._id, formData));
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleDelete = () => {
    dispatch(shopActions.deleteShop(selectedShop._id));
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
        dispatch(shopActions.setRedirectTo(""));
      } else {
        history.push(redirectTo);
        dispatch(shopActions.setRedirectTo(""));
      }
    }
  }, [redirectTo, dispatch, history]);

  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
        tags: ["coffeeSociety", "shopImages"],
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
    <div className="add-edit-container">
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={handleSubmit}>
              <div className="text-center mb-3">
                <h1 className="text-dark">{addOrEdit} Shop</h1>
              </div>
              {/* <Form.Group>
              <Form.File
                id="exampleFormControlFile1"
                label="Store Image"
                required
                type="file"
                name="images"
                value={formData.images}
                onChange={handleChange}
              />
            </Form.Group> */}
              <Form.Group>
                {formData?.images?.map((image) => (
                  <img
                    src={image}
                    key={image}
                    width="150px"
                    height="150px"
                    alt="shop images"
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
                <Form.Label className="label">Store Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Store Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="label">Owner Name</Form.Label>
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
                <Form.Label className="label">Street Address</Form.Label>
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
                <Form.Label className="label">District</Form.Label>

                <Form.Control
                  as="select"
                  required
                  className="mr-sm-2"
                  id="inlineFormCustomSelect"
                  custom
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                >
                  <option value="0">Choose District</option>
                  <option value="1">Disctrict 1</option>
                  <option value="2">Disctrict 2</option>
                  <option value="3">Disctrict 3</option>
                  <option value="4">Disctrict 4</option>
                  <option value="5">Disctrict 5</option>
                  <option value="6">Disctrict 6</option>
                  <option value="7">Disctrict 7</option>
                  <option value="8">Disctrict 9</option>
                  <option value="9">Disctrict 10</option>
                  <option value="10">Disctrict 11</option>
                  <option value="11">Bình Thạnh District</option>
                  <option value="12">Gò Vấp District</option>
                  <option value="13">Phú Nhuận District</option>
                  <option value="14">Tân Bình District</option>
                  <option value="15">Tân Phú District</option>
                  <option value="16">etc</option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label className="label">Contact Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Contact Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label
                  className="mr-3 label"
                  style={{ marginRight: "1rem" }}
                >
                  Tags
                </Form.Label>
                {tagTypes.map((type, index) => (
                  <Form.Check
                    name="tags"
                    key={index}
                    inline
                    label={type}
                    type="checkbox"
                    onChange={(e) => handleChangeTags(e, type)}
                  />
                ))}
              </Form.Group>
              <Form.Group>
                <Form.Label className="mr-3 label">Business Hour</Form.Label>
                <Row>
                  <Col>
                    <span>
                      <small>Open Hour</small>
                    </span>

                    <TimePicker
                      start="00:00"
                      end="23:59"
                      step={30}
                      name="openHour"
                      value={formData.openHour}
                      onChange={handleChangeOpenTime}
                    />
                  </Col>
                  <Col>
                    <span>
                      <small>Close Hour</small>
                    </span>
                    <TimePicker
                      start="00:00"
                      end="23:59"
                      step={30}
                      name="closeHour"
                      value={formData.closeHour}
                      onChange={handleChangeCloseTime}
                    />
                  </Col>
                </Row>
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
                    Delete Shop
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

export default AddEditShopPage;
