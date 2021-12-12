import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import LegendStockListRow from "../LegendStockRow/LegendStockRow";
import StockTableBody from "../StockTableBody/StockTableBody";

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
  pageIndexes
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
  pageIndexes: number[]
}) => {
  return (
    <Table responsive="md" borderless>
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
        sortBy={sortBy}
        sortDescending={sortDescending}
        pageIndexes={pageIndexes}
      />
    </Table>
  );
};

export default StockTable;
