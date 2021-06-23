import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const CoinsShower = ({ coins }) => {
  return (
    <>
      <Container fluid>
        <Row>
          {coins.map((coin) => (
            <Col key={coin.symbol} lg={3} md={4} sm={6} xs={12}>
              <Card bg="light" text="dark" className="mt-1">
                <Card.Body>
                  <Card.Title>{coin.name}</Card.Title>
                  <Card.Text>{coin.symbol}</Card.Text>
                  <Card.Text>Price: ${parseFloat(coin.price).toFixed(3)}</Card.Text>
                  <Card.Text>
                    Last 24h:{" "}
                    {parseFloat(coin.delta_24h) >= 0 ? (
                      <span
                        style={{ color: "Green" }}
                      >
                        {coin.delta_24h}%
                      </span>
                    ) : (
                      <span style={{ color: "red" }}>{coin.delta_24h}%</span>
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default CoinsShower;
