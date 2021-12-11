import React, { Dispatch, SetStateAction, useEffect } from "react";
import {Col, Container, Row } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import Searchbar from "../Searchbar";
import {tsParticles} from "tsparticles";
import styles from "./Hero.module.scss";
import particleConfig from "../../public/assets/particleJs/settings";

const Header = ({
  stocks,
  setSelectedStock,
}: {
  stocks: Stock[];
  setSelectedStock: Dispatch<SetStateAction<string>>;
}) => {

  useEffect(() => {
    const initializeParticleJs = () => {
      tsParticles.load("tsparticles", particleConfig);
    };
    initializeParticleJs();
  }, [])

  return (
    <div style={{maxHeight: "100vh"}}>
      <Navbar />
      <div id={styles.tsparticlesContainer}>
        <div id={styles.tsparticles}/>
        <div className="d-flex justify-content-center align-items-center h-100">
        <Container
          className="pt-5 pt-lg-0 " style={{zIndex: 2}}
        >
          <Row>
            <Col xs={12} lg={6}>
              <div className="d-flex flex-column justify-content-center">
                <h1 style={{ fontSize: "3.5rem" }}>
                  Analyzing Reddit <br/><span className="primary-text">stock sentiment</span>
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
          </Row> 
        </Container>
        </div>
      </div>

    </div>
  );
};

export default Header;