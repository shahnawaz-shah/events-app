import { useNavigate } from "react-router-dom";
import NavBar from "../../routes/NavBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import wedding1 from "../../assets/images/wedding1.jpeg";
import wedding2 from "../../assets/images/wedding2.jpg";
import corpEvent3 from "../../assets/images/corpEvent3.png";
import Registration from "./Registration";
import "./Home.css";

export default function Home() {
  const nav = useNavigate();
  const isRegistered = false;

  return (
    <div>
      <NavBar />
      <h1>✨Elite Events✨</h1>
      <hr></hr>
      <Container fluid>
        <Row>
          <h2>Your go-to place to manage and keep track of all your events.</h2>
          <Col>
            <Image src={wedding1} thumbnail />
          </Col>
          <Col>
            <Image src={wedding2} thumbnail />
          </Col>
          <Col>
            <Image src={corpEvent3} thumbnail />
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <h3>Register for an account</h3>
          <br></br>
          <br></br>
          <p>
            To make use of our app, you'll need to register for an account. It's
            free, and you won't regret it.
          </p>
          <Registration />
        </Row>
      </Container>
    </div>
  );
}
