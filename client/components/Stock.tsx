import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Plot from "./Plot";
import Timeframeselector from "./TimeframeSelector";
import { DiscreteColorLegend } from "react-vis";

const Stock = ({ mappedEntries }: {mappedEntries: any}) => {
  const [timeframe, setTimeframe] = useState("W");
  return (
    <Row>
      <div className="stock glass p-3 mb-3">
        <h2 className="text-center mb-3">
          {mappedEntries[0].value.symbol} ({mappedEntries[0].value.name})
        </h2>
        <Row>
          <Col md={10} className="d-flex align-items-center">
            <Plot
              mappedEntries={mappedEntries}
              symbol={mappedEntries[0].value.symbol}
            />
          </Col>
          <Col md={2} className="d-flex flex-column align-items-center mt-1">
            {/* <Timeframeselector
            timeframe={timeframe}
            setTimeframe={setTimeframe}
          /> */}
            <DiscreteColorLegend
              className="mt-3"
              items={[
                { title: "Sentimentscore", color: "#00F" },
                { title: "Change in price (%)", color: "#F00" },
              ]}
            />
          </Col>
        </Row>
      </div>
    </Row>
  );
};

export default Stock;
