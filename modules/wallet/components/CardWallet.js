import Link from "next/link";

import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Table
} from "react-bootstrap";

import Image from "next/image";

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

          <Col lg={4} md={6} sm={6} xs={12} key={wallet.id}>
            <Card className="mt-2 mr-1">
              <Card.Body>
                {wallet.id !== walletEditing ? (
                  <>
                    <Card.Title>
                      <Link href={"/wallets/" + wallet.id}>{wallet.name}</Link>
                    </Card.Title>
                    {/* {console.log(Object.values(wallet.transactions))} */}
                    <Table bordered size="sm" variant="dark" className="text-center">
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Coin</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <>

                          {Object.values(wallet.transactions).map((trans) => (
                            <> <tr>
                              <td>{trans.transactionType}</td>
                              <td>{trans.coin}</td>
                              <td>{trans.price}</td>
                              <td>{trans.qty}</td>
                              <td>{trans.total}</td>  </tr>
                            </>
                          ))}


                        </>


                      </tbody>
                    </Table>

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
