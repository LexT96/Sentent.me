import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { DiscreteColorLegend } from "react-vis";
import Plot from "./Plot";

const Stock = ({ mappedEntries }: { mappedEntries: any }) => {
  const [scale, setScale] = useState(0);
  useEffect(() => {
    setTimeout(() => setScale(1), 100);
  }, [])
  return (
    <Row style={{ transform: `scaleY(${scale})` }} className="stock p-md-2 mb-3 align-items-center justify-content-center">
      <h2 className="text-center py-3">
        {mappedEntries[0].value.symbol} ({mappedEntries[0].value.name})
      </h2>
      <Row className="flex-column-reverse flex-md-row">
        <Col md={10} className="d-flex align-items-center h-100">
          <Plot
            mappedEntries={mappedEntries}
            symbol={mappedEntries[0].value.symbol}
          />
        </Col>
        <Col md={2} className="d-flex flex-column align-items-center pb-3">
          <DiscreteColorLegend
            className="mt-3"
            items={[
              { title: "Sentimentscore", color: "#00F" },
              { title: "Change in price (%)", color: "#F00" },
            ]}
          />
        </Col>
      </Row>
    </Row>
  );
};

export default Stock;
