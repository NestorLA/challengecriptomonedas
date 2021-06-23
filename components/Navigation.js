import Navbar from "react-bootstrap/Navbar";
import { Button, Nav } from "react-bootstrap";
import Link from "next/link";

const Navigation = () => {
  return (
    <Navbar bg="dark" expand="md">
      <Navbar.Brand>
        <Link href="/" >CriptoApp</Link>
      </Navbar.Brand>
      <Button variant="primary" className="ml-auto mr-2">
        Add Wallet
      </Button>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className="font-weight-bold">
            <Link href="/">Home</Link>
          </Nav.Link>
          <Nav.Link className="font-weight-bold">
            <Link href="/wallets">My Wallets</Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
