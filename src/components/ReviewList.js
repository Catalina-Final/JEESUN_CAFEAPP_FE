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
    <div>
      <span>{review?.content}</span>
      <br />
      <span>posted by </span>
      <span>{review?.reviewer?.name}</span>
      <span> on </span>
      <span>
        <Moment fromNow>{review?.createdAt}</Moment>
      </span>
    </div>
  );
};

export default ReviewList;
