import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
// import Moment from "react-moment";

const ShopCard = ({ shop, handleClick }) => {
  return (
    <div className="shop-card" onClick={() => handleClick(shop._id)}>
      <Card.Img
        variant="top"
        src={
          shop?.images?.length
            ? shop.images[0]
            : "https://via.placeholder.com/160x100"
        }
        style={{ width: "20rem", height: "15rem" }}
      />
      <Card.Body className="shop-card-body">
        <Row>
          <Col xs={6}>
            <Card.Title>{shop.name}</Card.Title>

            <Badge variant="secondary">{shop.tags}</Badge>

            <div>
              <div>{shop.address}</div>
              <div>District {shop.district}</div>
            </div>
          </Col>
          <Col xs={5}>
            <Card.Text>Average ratings:{shop.ratingCount}</Card.Text>
            <Card.Text>Totla reviews: {shop.reviewCount}</Card.Text>
            <Card.Text>Favorited numbers: {shop.favoriteUserCount}</Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </div>
  );
};

export default ShopCard;
