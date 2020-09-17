import React from "react";
import { Card } from "react-bootstrap";

const ShopCard = ({ shop, handleClick }) => {
  return (
    <div className="shop-card" onClick={() => handleClick(shop._id)}>
      <Card.Img
        src="https://via.placeholder.com/160x100"
        style={{ width: "20rem" }}
      />
      <Card.Body className="shop-card-body">
        <Card.Title>Coffee Place Name</Card.Title>
        <Card.Text>Total Ratings</Card.Text>
        <Card.Text>the number of reviews</Card.Text>
        <Card.Text>
          <small className="text-muted">Add to Favorite List</small>
        </Card.Text>
      </Card.Body>
    </div>
  );
};

export default ShopCard;
