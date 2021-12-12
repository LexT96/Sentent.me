import React, { Dispatch, SetStateAction } from "react";

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

  // show detailed informations on selected stock or hide it again
  const onRowClick = () => {
    if (values.symbol === selectedStock) {
      setSelectedStock("");
      return;
    }
    setSelectedStock(values.symbol);
  };

  return (
    <tr id={values.symbol} className="cursor-pointer" onClick={onRowClick}>
      <td>
        <h5>${values.symbol}</h5>
      </td>
      <td>
        <h5>{values.mentions}</h5>
      </td>
      <td>
        <h5>{values.price}</h5>
      </td>
      <td>
        <h5 style={{ color: priceChange < 0.0 ? "#F00" : "#FFF" }}>
          {priceChange}$
        </h5>
      </td>
      <td>
        <h5 style={{ color: priceChange < 0 ? "#F00" : "#FFF" }}>
          {values.pricePercentChange}
        </h5>
      </td>
      <td>
        <h5
          className="pe-2"
          style={{
            color:
              sentiment >= 50 ? "#0E0" : sentiment <= -50 ? "#F00" : "#FFF",
          }}
        >
          {sentiment}
        </h5>
      </td>
    </tr>
  );
};

export default StockListRow;
