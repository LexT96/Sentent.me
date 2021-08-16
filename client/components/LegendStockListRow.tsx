import React from "react";
import { Button, Col, Row } from "react-bootstrap";

const StockListRow = ({ sortBy, setSortBy }: any) => {
  return (
    <Row className="glass-card p-2 pt-3">
      <Col className="">
        <h4>Symbol</h4>
      </Col>
      <Col>
      <Button onClick={() => {}}>
        <div className="d-flex align-items-center">
          <h4>Mentions</h4>
          {sortBy === "mentions" && (
            <img className="ms-2" width={15} height={12} src={"/assets/arrow-down.png"} alt="" />
          )}
        </div>
        </Button>
      </Col>
      <Col>
        <h4>Price</h4>
      </Col>
      <Col>
        <h4>Pricechange</h4>
      </Col>
      <Col>
        <h4>(in %)</h4>
      </Col>
      <Col>Sentimentscore</Col>
    </Row>
  );
};

export default StockListRow;
