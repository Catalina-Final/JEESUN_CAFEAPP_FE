import React, { useState } from "react";
import { Row, Col, Carousel, Card, CardGroup } from "react-bootstrap";
import coffee from "../images/coffee.png";
import event from "../images/event.png";

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
                  <Card.Img variant="top" src={coffee} />
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
                  <Card.Img variant="top" src={event} />
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
                  <Card.Img variant="top" src={coffee} />
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
                  <Card.Img variant="top" src={event} />
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
