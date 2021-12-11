import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import StockRow from "../StockRow/StockRow";
import Stock from "../Stock/Stock";

const StockTableBody = ({
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

    console.log(stockValues)

  const [displayedStockValues, setDisplayedStockValues] = useState(stockValues);
  const [displayedStockRange, setDisplayedStockRange] = useState([0, 100]);


  useEffect(() => {
    const paginateDisplayedStockValues = () => {
        const start = displayedStockRange[0];
        const end = displayedStockRange[1];
        const newDisplayedStockValues = stockValues;
        setDisplayedStockValues(newDisplayedStockValues);
      };

    paginateDisplayedStockValues();
  }, [stockValues, displayedStockRange]);

  //TODO: Remove
  // Should just get all values for all stocks
  const findAllForStockInEntries = (entries: Entry[]) => {
    return entries.reduce((acc: Stockvalue[], entry: Entry) => {
      const stockValue = entry.values.find(
        (stockValue: Stockvalue) => stockValue.symbol === selectedStock
      );
      if (stockValue) {
        acc.push({...stockValue, date: entry._id});
      }
      return acc;
    }, []);
  }

  return (
<tbody>
        {displayedStockValues.map((values: Stockvalue, index: number) => (
          <>
            <StockRow
              key={index}
              values={values}
              selectedStock={selectedStock}
              setSelectedStock={setSelectedStock}
            />
            {selectedStock === values.symbol && (
              <tr className="stock-body">
                <td colSpan={6} className="px-3">
                <Stock
                  stock={stocks.find((s: Stock) => s._id === selectedStock) ?? stocks[0]}
                  mappedEntries={findAllForStockInEntries(entries)}
                />
                </td>
              </tr>
            )}
          </>
        ))}
        </tbody>
  );
};

export default StockTableBody;
