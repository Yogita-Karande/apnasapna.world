import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

const NotificationCard = ({ heading, paragraph, image, link }) => {
  return (
    <Container>
      <Row className='justify-content-center'>
        <Col lg={7}>
          <Card  className="rounded mx-auto mb-3">
            <Card.Body>
              <Card.Title>{heading}</Card.Title>
              <p>{paragraph}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NotificationCard;
