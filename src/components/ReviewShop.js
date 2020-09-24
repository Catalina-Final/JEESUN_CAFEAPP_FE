import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
// import { useSelector, useDispatch } from "react-redux";
import ReactStars from "react-rating-stars-component";

const ReviewShop = ({
  reviewText,
  handleInputChange,
  handleSubmitReview,
  loading,
  ratingChanged,
}) => {
  return (
    <Form onSubmit={handleSubmitReview}>
      <Form.Group as={Row}>
        <Form.Label htmlFor="review" column sm="2">
          Review:
        </Form.Label>
        <Col sm="8">
          <Form.Control
            id="review"
            type="text"
            value={reviewText}
            onChange={handleInputChange}
          />
          <ReactStars
            count={5}
            required
            onChange={ratingChanged}
            size={24}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
          />
        </Col>
        {loading ? (
          <Button
            variant="primary"
            type="button"
            disabled
            style={{ backgroundColor: "#b7a986", border: "none" }}
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
            type="submit"
            disabled={!reviewText}
            style={{ backgroundColor: "#b7a986", border: "none" }}
          >
            Submit
          </Button>
        )}
      </Form.Group>
    </Form>
  );
};

export default ReviewShop;
