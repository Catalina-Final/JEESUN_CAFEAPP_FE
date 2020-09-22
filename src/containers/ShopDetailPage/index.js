import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
// import Markdown from "react-markdown";
import Moment from "react-moment";
import { Button, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { shopActions } from "../../redux/actions";
import ReviewList from "../../components/ReviewList";
import ReviewShop from "../../components/ReviewShop";

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

  console.log(shop);
  useEffect(() => {
    if (params?.id) {
      dispatch(shopActions.getSingleShop(params.id));
    }
    // dispatch(authActions.getCurrentUser());
  }, [dispatch, params]);

  console.log(userRating);
  return (
    <div className="shop-detail-container">
      {loading ? (
        <ClipLoader color="#f86c6b" size={150} loading={loading} />
      ) : (
        <>
          {shop && (
            <div className="mb-5">
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <h1>{shop.name}</h1>
                  {currentUser?.role === "owner" ||
                  currentUser?.role === "admin" ? (
                    <Link to={`/shop/edit/${shop._id}`}>
                      <Button variant="primary">Edit</Button>
                    </Link>
                  ) : (
                    <span className="text-muted">
                      edited <Moment fromNow>{shop.createdAt}</Moment>
                    </span>
                  )}

                  <hr />
                  <img
                    src={
                      shop?.images?.length
                        ? shop.images[0]
                        : "https://via.placeholder.com/160x100"
                    }
                    style={{ width: "20rem", height: "15rem" }}
                  />
                  {/* <p>
                    <span className="detail-item">Store Name:</span>{" "}
                    <span>{shop.name} </span>
                  </p> */}

                  <p>
                    <span className="detail-item"> #Tag:</span>{" "}
                    <span>
                      {shop.tags &&
                        shop.tags.map((e) => (
                          <Link to={`/tags?q=${e}`}> {e}</Link>
                        ))}
                    </span>
                    {/* <Badge variant="secondary">{shop.tags}</Badge> */}
                  </p>

                  <p>
                    <span className="detail-item">Address:</span>{" "}
                    <span>{shop.address}</span>
                  </p>
                  <p>
                    <span className="detail-item">Contact Number:</span>{" "}
                    <span>{shop.phone}</span>
                  </p>
                  <p>
                    <span className="detail-item">Business Hour:</span>{" "}
                    <span>
                      from {shop.openHour} to {shop.closeHour}
                    </span>
                  </p>
                  {/* <p>
                    <span className="detail-item"> Upcoming Event: </span>{" "}
                    <span>{shop.events}</span>
                  </p> */}
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
    </div>
  );
};

export default ShopDetailPage;
