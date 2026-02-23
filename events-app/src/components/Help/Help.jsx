import NavBar from "../../routes/NavBar";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import step1 from "../../assets/images/step1.png";
import step2 from "../../assets/images/step2.png";
import step3 from "../../assets/images/step3.png";
import step4 from "../../assets/images/step4.png";
import step5 from "../../assets/images/step5.png";

export default function Help() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <div>
      <NavBar />
      <h1>How to use our app</h1>
      <hr></hr>

      <Container>
        <Row style={{ marginBottom: 20 }}>
          <Col>
            <h4>Step 1</h4>
            <p>On the home page, register for an account using the form.</p>
            <Image src={step1} thumbnail />
          </Col>
          <Col>
            <h4>Step 2</h4>
            <p>
              Click the log in button to head to your dashboard, which won't
              have anything yet!
            </p>
            <Image src={step2} thumbnail />
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col>
            <h4>Step 3</h4>
            <p>Click the Manage events tab and start adding your events.</p>
            <Image src={step3} thumbnail />
          </Col>
          <Col>
            <h4>Step 4</h4>
            <p>Check your dashboard to see your upcoming events!</p>
            <Image src={step4} thumbnail />
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col>
            <h4>Step 5</h4>
            <p>
              You can edit or delete your events any time on the Manage events
              page. Just click Edit or Delete event.
            </p>
            <Image src={step5} thumbnail />
          </Col>
          <Col style={{ textAlign: "center" }}>
            <h4>Step 6</h4>
            <p>You're all done! Here are some tips for managing your events:</p>
            <ul style={{ textAlign: "left", display: "inline-block" }}>
              <li>Always check the dates and times carefully!</li>
              <li>Add as much detail as you can in the description!</li>
              <li>
                If things change, don't panic. Just edit the details and watch
                them update on your dashboard.
              </li>
            </ul>
            <p>Enjoy😊 - Team EliteEvents</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
