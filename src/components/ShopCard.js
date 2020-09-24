import React from "react";
import { Card, Row, Col, Badge, Button } from "react-bootstrap";
// import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const ShopCard = ({ shop, handleClick, color, handleOnFavorite }) => {
  console.log(shop.tags);
  return (
    <>
      <div className="shop-card">
        <Card.Img
          variant="top"
          src={
            shop?.images?.length
              ? shop.images[0]
              : "https://via.placeholder.com/160x100"
          }
          style={{ width: "20rem", height: "15rem", borderRadius: "18px" }}
        />
        <Card.Body>
          <Row>
            <Col xs={5}>
              <Card.Title
                style={{ color: "#F57F5B" }}
                onClick={() => handleClick(shop._id)}
              >
                {shop.name}
              </Card.Title>
            </Col>

            <Col xs={6}>
              {shop.tags.map((tag, i) => (
                <Badge
                  key={i}
                  style={{
                    marginLeft: "1rem",
                    width: "5rem",
                    backgroundColor: "#f57f5b",
                  }}
                  variant="secondary"
                >
                  {tag}
                </Badge>
              ))}
            </Col>

            <Col xs={1}>
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

          <Row>
            <Col xs={7}>
              <div style={{ marginTop: "1rem" }}>
                <div>
                  <span className="card-menu">Address: </span>{" "}
                  <span style={{ fontSize: "15px" }}>{shop.address}</span>
                </div>
                <div style={{ paddingTop: "2rem" }}>
                  <span className="card-menu">District: </span>{" "}
                  <span style={{ fontSize: "20px" }}>{shop.district}</span>
                </div>
                {/* <div>Shop: {shop.phone}</div> */}
              </div>
            </Col>

            <Col xs={4}>
              <Card.Text>
                {" "}
                <span className="card-menu">Average ratings is </span>"
                <span style={{ fontSize: "20px" }}>{shop.avgRatings}</span>"
              </Card.Text>
              <Card.Text>
                <span className="card-menu">You can check </span> "
                <span style={{ fontSize: "20px" }}>{shop.reviewCount}</span>"
                reviews.
              </Card.Text>
              <Card.Text>
                <span className="card-menu">
                  "{" "}
                  <span style={{ fontSize: "20px" }}>
                    {shop.favoriteUserCount}
                  </span>
                  " people have saved here in their favorite lists.
                </span>
              </Card.Text>
            </Col>

            <Col xs={1}></Col>
          </Row>
        </Card.Body>
      </div>
    </>
  );
};

export default ShopCard;
