import React, { Dispatch, SetStateAction } from "react";
import StockRow from "../StockRow/StockRow";
import Stock from "../Stock";

const StockTable = ({
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
        {stockValues.map((values: Stockvalue, index: number) => (
          <>
            <StockRow
              key={index}
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

export default StockTable;
