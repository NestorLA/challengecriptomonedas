import CardWallet from "../../modules/wallet/components/CardWallet";

import { useState, useEffect } from "react";

import { Button, Container, Row, Col, Form, FormGroup } from "react-bootstrap";

import { useAppContext } from "../../context/AppContext";
import { nanoid } from "nanoid";

const Wallet = () => {
  const { wallets, setWallets } = useAppContext();
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
      id: nanoid(6),
      name: e.target.wallet.value,
    };
    setWallets({
      ...wallets,
      [newWallet.id]: { ...newWallet, transactions: {} },
    });
    e.target.wallet.value = "";
  };

  const onDeleteWallet = (id) => {
    const clone = { ...wallets };
    delete clone[id];
    setWallets({ ...clone });
  };

  const submitEdits = (event, idToEdit) => {
    event.preventDefault();
    const updatedWallets = Object.values(wallets).map((wallet) => {
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
      <Container>
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
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
              onDeleteWallet={onDeleteWallet}
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
