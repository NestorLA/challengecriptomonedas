import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Card, Col, Row, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import { DateTime } from "luxon";

const WalletDetails = () => {
  const { coins } = useAppContext();
  const router = useRouter();

  const [formData, setFormData] = useState("");
  const [coinPrice, setCoinPrice] = useState("");
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);

  //formik initial values
  const [initialValues, setInitialValues] = useState({
    transactionType: "",
    coin: "",
    qty: "",
    price: "",
    id: "",
  });

  const handleSubmit = (value) => {
    console.log(value);
    // ponerle fecha
    setFormData({ ...formData, value });
  };

  const getPrice = (value) => {
    const FilteredCoin = coins.filter((coin) => coin.name === value);
    setCoinPrice(FilteredCoin[0].current_price);
  };

  // router para home si coins esta vacio
  useEffect(() => {
    if (coins.length === 0) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    setTotal(quantity * coinPrice);
  }, [coinPrice, quantity]);

  return (
    <>
      <h1 className="m-1 text-center h4">Transacciones</h1>
      <Card>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={6} className="text-center">
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
                          <option disabled>-- Elige una opción --</option>
                          <option value="compra">Compra</option>
                          <option value="venta">Venta</option>
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
                            <Form.Control
                              type="text"
                              value={coinPrice}
                              readOnly
                            ></Form.Control>{" "}
                          </>
                        ) : null}
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
                        <Form.Control
                          name="price"
                          id="price"
                          value={total}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                        ></Form.Control>
                      </Form.Group>

                      <Button type="submit">Submit</Button>
                    </Form>
                  </>
                );
              }}
            </Formik>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default WalletDetails;
