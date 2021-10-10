import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Navbar as BSNavbar,
} from "react-bootstrap";

const Navbar = () => {
  const [isTransparent, setIsTransparent] = useState(true);
  const handleScroll = (e: Event) => {
    if (
      window.pageYOffset > (window.innerHeight * 0.6)
    ) {
      setIsTransparent(false);
      return;
    }
    if (window.pageYOffset < (window.innerHeight * 0.6)) {
      setIsTransparent(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <BSNavbar
        className={`navbar${isTransparent ? "--hidden" : ""}`}
        id="navbar"
      >
        <Container>
          <BSNavbar.Brand href="#home">
            <strong style={{ color: "white" }}>Sentent.me</strong>
          </BSNavbar.Brand>
          {/* <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}
          <a href="https://github.com/LexT96/pyStonks">
            <img height={32} width={32} src="/assets/github.png" alt="Github" />
          </a>
        </Container>
      </BSNavbar>
    </>
  );
};

export default Navbar;
