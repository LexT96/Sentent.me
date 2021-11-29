import React, { Dispatch, SetStateAction } from "react";
import {Col, Container, Row } from "react-bootstrap";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";

const Header = ({
  stocks,
  setSelectedStock,
}: {
  stocks: Stock[];
  setSelectedStock: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div>
      <Navbar />
      <div
        id="top"
        className="d-flex flex-column h-100 w-100 position-relative justify-content-center"
      >
        <Container
          className="pt-5 pt-lg-0" style={{zIndex: 2}}
        >
          <Row className="h-100">
            <Col xs={12} lg={6}>
              <div className="d-flex flex-column justify-content-center">
                <h1 style={{ fontSize: "3.5rem" }}>
                  Analyzing reddit stock sentiment
                </h1>
                <div className="d-flex flex-column pt-4 justify-content-between">
                  <h3 className="">
                    Enter a stock or scroll down to get started
                  </h3>
                  <Searchbar
                    stocks={stocks}
                    setSelectedStock={setSelectedStock}
                  />  
                </div>
              </div>
            </Col>
            <Col xs={12} lg={6}>
              <div id="illustration" className="mt-lg-0 mt-5 d-none d-lg-block"/>
            </Col>
          </Row>
        </Container>
        <div
          className="d-flex align-items-end position-absolute bottom-0"
          style={{ marginBottom: "-2px", zIndex: 1 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 300"
            max-width="100%"
            width="auto"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,192L48,181.3C96,171,192,149,288,165.3C384,181,480,235,576,240C672,245,768,203,864,186.7C960,171,1056,181,1152,186.7C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Header;