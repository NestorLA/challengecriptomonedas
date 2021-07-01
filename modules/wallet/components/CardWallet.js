import Link from "next/link";

import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
} from "react-bootstrap";

const CardWallet = ({
  wallets,
  onDeleteWallet,
  walletEditing,
  setWalletEditing,
  submitEdits,
}) => {
  return (
    <Container>
      <Row>
        {Object.values(wallets).map((wallet) => (
          <Col lg={3} md={4} sm={6} xs={12} key={wallet.id}>
            <Card className="mt-2 mr-1">
              <Card.Body>
                {wallet.id !== walletEditing ? (
                  <>
                    <Card.Title>
                      <Link href={"/wallets/" + wallet.id}>{wallet.name}</Link>
                    </Card.Title>
                    <Card.Text>Criptos en esta cartera</Card.Text>
                  </>
                ) : (
                  <Form onSubmit={(e) => submitEdits(e, wallet.id)}>
                    <Form.Control name="wallet" defaultValue={wallet.name} />
                    <Button type="Submit">Submit</Button>
                  </Form>
                )}

                <div className="d-flex justify-content-between">
                  <Button
                    variant="primary"
                    onClick={() => setWalletEditing(wallet.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => onDeleteWallet(wallet.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CardWallet;
