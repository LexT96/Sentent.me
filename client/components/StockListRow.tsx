import React, { SetStateAction, Dispatch } from "react";
import { Col, Row } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";

const StockListRow = ({
  values,
  setSelectedStock,
  selectedStock,
}: {
  values: Stockvalue;
  selectedStock: string | null;
  setSelectedStock: Dispatch<SetStateAction<string>>;
}) => {
  const sentiment = Math.round(values.sentiment * 100);
  const priceChange = parseFloat(values.priceChange);
  return (
    <tr
      className="glass-card"
      id={values.symbol}
      style={{ cursor: "pointer" }}
      onClick={() => {
        if (values.symbol === selectedStock) {
          setSelectedStock("");
          return;
        }
        setSelectedStock(values.symbol);
      }}
    >
      <td>
        <h4>${values.symbol}</h4>
      </td>
      <td>
        <h4>{values.mentions}</h4>
      </td>
      <td>
        <h4>{values.price}</h4>
      </td>
      <td>
        <h4 style={{ color: priceChange < 0.0 ? "#F00" : "#000" }}>
          {priceChange}$
        </h4>
      </td>
      <td>
        <h4 style={{ color: priceChange < 0 ? "#F00" : "#000" }}>
          {values.pricePercentChange}
        </h4>
      </td>
      <td>
        <h4
          style={{
            color:
              sentiment >= 50 ? "#0E0" : sentiment <= -50 ? "#F00" : "#000",
          }}
        >
          {sentiment}
        </h4>
      </td>
    </tr>
  );
};

export default StockListRow;
