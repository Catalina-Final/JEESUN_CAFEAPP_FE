import React from "react";
import { Card, Row, Col, Badge, Button } from "react-bootstrap";
// import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const ShopCard = ({ shop, handleClick, color, handleOnFavorite }) => {
  return (
    <div className="shop-card">
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
            <Card.Title onClick={() => handleClick(shop._id)}>
              {shop.name}
            </Card.Title>

            <Badge variant="secondary">{shop.tags}</Badge>

            <div>
              <div>{shop.address}</div>
              <div>District {shop.district}</div>
            </div>
          </Col>
          <Col xs={5}>
            <Card.Text>Average ratings:{shop.avgRatings}</Card.Text>
            <Card.Text>Total reviews: {shop.reviewCount}</Card.Text>
            <Card.Text>Favorited numbers: {shop.favoriteUserCount}</Card.Text>
            <Button variant="link" className="click-button">
              <FontAwesomeIcon
                icon={faHeart}
                size="1x"
                className="click-button"
                style={{
                  color: color,
                }}
                onClick={() => handleOnFavorite(shop._id)}
              />
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </div>
  );
};

export default ShopCard;
