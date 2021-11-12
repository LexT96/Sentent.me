import React, { Dispatch, SetStateAction } from "react";
import StockListRow from "./StockListRow";
import Stock from "./Stock";
import { Table } from "react-bootstrap";
import LegendStockListRow from "./LegendStockListRow";

const StockList = ({
  stockValues,
  selectedStock,
  setSelectedStock,
  entries,
  stocks,
}: {
  stockValues: Stockvalue[];
  selectedStock: string | null;
  setSelectedStock: Dispatch<SetStateAction<string>>;
  entries: Entry[];
  stocks: Stock[];
}) => {
  return (
    <>
        {stockValues.map((values: Stockvalue) => (
          <>
            <StockListRow
              key={values.symbol}
              values={values}
              selectedStock={selectedStock}
              setSelectedStock={setSelectedStock}
            />
            {selectedStock === values.symbol && (
              <tr>
                <td colSpan={6} className="px-3">
                <Stock
                  stock={stocks.find((s: Stock) => s._id === selectedStock) ?? stocks[0]}
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
                </td>
              </tr>
            )}
          </>
        ))}
        </>
  );
};

export default StockList;
