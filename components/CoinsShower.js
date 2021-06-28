import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Image from "next/image";

const CoinsShower = ({ coins }) => {
  return (
    <>
      <Container fluid>
        <Row>
          {coins.map((coin) => (
            <Col key={coin.id} lg={3} md={4} sm={6} xs={12}>
              <Card bg="light" text="dark" className="mt-1">
                <Card.Body>
                  <Card.Title>{coin.name}</Card.Title>
                  <div className="d-flex">
                    <Card.Text className="mr-auto">
                      {coin.symbol.toUpperCase()}
                    </Card.Text>
                    <Image
                      src={coin.image}
                      alt="Coin logo"
                      width={36}
                      height={6}
                    />
                  </div>
                  <Card.Text>Price: ${coin.current_price.toFixed(2)}</Card.Text>
                  <Card.Text>
                    Last 24h:{" "}
                    {coin.price_change_percentage_24h >= 0 ? (
                      <span style={{ color: "Green" }}>
                        +{coin.price_change_percentage_24h.toFixed(2)}%
                      </span>
                    ) : (
                      <span style={{ color: "red" }}>
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </span>
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
