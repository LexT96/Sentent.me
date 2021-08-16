import React from "react"
import { Button, Container, Form, FormControl, Navbar as BSNavbar } from "react-bootstrap"

const Navbar = () => {
    return (
      <>
        <BSNavbar id="navbar" bg="light">
          <Container>
            <BSNavbar.Brand href="#home">PyStonks</BSNavbar.Brand>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            <a href="https://github.com/LexT96/pyStonks">
              <img
                height={32}
                width={32}
                src="/assets/github.png"
                alt="Github"
              />
            </a>
          </Container>
        </BSNavbar>
      </>
    );
}

export default Navbar;