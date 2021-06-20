import Navigation from "../components/Navigation";

import { Button, Container, Row, Col } from "react-bootstrap";

const Wallet = () => {
  return (
    <>
      <Navigation />
      <Container>
        <Row>
          <Col className="mt-2">
            <Button> Añadir Cripto</Button>
            <Button className="ml-3">Eliminar Cripto</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Wallet;
