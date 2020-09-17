import React, { useState } from "react";
import {
  Container,
  Jumbotron,
  CardGroup,
  Card,
  Button,
  InputGroup,
  FormControl,
  Row,
  Col,
  Carousel,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import coffee from "../../images/coffee.png";
import event from "../../images/event.png";
import gears from "../../images/gears.gif";
import taster from "../../images/taster.jpg";
import beans from "../../images/beans.jpg";
import master from "../../images/master.jpg";
import CarouselItem from "../../components/CarouselItem";

const HomePage = () => {
  const history = useHistory();

  return (
    <>
      <Container>
        {/* 점보트론 */}
        <Jumbotron className="text-center jumbotron">
          <h1>Search for a Coffee Society in Saigon</h1>
          <InputGroup className="inline mt-9 mb-4">
            <FormControl
              placeholder="Start Typing to Search"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button variant="outline-secondary">Search</Button>
            </InputGroup.Append>
          </InputGroup>
        </Jumbotron>

        {/* 중간광고 1번 */}
        <div class="d-flex align-content-center flex-column align-items-center">
          <span class="mt-5 mb-5">Saigon Coffee Showroom</span>
        </div>

        {/* 메인카드 3개 */}
        <CardGroup class="d-flex align-content-center flex-column align-items-center">
          <Row>
            <Col sm={4}>
              <Card border="light" style={{ width: "20rem" }}>
                <Card.Img variant="top" src={coffee} />
                <Card.Body>
                  <Card.Title>Ranking</Card.Title>
                  <Card.Text>Most Love Cafe in Saigon</Card.Text>
                  <Button
                    variant="light"
                    onClick={() => history.push("/ranking")}
                  >
                    SEE MORE
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col sm={4}>
              <Card border="light" style={{ width: "20rem" }}>
                <Card.Img variant="top" src={event} />
                <Card.Body>
                  <Card.Title>Event</Card.Title>
                  <Card.Text>Calender Event</Card.Text>
                  <Button
                    variant="light"
                    onClick={() => history.push("/events")}
                  >
                    SEE MORE
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col sm={4}>
              <Card border="light" style={{ width: "20rem" }}>
                <Card.Img variant="top" src={gears} />
                <Card.Body>
                  <Card.Title>Beans and Gears </Card.Title>
                  <Card.Text>E Commerce</Card.Text>
                  <Button
                    variant="light"
                    onClick={() => history.push("/gears")}
                  >
                    SEE MORE
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </CardGroup>

        {/* 중간광고 2번 */}
        <div class="d-flex align-content-center flex-column align-items-center">
          <span class="mt-5 mb-5">Coffee Information</span>
        </div>

        {/* 추가카드 3개 */}
        <CardGroup class="d-flex align-content-center flex-column align-items-center">
          <Row>
            <Col sm={4}>
              <Card border="light" style={{ width: "20rem" }}>
                <Card.Img variant="top" src={taster} />
                <Card.Body>
                  <Card.Title>Taster</Card.Title>
                  <Card.Text>How to taste</Card.Text>
                  <Button variant="light" onClick={() => history.push("/")}>
                    READ NOW
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col sm={4}>
              <Card border="light" style={{ width: "20rem" }}>
                <Card.Img variant="top" src={beans} />
                <Card.Body>
                  <Card.Title>Beans</Card.Title>
                  <Card.Text>Types of Beans</Card.Text>
                  <Button variant="light" onClick={() => history.push("/")}>
                    READ NOW
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col sm={4}>
              <Card border="light" style={{ width: "20rem" }}>
                <Card.Img variant="top" src={master} />
                <Card.Body>
                  <Card.Title>Master</Card.Title>
                  <Card.Text>Barista Class</Card.Text>
                  <Button variant="light" onClick={() => history.push("/")}>
                    READ NOW
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </CardGroup>

        {/* 중간광고 3번 */}
        <div class="d-flex align-content-center flex-column align-items-center">
          <span class="mt-5 mb-5">Instagram</span>
        </div>
        {/* 인스타그램 캐로우셀 */}
        <CarouselItem />
      </Container>
    </>
  );
};

export default HomePage;
