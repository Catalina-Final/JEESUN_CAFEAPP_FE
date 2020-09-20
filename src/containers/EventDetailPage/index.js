import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { Row, Col, Button } from "react-bootstrap";
import { Link, useParams, useHistory } from "react-router-dom";
import Moment from "react-moment";
import { eventActions } from "../../redux/actions";

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

  return (
    <div className="event-detail-container">
      {loading ? (
        <ClipLoader color="#f86c6b" size={150} loading={loading} />
      ) : (
        <>
          {event && (
            <div className="mb-5">
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <h1>{event.title}</h1>
                  {currentUser?.role === "owner" || "admin" ? (
                    <Link to={`/event/edit/${event._id}`}>
                      <Button variant="primary">Edit</Button>
                    </Link>
                  ) : (
                    <span className="text-muted">
                      edited <Moment fromNow>{event.createdAt}</Moment>
                    </span>
                  )}

                  <hr />
                  <p>
                    <span className="detail-item"></span>{" "}
                    <span>{event.images} </span>
                  </p>
                  <p>
                    <span className="detail-item">Event Title: </span>{" "}
                    <span>{event.title} </span>
                  </p>
                  <p>
                    <span className="detail-item">Shop:</span>{" "}
                    <span onClick={(id) => history.push(`/shops/${id}`)}>
                      {event.shop}
                    </span>
                  </p>

                  <p>
                    <span className="detail-item">Description: </span>{" "}
                    <span>{event.description} </span>
                  </p>
                  <p>
                    <span className="detail-item">Address:</span>{" "}
                    <span>{event.address}</span>
                  </p>
                  <p>
                    <span className="detail-item">Contact Number:</span>{" "}
                    <span>{event.phone}</span>
                  </p>
                  <p>
                    <span className="detail-item">Event Hour:</span>{" "}
                    <span>
                      from {event.startHour} to {event.endHour}
                    </span>
                  </p>

                  <hr />
                </Col>
              </Row>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EventDetailPage;
