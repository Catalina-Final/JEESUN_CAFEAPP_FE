import React, { useState } from "react";
import {
  // Container,
  Jumbotron,
  CardGroup,
  Card,
  Button,
  InputGroup,
  FormControl,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import coffee from "../../images/coffee.png";
import event from "../../images/event.png";
import gears from "../../images/gears.gif";
import taster from "../../images/taster.jpg";
import beans from "../../images/beans.jpg";
import master from "../../images/master.jpg";
import CarouselItem from "../../components/CarouselItem";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    history.push(`/search?q=${searchTerm}`);
  };

  return (
    <div className="main-container">
      {/* <Container> */}
      {/* 점보트론 */}
      <Jumbotron className="text-center jumbotron">
        {/* <h1>Search for a Coffee Society in Saigon</h1> */}
        <div classnName="search-box">
          <Form onSubmit={handleSubmitSearch}>
            <InputGroup
              className="inline mt-9 mb-4"
              style={{
                width: "24rem",
                marginTop: "18rem",
                marginLeft: "10rem",
              }}
            >
              <FormControl
                placeholder="Search for a Coffee Society in Saigon"
                aria-describedby="basic-addon2"
                className="montserrat"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <InputGroup.Append>
                <Button
                  style={{ color: "#72684f", border: "none" }}
                  variant="outline-secondary"
                  type="submit"
                >
                  <i class="fas fa-search" style={{ color: "white" }}></i>
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </div>
      </Jumbotron>

      {/* 중간광고 1번 */}
      <div className="d-flex align-content-center flex-column align-items-center">
        <span className="mt-5 mb-5">
          <h5 className="insert-sentence text-center">
            Farmlevel to Streetlevel
          </h5>
          <h2 className="insert-sentence">Saigon Coffee Showroom</h2>
        </span>
      </div>

      {/* 메인카드 3개 */}
      <CardGroup className="d-flex align-content-center flex-column align-items-center">
        <Row>
          <Col sm={4}>
            <Card border="light" style={{ width: "25rem" }}>
              <Card.Img variant="top" src={coffee} />
              <Card.Body className="card-title">
                <Card.Title> CAFE RANKING</Card.Title>
                <Card.Text>Rate your favorite cafes</Card.Text>
                <Button
                  style={{ backgroundColor: "#F57F5B", color: "white" }}
                  variant="light"
                  onClick={() => history.push("/ranking")}
                >
                  SEE MORE {" >>"}
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={4}>
            <Card border="light" style={{ width: "25rem" }}>
              <Card.Img variant="top" src={event} />
              <Card.Body className="card-title">
                <Card.Title>UPCOMING EVENTS</Card.Title>
                <Card.Text>Spare your time for the events</Card.Text>
                <Button
                  style={{ backgroundColor: "#F57F5B", color: "white" }}
                  variant="light"
                  onClick={() => history.push("/events")}
                >
                  SEE MORE {" >>"}
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={4}>
            <Card border="light" style={{ width: "25rem" }}>
              <Card.Img variant="top" src={gears} />
              <Card.Body className="card-title">
                <Card.Title>SHOP GEARS </Card.Title>
                <Card.Text>Make your own Home-Cafe</Card.Text>
                <Button
                  style={{ backgroundColor: "#F57F5B", color: "white" }}
                  variant="light"
                  onClick={() => history.push("/gears")}
                >
                  SEE MORE {" >>"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </CardGroup>

      {/* 중간광고 2번 */}
      <div className="d-flex align-content-center flex-column align-items-center">
        <span className="mt-5 mb-5  ">
          <h5 className="insert-sentence">
            A gathering of like-minded coffee-drinkers who want to learn the art
            of brewing
          </h5>
        </span>
      </div>

      {/* 추가카드 3개 */}
      <CardGroup className="d-flex align-content-center flex-column align-items-center">
        <Row>
          <Col sm={4}>
            <Card border="light" style={{ width: "25rem" }}>
              <Card.Img variant="top" src={taster} />
              <Card.Body className="card-title">
                <Card.Title>TASTE COFFEE</Card.Title>
                <Card.Text>How to taste coffee</Card.Text>
                <Button
                  style={{ backgroundColor: "#F57F5B", color: "white" }}
                  variant="light"
                  onClick={() => history.push("/taste")}
                >
                  READ MORE{" >>"}
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={4}>
            <Card border="light" style={{ width: "25rem" }}>
              <Card.Img variant="top" src={beans} />
              <Card.Body className="card-title">
                <Card.Title>SPECIAL BEANS</Card.Title>
                <Card.Text>the variety of beans</Card.Text>
                <Button
                  style={{ backgroundColor: "#F57F5B", color: "white" }}
                  variant="light"
                  onClick={() => history.push("/beans")}
                >
                  READ MORE{" >>"}
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={4}>
            <Card border="light" style={{ width: "25rem" }}>
              <Card.Img variant="top" src={master} />
              <Card.Body className="card-title">
                <Card.Title>BARISTA CLASS</Card.Title>
                <Card.Text>immerse yourself into coffee deeply</Card.Text>
                <Button
                  style={{ backgroundColor: "#F57F5B", color: "white" }}
                  variant="light"
                  onClick={() => history.push("/master")}
                >
                  READ MORE{" >>"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </CardGroup>

      {/* 중간광고 3번 */}
      <div className="d-flex align-content-center flex-column align-items-center">
        <span className="mt-5 mb-5 ">
          <h3 className="insert-sentence">Our Moments</h3>
        </span>
      </div>
      {/* 인스타그램 캐로우셀 */}
      <CarouselItem />
      {/* </Container> */}
    </div>
  );
};

export default HomePage;
