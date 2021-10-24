import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Navbar as BSNavbar,
} from "react-bootstrap";
import Searchbar from "./Searchbar";

const Navbar = () => {
  const [isTransparent, setIsTransparent] = useState(true);
  const handleScroll = (e: Event) => {
    if (window.pageYOffset > window.innerHeight * 0.6) {
      setIsTransparent(false);
      return;
    }
    if (window.pageYOffset < window.innerHeight * 0.6) {
      setIsTransparent(true);
    }
  };

  const onBrandingClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }  
  
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
          <BSNavbar.Brand onClick={onBrandingClick} style={{cursor: "pointer"}}>
            <strong style={{ color: "white" }}>Sentent.me</strong>
          </BSNavbar.Brand>
              <a href="https://github.com/LexT96/pyStonks">
                <img
                  height={32}
                  width={32}
                  src="/assets/github.png"
                  className="icon"
                  alt="Github"
                />
              </a>
        </Container>
      </BSNavbar>
    </>
  );
};

export default Navbar;
