import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

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
import { nanoid } from "nanoid";

const WalletDetails = () => {
  const { coins } = useAppContext();
  const router = useRouter();

  const [transactions, setTransactions] = useState([]);
  const [coinPrice, setCoinPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [actualCoin, setActualCoin] = useState({});

  //formik initial values
  const [initialValues, setInitialValues] = useState({
    transactionType: "Compra",
    coin: "",
    qty: "",
    price: "",
    total: "",
  });

  const handleSubmit = (value) => {
    // agrega fecha e id
    const transaction = {
      ...value,
      date: DateTime.now().toLocaleString(),
      id: nanoid(6),
    };
    setTransactions([...transactions, transaction]);
  };

  const getPrice = (value) => {
    const FilteredCoin = coins.find((coin) => coin.name === value);
    setCoinPrice(FilteredCoin.current_price.toFixed(2));
    setActualCoin(FilteredCoin);
    return FilteredCoin.current_price.toFixed(2);
  };

  const onDeleteTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  // router para home si coins esta vacio
  useEffect(() => {
    if (coins.length === 0) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <h1 className="m-1 text-center h4">Transacciones</h1>
      <Row className="justify-content-center p-1">
        {" "}
        <Col xs={12} sm={10} md={6} className="text-center m-1">
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
                          onChange={(e) => {
                            props.handleChange(e);
                            props.setFieldValue(
                              "price",
                              getPrice(e.target.value)
                            );
                          }}
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
                                value={props.values.price}
                                onChange={props.handleChange}
                                className="none-pointer"
                                name="price"
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
                              <Form.Control type="text" name="price" />{" "}
                            </InputGroup>
                          </>
                        )}
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control
                          name="qty"
                          id="qty"
                          onChange={(e) => {
                            props.handleChange(e);
                            props.setFieldValue(
                              "total",
                              (props.values.price * e.target.value).toFixed(2)
                            );
                          }}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Total</Form.Label>
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text>USD$</InputGroup.Text>
                          </InputGroup.Prepend>{" "}
                          <Form.Control
                            name="total"
                            id="total"
                            value={props.values.total}
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
        <Col xs={12} sm={10} md={6} className="m-1">
          <Card bg="primary" text="white">
            <Card.Title className="text-center m-1">My transactions</Card.Title>
            <Card.Body>
              {transactions.length > 0 ? (
                <Table
                  bordered
                  size="sm"
                  variant="dark"
                  className="text-center"
                >
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Coin</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Edit</th>
                      <th>Delete</th>
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
                        <td className="text-center">
                          <Image
                            src="/edit.svg"
                            alt="Edit icon"
                            width={16}
                            height={20}
                            className="pointer ml-1"
                          />
                        </td>
                        <td className="text-center">
                          <Image
                            src="/delete.svg"
                            alt="Edit icon"
                            width={16}
                            height={20}
                            className="pointer"
                            onClick={() => onDeleteTransaction(transaction.id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="text-center">No transactions yet</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default WalletDetails;
