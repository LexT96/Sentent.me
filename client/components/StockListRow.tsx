import React from "react";
import { Col, Row } from "react-bootstrap";

const StockListRow = ({values}: {values: Stockvalue}) => {
    const sentiment = Math.round(values.sentiment * 1000);
    const priceChange = parseFloat(values.priceChange);
     return (
      <Row className="glass-card p-2 pt-3">
        <Col className="">
          <h4>${values.symbol}</h4>
        </Col>
        <Col>
          <h4>{values.mentions}</h4>
        </Col>
        <Col>
          <h4>{values.price}</h4>
        </Col>
        <Col>
          <h4 style={{color: priceChange < 0.0 ? "#F00" : "#000"}}>{priceChange}$</h4>
        </Col>
        <Col>
          <h4 style={{color: priceChange < 0 ? "#F00" : "#000"}}>{values.pricePercentChange}</h4>
        </Col>
        <Col>
          <h4 style={{color: sentiment >= 500 ? "#0E0" : sentiment <= -500 ? "#F00" : "#000"}}>{sentiment}</h4>
        </Col>
      </Row>
    );
}

export default StockListRow;