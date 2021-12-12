import React, { useCallback, useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import Header from "../components/Hero/Hero";
import LegendStockListRow from "../components/LegendStockRow/LegendStockRow";
import StockTable from "../components/StockTable/StockTable";
import TablePagination from "../components/TablePagination/TablePagination";
import Timeframeselector from "../components/TimeframeSelector/TimeframeSelector";
import * as helpers from "../helpers";

export default function Home({
  yesterdaysValues,
  entries,
  stocks
}: {
  yesterdaysValues: Stockvalue[];
  entries: Entry[];
  stocks: Stock[];
}) {
  const [sortBy, setSortBy] = useState<keyof Stockvalue>("mentions");
  const [sortDescending, setSortDescending] = useState(true);
  const [selectedStock, setSelectedStock] = useState<string>("");
  const [shownValues, setShownValues] = useState(yesterdaysValues);
  const [timeframe, setTimeframe] = useState("D");
  const [pageIndexes, setPageIndexes] = useState([0,100]);

  // slice the entries to match the selected timeframe
  const getEntriesInTimeframe = () => {
    if (timeframe === "D") return entries.slice(entries.length-1);
    if (timeframe === "W") {
      if (entries.length <= 7) return entries;
      return entries.slice(entries.length - 7);
    }
    return entries.slice(entries.length - 30);
  };

  useEffect(() => {
    // maps the entries in the current timeframe in the format needed to display them in the table
    const createListRows = () => {
      const matchingEntries = getEntriesInTimeframe();
      const stockValues = matchingEntries
      .map((entry: Entry) => entry.values)
      .flat();
      const stockValueGroups = helpers.groupStockValuesByStock(stockValues);
      const mappedGroups = stockValueGroups.map((group: StockvalueGroup) => {
        return helpers.summarizeStockValueGroup(group);
      });
      return mappedGroups;
    }
    setShownValues(createListRows());
  }, [timeframe]);

  // handles sorting of the table
  const sortValues = useCallback(
    () => helpers.sortTable(shownValues, sortBy, sortDescending),
    [shownValues, sortBy, sortDescending, pageIndexes]
  );

  // get all stocks that are in the current timeframe so they can be used for the typeahead field
  const getSearchableStocks = useCallback(() => {
    const valueSymbols = shownValues.map((value) => value.symbol);
    return stocks.filter((stock) => valueSymbols.includes(stock._id));
  }, [shownValues, stocks]);

  return (
    <div>
      <Header setSelectedStock={setSelectedStock} stocks={getSearchableStocks()}/>
      <Container className="mt-5 mb-5">
        <div className="d-flex justify-content-end mb-4">
          <Timeframeselector
            timeframe={timeframe}
            setTimeframe={setTimeframe}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center">
        <span>{pageIndexes[0] > 0 ? pageIndexes[0] : 1}-{pageIndexes[1]} / {shownValues.length} Stocks</span>
          <TablePagination pageIndexes={pageIndexes} setPageIndexes={setPageIndexes} count={shownValues.length}/>
          </div>
            <StockTable
              pageIndexes={pageIndexes}
              stockValues={sortValues()}
              selectedStock={selectedStock}
              setSelectedStock={setSelectedStock}
              entries={entries}
              stocks={stocks}
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortDescending={sortDescending}
              setSortDescending={setSortDescending}
              sortValues={sortValues}
            />
        <div className="d-flex justify-content-end"><TablePagination pageIndexes={pageIndexes} setPageIndexes={setPageIndexes} count={shownValues.length}/></div>
      </Container>
    </div>
  );
}

export async function getStaticProps() {
  const BASE_URL = "http://35.158.68.212";
  const entries = await fetch(`${BASE_URL}/entries`).then((res) =>
    res.json()
  );
  const stocks = await fetch(`${BASE_URL}/stocks`).then((res) =>
  res.json()
);
  const yesterdaysEntry = entries[entries.length - 1];
  const yesterdaysValues = yesterdaysEntry.values;
  return {
    props: { yesterdaysValues, entries, stocks },
  };
}


