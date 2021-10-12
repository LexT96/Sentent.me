import React, { Dispatch, SetStateAction } from "react";
import StockListRow from "./StockListRow";
import Stock from "./Stock";

const StockList = ({
  stockValues,
  selectedStock,
  setSelectedStock,
  entries,
}: {
  stockValues: Stockvalue[];
  selectedStock: string | null;
  setSelectedStock: Dispatch<SetStateAction<string | null>>;
  entries: Entry[];
}) => {
  return (
    <div>
      {stockValues.map((values: Stockvalue) => (
        <>
          <StockListRow
            key={values.symbol}
            values={values}
            selectedStock={selectedStock}
            setSelectedStock={setSelectedStock}
          />
          {selectedStock === values.symbol && (
            <Stock
              mappedEntries={entries
                .filter((entry: Entry) => {
                  const mappedEntries = entry.values.map(
                    (value: any) => value.symbol
                  );
                  return mappedEntries.includes(selectedStock);
                })
                .map((entry: Entry) => {
                  return {
                    _id: entry._id,
                    value: entry.values.filter(
                      (value: any) => value.symbol === selectedStock
                    )[0],
                  };
                })}
            />
          )}
        </>
      ))}
    </div>
  );
};

export default StockList;
