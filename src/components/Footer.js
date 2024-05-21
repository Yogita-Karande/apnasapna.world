import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
   <Container fluid className="border-top border-2 py-3 mt-2 mt-lg-4">
    <Row>
      <Col className="text-white text-center">
         <NavLink className="nav-link" to="/privacy-policy">Privacy Policy</NavLink>
         <span>&copy;2024 All rights reserved <strong>{process.env.REACT_APP_NAME}</strong></span>
      </Col>
     </Row>
     
    </Container>
  )
}

export default Footer;