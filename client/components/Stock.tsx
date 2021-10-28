import React, { useEffect, useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { DiscreteColorLegend } from "react-vis";
import Plot from "./Plot";
import StockInformation from "./StockInformation";

const Stock = ({
  mappedEntries,
  stock,
}: {
  mappedEntries: any;
  stock: Stock;
}) => {
  const [scale, setScale] = useState(0);
  useEffect(() => {
    setTimeout(() => setScale(1), 100);
  }, []);
  return (
    <div
      style={{ transform: `scaleY(${scale})` }}
      className="stock py-2 px-4 mb-3 justify-content-center"
    >
          <h2 className="text-center py-3">
            {mappedEntries[0].value.symbol} ({stock.companyName})
          </h2>
      <Row className="flex-column-reverse pt-5 flex-md-row align-items-md-center">
        <Col md={9} lg={10} className="d-flex  align-items-center">
          <Plot
            mappedEntries={mappedEntries}
            symbol={mappedEntries[0].value.symbol}
          />
        </Col>
        <Col md={3} lg={2} className="d-flex justify-content-center mb-5 align-items-center">
          <DiscreteColorLegend
            items={[
              { title: "Sentimentscore", color: "#64dfdf" },
              { title: "Change in price (%)", color: "#6930c3" },
            ]}
          />
        </Col>
      </Row>
      <StockInformation stock={stock}/>
    </div>
  );
};

export default Stock;
