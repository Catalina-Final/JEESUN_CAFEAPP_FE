import React from "react";
import Moment from "react-moment";

const ReviewList = ({ reviews }) => {
  return (
    <>
      {reviews?.length > 0 && (
        <ul className="list-unstyled">
          {reviews.map((review) => (
            <ReviewContent review={review} key={review._id} />
          ))}
        </ul>
      )}
    </>
  );
};

const ReviewContent = ({ review }) => {
  return (
    <div className="d-flex align-content-center align-items-center">
      <span className="point" style={{ marginRight: "1rem" }}>
        {review?.reviewer?.name}:{" "}
      </span>
      <span> {review?.content}</span>
      <div style={{ marginLeft: "1rem" }}>
        <span>
          <small> rated </small>
          {review?.rating}{" "}
        </span>
        <span> {""}</span>
        <span>
          <small className={{ float: "right" }}>
            ( <Moment fromNow>{review?.createdAt}</Moment>)
          </small>
        </span>
      </div>
    </div>
  );
};

export default ReviewList;
