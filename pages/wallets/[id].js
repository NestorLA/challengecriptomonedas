import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  Card,
  Col,
  Row,
  Form,
  Button,
  InputGroup,
  Table,
} from "react-bootstrap";
import { Formik } from "formik";
import { DateTime } from "luxon";

const WalletDetails = () => {
  const { coins } = useAppContext();
  const router = useRouter();

  const [transactions, setTransactions] = useState([]);
  const [coinPrice, setCoinPrice] = useState("");
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);

  // expected transaction object

  //   {
  //       transactionType: "compra",
  //   coin: "Bitcoin",
  //   qty: 25,
  //   price: 32565,
  //   total: 232323,
  //   date: 28/06/2021,
  //   id: eRtdQfr,
  // }

  //formik initial values
  const [initialValues, setInitialValues] = useState({
    transactionType: "Compra",
    coin: "",
    qty: "",
    price: "",
    total: "",
  });

  const handleSubmit = (value) => {
    console.log(value);
    // ponerle fecha e id
    setTransactions([...transactions, value]);
  };

  const getPrice = (value) => {
    const FilteredCoin = coins.filter((coin) => coin.name === value);
    setCoinPrice(FilteredCoin[0].current_price.toFixed(2));
  };

  // router para home si coins esta vacio
  useEffect(() => {
    if (coins.length === 0) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    setTotal((quantity * coinPrice).toFixed(2));
  }, [coinPrice, quantity]);

  return (
    <>
      <h1 className="m-1 text-center h4">Transacciones</h1>
      <Row className="justify-content-center p-1">
        {" "}
        <Col xs={12} sm={10} md={6} className="text-center">
          <Card className="p-2">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {(props) => {
                console.log(props.values);
                return (
                  <>
                    <Form onSubmit={props.handleSubmit}>
                      <Form.Group>
                        <Form.Label>Tipo de transacción</Form.Label>
                        <Form.Control
                          as="select"
                          name="transactionType"
                          id="transactionType"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                        >
                          <option value="Compra" selected>
                            Compra
                          </option>
                          <option value="Venta">Venta</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Criptomoneda</Form.Label>
                        <Form.Control
                          as="select"
                          name="coin"
                          id="coin"
                          onChange={props.handleChange}
                          onBlur={(e) => getPrice(e.target.value)}
                        >
                          {coins.map((coin) => (
                            <option value={coin.name} key={coin.id}>
                              {coin.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                      <Form.Group>
                        {coinPrice.length != 0 ? (
                          <>
                            <Form.Label>Precio</Form.Label>
                            <InputGroup>
                              <InputGroup.Prepend>
                                <InputGroup.Text>USD$</InputGroup.Text>
                              </InputGroup.Prepend>
                              <Form.Control
                                type="text"
                                value={coinPrice}
                                readOnly
                              />{" "}
                            </InputGroup>
                          </>
                        ) : (
                          <>
                            <Form.Label>Precio</Form.Label>
                            <InputGroup>
                              <InputGroup.Prepend>
                                <InputGroup.Text>USD$</InputGroup.Text>
                              </InputGroup.Prepend>
                              <Form.Control type="text" readOnly />{" "}
                            </InputGroup>
                          </>
                        )}
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control
                          name="qty"
                          id="qty"
                          onChange={props.handleChange}
                          onBlur={(e) => setQuantity(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Total</Form.Label>
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text>USD$</InputGroup.Text>
                          </InputGroup.Prepend>{" "}
                          <Form.Control
                            name="price"
                            id="price"
                            value={total}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          />
                        </InputGroup>
                      </Form.Group>

                      <Button type="submit">Submit</Button>
                    </Form>
                  </>
                );
              }}
            </Formik>
          </Card>{" "}
        </Col>
        <Col xs={12} sm={10} md={6}>
          <Card bg="primary" text="white">
            <Card.Title className="text-center">My transactions</Card.Title>
            <Card.Body>
              {transactions.length > 0 ? (
                <Table bordered size="sm" variant="dark">
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
                    {transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td>{transaction.transactionType}</td>
                        <td>{transaction.coin}</td>
                        <td>{transaction.price}</td>
                        <td>{transaction.qty}</td>
                        <td>{transaction.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : null}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default WalletDetails;
