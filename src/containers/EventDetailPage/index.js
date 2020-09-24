import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { Row, Col, Button, Container } from "react-bootstrap";
import { Link, useParams, useHistory } from "react-router-dom";
import Moment from "react-moment";
import { eventActions } from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const EventDetailPage = () => {
  const loading = useSelector((state) => state.shop.loading);
  const dispatch = useDispatch();
  const event = useSelector((state) => state.event.selectedEvent);
  const currentUser = useSelector((state) => state.auth.user);
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    if (params?.id) {
      dispatch(eventActions.getSingleEvent(params.id));
    }
    // dispatch(authActions.getCurrentUser());
  }, [dispatch, params]);

  const handleOnInterest = (e) => {
    e.preventDefault();
    dispatch(eventActions.interestFromSingleEvent(event._id));
  };

  return (
    <div className="detail-container  montserrat">
      <Container>
        {loading ? (
          <ClipLoader color="#b7a986" size={150} loading={loading} />
        ) : (
          <>
            {event && (
              <div className="mb-5">
                <Row>
                  <Col md={{ span: 6, offset: 3 }}>
                    <Row>
                      <Col sm={8}>
                        <h1 className="point">{event.title}</h1>
                      </Col>
                      <Col sm={2}>
                        <Button variant="link" className="click-button">
                          <FontAwesomeIcon
                            icon={faStar}
                            size="2x"
                            className="click-button"
                            style={{
                              color: currentUser?.interested.includes(event._id)
                                ? "orange"
                                : "lightgray",
                            }}
                            onClick={handleOnInterest}
                          />
                        </Button>
                      </Col>
                      <Col sm={2}>
                        {currentUser?.role === "owner" ||
                        currentUser?.role === "admin" ? (
                          <Link to={`/event/edit/${event._id}`}>
                            <Button variant="primary">Edit</Button>
                          </Link>
                        ) : (
                          <span className="text-muted">
                            edited <Moment fromNow>{event.createdAt}</Moment>
                          </span>
                        )}
                      </Col>
                    </Row>

                    <hr />

                    <p>
                      <span className="detail-item"></span>{" "}
                      <img
                        src={
                          event?.images?.length
                            ? event.images[0]
                            : "https://via.placeholder.com/160x100"
                        }
                        alt="event-images"
                        style={{
                          width: "33rem",
                          height: "28rem",
                          borderRadius: "20px",
                        }}
                      />
                    </p>
                    <p>
                      <br></br>
                      <span className="detail-item label">
                        Event Title:{" "}
                      </span>{" "}
                      <span className="label">{event.title} </span>
                    </p>
                    <p>
                      <span className="detail-item label">Shop:</span>{" "}
                      <span
                        className="point"
                        onClick={(id) => history.push(`/shops/${id}`)}
                      >
                        {event.shop && event.shop.name}
                      </span>
                    </p>
                    <p>
                      <span className="detail-item label">Description: </span>{" "}
                      <span className="label">{event.description} </span>
                    </p>
                    <p>
                      <span className="detail-item label">Address:</span>{" "}
                      <span className="label">{event.address}</span>
                    </p>
                    <p>
                      <span className="detail-item label">Contact Number:</span>{" "}
                      <span className="label"> {event.phone}</span>
                    </p>
                    <p>
                      <span className="detail-item label">Event Hour:</span>{" "}
                      <span className="label">
                        from {event.startHour} to {event.endHour}
                      </span>
                    </p>
                    <hr />

                    <p>
                      <span className="detail-item label">
                        <span style={{ fontSize: "20px" }} className="point">
                          "{event.interestedCount}"{" "}
                        </span>
                        people are interested in this event.
                      </span>
                    </p>
                    <hr />
                  </Col>
                </Row>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default EventDetailPage;
