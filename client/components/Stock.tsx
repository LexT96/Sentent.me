import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Plot from "./Plot";
import Timeframeselector from "./TimeframeSelector";
import { DiscreteColorLegend } from "react-vis";

const Stock = ({ stock }: { stock: Stock }) => {
  const [timeframe, setTimeframe] = useState("W");
  return (
    <Container className="glass p-3 mb-3">
      <h2 className="text-center mb-3">
        {stock._id} ({stock.name})
      </h2>
      <Row >
        <Col md={10} className="d-flex align-items-center">
        <Plot />
        </Col>
        <Col md={2} className="d-flex flex-column align-items-center mt-1">
          <Timeframeselector
            timeframe={timeframe}
            setTimeframe={setTimeframe}
          />
          <DiscreteColorLegend
            className="mt-3"
            items={[
              { title: "Change in sentiment (%)", color: "#00F" },
              { title: "Change in price (%)", color: "#F00" },
            ]}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Stock;
