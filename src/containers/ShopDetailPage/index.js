import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
// import Markdown from "react-markdown";
import Moment from "react-moment";
import { Button, Row, Col, Container, Badge } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { shopActions } from "../../redux/actions";
import ReviewList from "../../components/ReviewList";
import ReviewShop from "../../components/ReviewShop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const ShopDetailPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.shop.loading);
  const shop = useSelector((state) => state.shop.selectedShop);
  const currentUser = useSelector((state) => state.auth.user);
  const [userRating, setUserRating] = useState(5);
  // const history = useHistory();
  const submitReviewLoading = useSelector(
    (state) => state.shop.submitReviewLoading
  );
  const [reviewText, setReviewText] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // const [favorited, setFavorited] = useState;

  const handleInputChange = (e) => {
    setReviewText(e.target.value);
    // console.log("review :", e.target.value);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    dispatch(shopActions.createReview(shop._id, reviewText, userRating));
    setReviewText("");
    console.log("review submit :", reviewText);
  };

  const handleOnFavorite = (e) => {
    e.preventDefault();
    dispatch(shopActions.favoriteFromSingleShop(shop._id));
  };

  console.log(shop);
  useEffect(() => {
    if (params?.id) {
      dispatch(shopActions.getSingleShop(params.id));
    }
    // dispatch(authActions.getCurrentUser());
  }, [dispatch, params]);

  console.log(userRating);
  return (
    <div className="detail-container montserrat">
      <Container>
        {loading ? (
          <ClipLoader color="#b7a986" size={150} loading={loading} />
        ) : (
          <>
            {shop && (
              <div className="mb-5">
                <Row>
                  <Col md={{ span: 6, offset: 3 }}>
                    <Row>
                      <Col sm={8}>
                        {/* {shop._id} <br /> */}
                        <h1 style={{ color: "#B7A986" }}>{shop.name}</h1>
                      </Col>

                      <Col sm={2}>
                        <Button variant="link" className="click-button">
                          <FontAwesomeIcon
                            icon={faHeart}
                            size="2x"
                            className="click-button"
                            style={{
                              color: currentUser?.favorites.includes(shop._id)
                                ? "red"
                                : "black",
                            }}
                            onClick={handleOnFavorite}
                          />
                        </Button>
                      </Col>

                      <Col sm={2}>
                        {currentUser?.role === "owner" ||
                        currentUser?.role === "admin" ? (
                          <Link to={`/shop/edit/${shop._id}`}>
                            <Button
                              style={{
                                backgroundColor: "F57F5B",
                                border: "none",
                              }}
                              variant="primary"
                            >
                              Edit
                            </Button>
                          </Link>
                        ) : (
                          <span className="text-muted">
                            edited <Moment fromNow>{shop.createdAt}</Moment>
                          </span>
                        )}
                      </Col>
                    </Row>
                    <hr />
                    <img
                      src={
                        shop?.images?.length
                          ? shop.images[0]
                          : "https://via.placeholder.com/160x100"
                      }
                      alt="shop images"
                      style={{
                        width: "33rem",
                        height: "28rem",
                        borderRadius: "20px",
                      }}
                    />
                    {/* <p>
                    <span className="detail-item">Store Name:</span>{" "}
                    <span>{shop.name} </span>
                  </p> */}
                    <p>
                      <br></br>
                      <span className="detail-item label"> #Tags:</span>{" "}
                      <span>
                        {shop.tags &&
                          shop.tags.map((tag) => (
                            <Link key={tag} to={`/search?q=${tag}`}>
                              {" "}
                              <Badge
                                style={{
                                  marginLeft: "1rem",
                                  width: "5rem",
                                  backgroundColor: "#f57f5b",
                                }}
                                variant="secondary"
                              >
                                {tag}
                              </Badge>
                            </Link>
                          ))}
                      </span>
                      {/* <Badge variant="secondary">{shop.tags}</Badge> */}
                    </p>
                    <p>
                      <span className="detail-item label">Address:</span>{" "}
                      <span className="label">{shop.address}</span>
                    </p>
                    <p>
                      <span className="detail-item label">Contact Number:</span>{" "}
                      <span className="label">{shop.phone}</span>
                    </p>
                    <p>
                      <span className="detail-item label">Business Hour:</span>{" "}
                      <span className="label">
                        from {shop.openHour} to {shop.closeHour}
                      </span>
                    </p>
                    {/* <p>
                    <span className="detail-item "> Upcoming Event: </span>{" "}
                    <span>{shop.events}</span>
                  </p> */}
                    <hr />

                    <p>
                      <span className="detail-item label">
                        <span style={{ fontSize: "20px" }} className="point">
                          "{shop.favoriteUserCount}"{" "}
                        </span>
                        people have saved here in their favorite lists.
                      </span>
                    </p>
                    <p>
                      <span className="detail-item label"> This cafe has</span>{" "}
                      <span style={{ fontSize: "20px" }} className="point">
                        "{shop.reviewCount}"{" "}
                      </span>
                      <span className="detail-item label">reviews below.</span>
                    </p>
                    <p>
                      <span className="detail-item label">
                        Average ratings is{" "}
                      </span>
                      <span style={{ fontSize: "20px" }} className="point">
                        "{shop.avgRatings}"
                      </span>
                    </p>
                    <hr />
                    <ReviewList reviews={shop.reviews} />
                    <hr />
                  </Col>
                </Row>
              </div>
            )}
            {isAuthenticated && (
              <ReviewShop
                reviewText={reviewText}
                ratingChanged={(v) => setUserRating(v)}
                handleInputChange={handleInputChange}
                handleSubmitReview={handleSubmitReview}
                loading={submitReviewLoading}
              />
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default ShopDetailPage;
