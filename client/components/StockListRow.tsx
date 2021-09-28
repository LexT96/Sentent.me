import React, { SetStateAction, Dispatch } from "react";
import { Col, Row } from "react-bootstrap";
import Link from "next/link";
import {useRouter} from "next/router";

const StockListRow = ({
  values,
  setSelectedStock,
  selectedStock,
}: {
  values: Stockvalue;
  selectedStock: string | null;
  setSelectedStock: Dispatch<SetStateAction<string | null>>;
}) => {
  const sentiment = Math.round(values.sentiment * 100);
  const priceChange = parseFloat(values.priceChange);
  const router = useRouter();
  return (
    <a
      onClick={() => {
        setSelectedStock(values.symbol);
      }}
      className="cursor-pointer position-rela tive"
      style={{zIndex: 1, position: "relative"}}
      rel="noopener noreferrer"
    >
      <Row className={`glass-card p-2 pt-3 ${selectedStock === values.symbol && "selected"}`}>
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
          <h4 style={{ color: priceChange < 0.0 ? "#F00" : "#000" }}>
            {priceChange}$
          </h4>
        </Col>
        <Col>
          <h4 style={{ color: priceChange < 0 ? "#F00" : "#000" }}>
            {values.pricePercentChange}
          </h4>
        </Col>
        <Col>
          <h4
            style={{
              color:
                sentiment >= 50 ? "#0E0" : sentiment <= -50 ? "#F00" : "#000",
            }}
          >
            {sentiment}
          </h4>
        </Col>
      </Row>
    </a>
  );
};

export default StockListRow;