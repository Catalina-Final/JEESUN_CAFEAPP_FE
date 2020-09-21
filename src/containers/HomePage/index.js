import React from "react";
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
          {/* <h1>Search for a Coffee Society in Saigon</h1> */}
          <div>
            <InputGroup
              className="inline mt-9 mb-4"
              style={{
                width: "24rem",
                marginTop: "18rem",
                marginLeft: "5rem",
              }}
            >
              <FormControl
                placeholder="Search for a Coffee Society in Saigon"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <Button
                  variant="outline-secondary"
                  onClick={(keyword) => history.push(`/search?q=${keyword}`)}
                >
                  Search
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </Jumbotron>

        {/* 중간광고 1번 */}
        <div className="d-flex align-content-center flex-column align-items-center">
          <span className="mt-5 mb-5">
            Coffee Society
            <br />
            Saigon Coffee Showroom
          </span>
        </div>

        {/* 메인카드 3개 */}
        <CardGroup className="d-flex align-content-center flex-column align-items-center">
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
        <div className="d-flex align-content-center flex-column align-items-center">
          <span className="mt-5 mb-5">
            A gathering of like-minded coffee-drinkers who want to learn the art
            of brewing
          </span>
        </div>

        {/* 추가카드 3개 */}
        <CardGroup className="d-flex align-content-center flex-column align-items-center">
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
                  <Button
                    variant="light"
                    onClick={() => history.push("/master")}
                  >
                    READ NOW
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </CardGroup>

        {/* 중간광고 3번 */}
        <div className="d-flex align-content-center flex-column align-items-center">
          <span className="mt-5 mb-5">Instagram</span>
        </div>
        {/* 인스타그램 캐로우셀 */}
        <CarouselItem />
      </Container>
    </>
  );
};

export default HomePage;
