import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import StockRow from "../StockRow/StockRow";
import Stock from "../Stock/Stock";
import StockTableBody from "../StockTableBody/StockTableBody";
import LegendStockListRow from "../LegendStockRow/LegendStockRow";

const StockTable = ({
  stockValues,
  selectedStock,
  setSelectedStock,
  entries,
  stocks,
  sortBy,
  setSortBy,
  sortDescending,
  setSortDescending,
  sortValues,
}: {
  stockValues: Stockvalue[];
  selectedStock: string | null;
  setSelectedStock: Dispatch<SetStateAction<string>>;
  entries: Entry[];
  stocks: Stock[];
  sortBy: keyof Stockvalue;
  setSortBy: Dispatch<SetStateAction<keyof Stockvalue>>;
  sortDescending: boolean;
  setSortDescending: Dispatch<SetStateAction<boolean>>;
  sortValues: () => void;
}) => {
  const [displayedStockValues, setDisplayedStockValues] = useState(stockValues);
  const [displayedStockRange, setDisplayedStockRange] = useState([0, 100]);

  const paginateDisplayedStockValues = () => {
    const start = displayedStockRange[0];
    const end = displayedStockRange[1];
    const newDisplayedStockValues = stockValues.slice(start, end);
    setDisplayedStockValues(newDisplayedStockValues);
  };

  useEffect(() => {
    paginateDisplayedStockValues();
  }, []);

  return (
    <>
        <LegendStockListRow
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortDescending={sortDescending}
          setSortDescending={setSortDescending}
          sortValues={sortValues}
        />
      <StockTableBody
        stockValues={stockValues}
        selectedStock={selectedStock}
        setSelectedStock={setSelectedStock}
        entries={entries}
        stocks={stocks}
      />
    </>
  );
};

export default StockTable;
