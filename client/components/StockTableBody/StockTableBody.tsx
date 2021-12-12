import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import StockRow from "../StockRow/StockRow";
import Stock from "../Stock/Stock";

const StockTableBody = ({
  stockValues,
  selectedStock,
  setSelectedStock,
  entries,
  stocks,
  sortBy,
  sortDescending,
  pageIndexes
}: {
  stockValues: Stockvalue[];
  selectedStock: string | null;
  setSelectedStock: Dispatch<SetStateAction<string>>;
  entries: Entry[];
  stocks: Stock[];
  sortBy: keyof Stockvalue;
  sortDescending: boolean;
  pageIndexes: number[];
}) => {

  const [displayedStockValues, setDisplayedStockValues] = useState(stockValues);

  useEffect(() => {
    // handles changes in the pagination indexes
    const paginateDisplayedStockValues = () => {
        const newDisplayedStockValues = stockValues.slice(pageIndexes[0], pageIndexes[1]);
        setDisplayedStockValues(() => newDisplayedStockValues);
      };
    paginateDisplayedStockValues();
  }, [pageIndexes, sortDescending, sortBy]);

  // reduces all entries to the stockvalues that match the currently selected stock
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

  const findSelectedStock = () => {
    return stocks.find((s: Stock) => s._id === selectedStock) ?? stocks[0]
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
                  stock={findSelectedStock()}
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
