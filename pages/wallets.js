import Navigation from "../components/Navigation";
import CardWallet from "../modules/wallet/components/CardWallet";

import { useState, useEffect } from "react";

import { Button, Container, Row, Col, Form, FormGroup } from "react-bootstrap";

const Wallet = () => {
  const [wallets, setWallets] = useState([]);
  const [walletEditing, setWalletEditing] = useState("");

  useEffect(() => {
    const json = localStorage.getItem("wallets");
    const savedWallets = JSON.parse(json);
    if (savedWallets) {
      setWallets(savedWallets);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(wallets);
    localStorage.setItem("wallets", json);
  }, [wallets]);

  const addWallet = (e) => {
    e.preventDefault();
    const newWallet = {
      id: Math.random().toString(36).substr(2, 9),
      name: e.target.wallet.value,
    };
    setWallets([...wallets, newWallet]);
    e.target.wallet.value = "";
  };

  const deleteWallet = (idToDelete) => {
    const filteredWallets = wallets.filter(
      (wallet) => wallet.id !== idToDelete
    );
    setWallets(filteredWallets);
  };

  const submitEdits = (event, idToEdit) => {
    event.preventDefault();
    const updatedWallets = wallets.map((wallet) => {
      if (wallet.id === idToEdit) {
        return {
          id: wallet.id,
          name: event.target.wallet.value,
        };
      } else {
        return wallet;
      }
    });
    setWallets(updatedWallets);
    setWalletEditing("");
  };

  return (
    <>
      <Navigation />
      <Container>
        <Row>
          <Col>
            <Form onSubmit={addWallet} className="mt-1">
              <FormGroup>
                <Form.Control
                  type="text"
                  name="wallet"
                  placeholder="Wallet Name"
                />
                <Button type="Submit" className="mt-1">
                  Submit
                </Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col className="mt-2">
            <CardWallet
              wallets={wallets}
              deleteWallet={deleteWallet}
              walletEditing={walletEditing}
              setWalletEditing={setWalletEditing}
              submitEdits={submitEdits}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Wallet;
