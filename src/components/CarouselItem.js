import React, { useState } from "react";
import { Row, Col, Carousel, Card, CardGroup } from "react-bootstrap";
import coffee from "../images/coffee.png";
import event from "../images/event.png";
import InstagramEmbed from "react-instagram-embed";

const CarouselItem = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
      {/* 인스타그램 캐로우셀 */}
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <CardGroup class="d-flex align-content-center flex-column align-items-center">
            <Row>
              <Col sm={3}>
                <Card border="light" style={{ width: "18rem" }}>
                  {/* <Card.Img variant="top" src={coffee} /> */}
                  <InstagramEmbed
                    url="https://www.instagram.com/p/CFP9HQeniVB/"
                    align="center"
                    maxWidth={180}
                    hideCaption={true}
                    containerTagName="div"
                    protocol=""
                    injectScript
                    onLoading={() => {}}
                    onSuccess={() => {}}
                    onAfterRender={() => {}}
                    onFailure={() => {}}
                  />
                </Card>
              </Col>

              <Col sm={3}>
                <Card border="light" style={{ width: "18rem" }}>
                  {/* <Card.Img variant="top" src={event} /> */}
                  <InstagramEmbed
                    url="https://www.instagram.com/p/CFP9COPHQQN/"
                    align="center"
                    maxWidth={180}
                    hideCaption={true}
                    containerTagName="div"
                    protocol=""
                    injectScript
                    onLoading={() => {}}
                    onSuccess={() => {}}
                    onAfterRender={() => {}}
                    onFailure={() => {}}
                  />
                  {/* <Card.Body>
                    <Card.Title>Event</Card.Title>
                    <Card.Text>Calender Event</Card.Text>
                    <Button
                      variant="light"
                      onClick={() => history.push("/events")}
                    >
                      SEE MORE
                    </Button>
                  </Card.Body> */}
                </Card>
              </Col>

              <Col sm={3}>
                <Card border="light" style={{ width: "18rem" }}>
                  {/* <Card.Img variant="top" src={coffee} /> */}
                  <InstagramEmbed
                    url="https://www.instagram.com/p/CFP9FenHM9k/"
                    align="center"
                    maxWidth={180}
                    hideCaption={true}
                    containerTagName="div"
                    protocol=""
                    injectScript
                    onLoading={() => {}}
                    onSuccess={() => {}}
                    onAfterRender={() => {}}
                    onFailure={() => {}}
                  />
                  {/* <Card.Body>
                    <Card.Title>Ranking</Card.Title>
                    <Card.Text>Most Love Cafe in Saigon</Card.Text>
                    <Button
                      variant="light"
                      onClick={() => history.push("/ranking")}
                    >
                      SEE MORE
                    </Button>
                  </Card.Body> */}
                </Card>
              </Col>

              <Col sm={3}>
                <Card border="light" style={{ width: "18rem" }}>
                  {/* <Card.Img variant="top" src={event} /> */}
                  <InstagramEmbed
                    url="https://www.instagram.com/p/CFP9EX0n8FI/"
                    align="center"
                    maxWidth={180}
                    hideCaption={true}
                    containerTagName="div"
                    protocol=""
                    injectScript
                    onLoading={() => {}}
                    onSuccess={() => {}}
                    onAfterRender={() => {}}
                    onFailure={() => {}}
                  />
                  {/* <Card.Body>
                    <Card.Title>Event</Card.Title>
                    <Card.Text>Calender Event</Card.Text>
                    <Button
                      variant="light"
                      onClick={() => history.push("/events")}
                    >
                      SEE MORE
                    </Button>
                  </Card.Body> */}
                </Card>
              </Col>
            </Row>
          </CardGroup>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselItem;
