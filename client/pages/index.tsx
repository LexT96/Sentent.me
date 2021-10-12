import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import LegendStockListRow from "../components/LegendStockListRow";
import Navbar from "../components/Navbar";
import Stock from "../components/Stock";
import StockList from "../components/StockList";
import StockListRow from "../components/StockListRow";
import Timeframeselector from "../components/TimeframeSelector";

export default function Home({
  yesterdaysValues,
  entries,
}: {
  yesterdaysValues: Stockvalue[];
  entries: Entry[];
}) {
  const [sortBy, setSortBy] = useState<keyof Stockvalue>("mentions");
  const [sortDescending, setSortDescending] = useState(true);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [shownValues, setShownValues] = useState(yesterdaysValues);
  const [timeframe, setTimeframe] = useState("D");

  const getEntriesInTimeframe = () => {
    if (timeframe === "D") return entries.slice(entries.length-1);
    if (timeframe === "W") {
      if (entries.length <= 7) return entries;
      return entries.slice(entries.length - 7);
    }
    if (entries.length <= 29) return entries;
    return entries.slice(entries.length - 30);
  };

  useEffect(() => {
    const matchingEntries = getEntriesInTimeframe();
    const entryValues = matchingEntries
      .map((entry: Entry) => entry.values)
      .flat();
    let groups: StockvalueGroup[] = [];
    for (let i = 0; i < entryValues.length; i++) {
      const value = entryValues[i];
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
    const mappedGroups = groups.map((group: StockvalueGroup) => {
      const sentiment =
        Math.round((100 * group.sentiment) / group.numberOfValues) / 100;
      const firstPrice = parseFloat(group.price.split("$")[1]);
      const averagePrice = Math.round((parseFloat(group.cummulativePrice.split("$")[1]) / group.numberOfValues) * 100) / 100;
      const lastPrice = group.lastPrice
        ? parseFloat(group.lastPrice?.split("$")[1])
        : firstPrice;
      const priceChange = group.lastPrice
        ? `${Math.round((lastPrice - firstPrice) * 100) / 100}$`
        : group.priceChange;
      const pricePercentChange = group.lastPrice
        ? Math.round((1 - lastPrice / firstPrice) * 100) / 100 + "%"
        : group.pricePercentChange;
      return {
        ...group,
        sentiment,
        price: "$" + averagePrice,
        firstPrice: firstPrice,
        lastPrice: lastPrice,
        priceChange,
        pricePercentChange,
      };
    });
    console.log(mappedGroups)
    setShownValues(mappedGroups);
  }, [timeframe]);

  const sortValues = useCallback(() => {
    return shownValues.sort((value1: Stockvalue, value2: Stockvalue) => {
      if (sortBy === "symbol") {
        if (!sortDescending) return value1.symbol.localeCompare(value2.symbol);
        return value2.symbol.localeCompare(value1.symbol);
      }
      if (sortBy === "mentions") {
        if (!sortDescending) return value1.mentions > value2.mentions ? 1 : -1;
        return value1.mentions < value2.mentions ? 1 : -1;
      }
      if (sortBy === "price") {
        if (!sortDescending)
          return parseFloat(value1.price.split("$")[1]) >
            parseFloat(value2.price.split("$")[1])
            ? 1
            : -1;
        return parseFloat(value2.price.split("$")[1]) >
          parseFloat(value1.price.split("$")[1])
          ? 1
          : -1;
      }
      if (sortBy === "priceChange") {
        if (!sortDescending)
          return parseFloat(value1.priceChange) > parseFloat(value2.priceChange)
            ? 1
            : -1;
        return parseFloat(value1.priceChange) < parseFloat(value2.priceChange)
          ? 1
          : -1;
      }
      if (sortBy === "pricePercentChange") {
        if (sortDescending)
          return parseFloat(value1.pricePercentChange) <
            parseFloat(value2.pricePercentChange)
            ? 1
            : -1;
        return parseFloat(value1.pricePercentChange) >
          parseFloat(value2.pricePercentChange)
          ? 1
          : -1;
      }
      if (!sortDescending) return value1.sentiment > value2.sentiment ? 1 : -1;
      return value1.sentiment < value2.sentiment ? 1 : -1;
    });
  }, [sortBy, sortDescending, shownValues]);

  return (
    <div>
      <Navbar />
      <div
        id="top"
        className="d-flex flex-column h-100 w-100 position-relative justify-content-center"
      >
        <Container>
          <h1 style={{ color: "white" }}>Sentent.me</h1>
          <h2 style={{ color: "white" }}>
            Analyzing the current sentiment of the most popular investing
            subreddits
          </h2>
        </Container>
        <div
          className="h-100 d-flex align-items-end position-absolute bottom-0"
          style={{ marginBottom: "-2px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            max-width="100%"
            width="auto"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,192L48,181.3C96,171,192,149,288,165.3C384,181,480,235,576,240C672,245,768,203,864,186.7C960,171,1056,181,1152,186.7C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
      <Container className="mt-5 mb-5">
        {/* <Searchbar setSelectedStock={setSelectedStock} /> */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span>{shownValues.length} Stocks</span>
          <Timeframeselector
            timeframe={timeframe}
            setTimeframe={setTimeframe}
          />
        </div>
        <div className="p-3 p-md-2">
        <LegendStockListRow
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortDescending={sortDescending}
          setSortDescending={setSortDescending}
          sortValues={sortValues}
        />
        <StockList
          stockValues={sortValues()}
          selectedStock={selectedStock}
          setSelectedStock={setSelectedStock}
          entries={entries}
        />
        </div>
      </Container>
    </div>
  );
}

export async function getStaticProps() {
  const entries = await fetch("http://18.194.112.217/entries").then((res) =>
    res.json()
  );
  const yesterdaysEntry = entries[entries.length - 1];
  const yesterdaysValues = yesterdaysEntry.values;
  return {
    props: { yesterdaysValues, entries },
  };
}


