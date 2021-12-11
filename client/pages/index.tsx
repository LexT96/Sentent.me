import React, { useCallback, useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import Header from "../components/Hero/Hero";
import LegendStockListRow from "../components/LegendStockRow/LegendStockRow";
import StockTable from "../components/StockTable/StockTable";
import Timeframeselector from "../components/TimeframeSelector/TimeframeSelector";

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

  //TODO: Remove
  const getSearchableStocks = useCallback(() => {
    const valueSymbols = shownValues.map((value) => value.symbol);
    return stocks.filter((stock) => valueSymbols.includes(stock._id));
  }, [shownValues]);

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

  //TODO: cleanup?
  const sortValues = useCallback(() => {
    return shownValues.sort((value1: Stockvalue, value2: Stockvalue) => {
      if (sortBy === "symbol") {
        if (sortDescending) return value2.symbol.localeCompare(value1.symbol);
        return value1.symbol.localeCompare(value2.symbol);
      }
      if (sortBy === "mentions") {
        if (sortDescending) return value1.mentions < value2.mentions ? 1 : -1;
        return value1.mentions > value2.mentions ? 1 : -1;
      }
      if (sortBy === "price") {
        const firstPrice = parseFloat(value1.price.split("$")[0]);
        const secondPrice = parseFloat(value2.price.split("$")[0]);
        if (sortDescending) return firstPrice < secondPrice ? 1 : -1;
        return firstPrice > secondPrice ? 1 : -1;
      }
      if (sortBy === "priceChange") {
        const firstPriceChange = parseFloat(value1.priceChange);
        const secondPriceChange = parseFloat(value2.priceChange);
        if (sortDescending) return firstPriceChange < secondPriceChange ? 1 : -1;
        return firstPriceChange < secondPriceChange ? -1 : 1;
      }
      if (sortBy === "pricePercentChange") {
        const firstPricePercentChange = parseFloat(value1.pricePercentChange);
        const secondPricePercentChange = parseFloat(value2.pricePercentChange);
        if (sortDescending)
          return firstPricePercentChange < secondPricePercentChange ? 1 : -1;
        return firstPricePercentChange > secondPricePercentChange ? 1 : -1;
      }
      if (sortDescending) return value1.sentiment < value2.sentiment ? 1 : -1;
      return value1.sentiment > value2.sentiment ? 1 : -1;
    });
  }, [sortBy, sortDescending, shownValues]);

  return (
    <div>
      <Header setSelectedStock={setSelectedStock} stocks={getSearchableStocks()}/>
      <Container className="mt-5 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <span>{shownValues.length} Stocks</span>
          <Timeframeselector
            timeframe={timeframe}
            setTimeframe={setTimeframe}
          />
        </div>
        <Table responsive="md" borderless>
            <StockTable
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
        </Table>
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
  //TODO: Remove validation
  return {
    props: { yesterdaysValues, entries, stocks },
    revalidate: 14400
  };
}


