import React, { useCallback, useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import Header from "../components/Hero/Hero";
import LegendStockListRow from "../components/LegendStockRow/LegendStockRow";
import StockTable from "../components/StockTable/StockTable";
import TablePagination from "../components/TablePagination/TablePagination";
import Timeframeselector from "../components/TimeframeSelector/TimeframeSelector";
import { sortTable } from "../helpers";

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
    if (entries.length <= 29) return entries;
    return entries.slice(entries.length - 30);
  };

  //TODO: Remove
  const groupStockValuesByStock = (stockValues: Stockvalue[]) => {
    let groups: StockvalueGroup[] = [];
    for (let i = 0; i < stockValues.length; i++) {
      const value = stockValues[i];
      const groupSymbols = groups.map((group: Stockvalue) => group.symbol);
      const indexOfValue = groupSymbols.indexOf(value.symbol);
      if (indexOfValue === -1) {
        groups.push({ ...value, numberOfValues: 1, cummulativePrice: value.price });
      } else {
        const cummulativePrice = parseFloat(groups[indexOfValue].price.split("$")[1]);
        const newPrice = parseFloat(value.price.split("$")[1]);
        groups[indexOfValue] = {
          ...groups[indexOfValue],
          mentions: groups[indexOfValue].mentions + value.mentions,
          sentiment: groups[indexOfValue].sentiment + value.sentiment,
          lastPrice: value.price,
          cummulativePrice: `$${cummulativePrice + newPrice}`,
          numberOfValues: groups[indexOfValue].numberOfValues + 1,
        };
      }
    }
    return groups;
  };

  // TODO: Remove
  const summarizeStockValueGroup = (stockValueGroup: StockvalueGroup) => {
    const averageSentiment =
      Math.round(
        (100 * stockValueGroup.sentiment) / stockValueGroup.numberOfValues
      ) / 100;
    const firstPrice = parseFloat(stockValueGroup.price.split("$")[1]);
    const lastPrice = stockValueGroup.lastPrice
      ? parseFloat(stockValueGroup.lastPrice?.split("$")[1])
      : firstPrice;
    const priceChange = stockValueGroup.lastPrice
      ? `${(lastPrice - firstPrice).toFixed(2)}$`
      : stockValueGroup.priceChange;
    const pricePercentChange = stockValueGroup.lastPrice
      ? (((lastPrice - firstPrice) / firstPrice) * 100).toFixed(2) + "%"
      : parseFloat(stockValueGroup.pricePercentChange.split("%")[0]).toFixed(
          2
        ) + "%";
    return {
      ...stockValueGroup,
      sentiment: averageSentiment,
      firstPrice: firstPrice,
      price: lastPrice + "$",
      lastPrice: lastPrice,
      priceChange,
      pricePercentChange,
    };
  };

  useEffect(() => {
    const matchingEntries = getEntriesInTimeframe();
    const stockValues = matchingEntries
      .map((entry: Entry) => entry.values)
      .flat();
    const stockValueGroups = groupStockValuesByStock(stockValues);
    const mappedGroups = stockValueGroups.map((group: StockvalueGroup) => {
      return summarizeStockValueGroup(group);
    });
    setShownValues(mappedGroups);
  }, [timeframe]);

  const sortValues = useCallback(
    () => sortTable(shownValues, sortBy, sortDescending),
    [shownValues, sortBy, sortDescending, pageIndexes]
  );

  const getSearchableStocks = useCallback(() => {
    const valueSymbols = shownValues.map((value) => value.symbol);
    return stocks.filter((stock) => valueSymbols.includes(stock._id));
  }, [shownValues, stocks]);

  return (
    <div>
      <Header setSelectedStock={setSelectedStock} stocks={getSearchableStocks()}/>
      <Container className="mt-5 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <span>{pageIndexes[0]}-{pageIndexes[1]} / {shownValues.length} Stocks</span>
          <Timeframeselector
            timeframe={timeframe}
            setTimeframe={setTimeframe}
          />
        </div>
        <div className="d-flex justify-content-end"><TablePagination pageIndexes={pageIndexes} setPageIndexes={setPageIndexes} count={shownValues.length}/></div>
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


