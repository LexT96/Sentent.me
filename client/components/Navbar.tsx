import React from "react"
import { Button, Container, Form, FormControl, Navbar as BSNavbar } from "react-bootstrap"

const Navbar = () => {
    return (
      <>
        <BSNavbar style={{backgroundColor: "rgba(0,0,0,0)"}} id="navbar" >
          <Container>
            <BSNavbar.Brand href="#home"><strong style={{color: "white"}}>Sentent.me</strong></BSNavbar.Brand>
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