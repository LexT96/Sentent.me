import React from "react"
import { Button, Container, Form, FormControl, Navbar as BSNavbar } from "react-bootstrap"

const Navbar = () => {
    return (
      <>
        <BSNavbar bg="light">
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
          </Container>
        </BSNavbar>
      </>
    );
}

export default Navbar;