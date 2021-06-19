import axios from "axios";

import { Card, Container, Row, Col } from "react-bootstrap";

const CardWallet = () => {
  return (
    <Container>
      <Row>
        <Col md={4}>
          <Card style={{ width: "18rem" }} className="mt-2">
            <Card.Body>
              <Card.Title>Wallet name</Card.Title>
              <Card.Text>Amount of money that i have in my wallet</Card.Text>
              <Card.Link href="#">Edit Wallet</Card.Link>
              <Card.Link href="#">Delete Wallet</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CardWallet;
