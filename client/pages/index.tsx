import Head from "next/head";
import React, { useCallback, useEffect, useState, SetStateAction} from "react";
import Navbar from "../components/Navbar";
import { Button, Container, Form, FormControl, Row } from "react-bootstrap";
import Searchbar from "../components/Searchbar";
import Stock from "../components/Stock";
import StockListRow from "../components/StockListRow";
import LegendStockListRow from "../components/LegendStockListRow";
import { useRouter } from "next/router";
import Timeframeselector from "../components/TimeframeSelector";



export async function getStaticProps() {

  const entries = await fetch("http://18.194.112.217/entries").then((res) =>
    res.json()
  );


  const yesterdaysEntry = entries[entries.length -1];
  const yesterdaysValues = yesterdaysEntry.values;
  return {
    props: {  yesterdaysValues, entries}
  }
}

export default function Home({
  yesterdaysValues,
  entries
}: {
  yesterdaysValues: Stockvalue[];
  entries: Entry[];
}) {
  const [sortBy, setSortBy] = useState<keyof Stockvalue>("mentions");
  const [sortDescending, setSortDescending] = useState(true);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [shownValues, setShownValues] = useState(yesterdaysValues);
  const [timeframe, setTimeframe] = useState("D");
  const router = useRouter();

  const getEntriesInTimeframe = () => {
    if (timeframe === "D") return entries.slice(entries.length-1);
    if (timeframe === "W") {
      if (entries.length <= 7) return entries;
      return entries.slice(entries.length - 7);
    }
    if (entries.length <= 29) return entries;
    return entries.slice(entries.length - 30);
  }

  useEffect(() => {
    const matchingEntries = getEntriesInTimeframe();
    const entryValues = matchingEntries.map((entry: Entry) => entry.values).flat();
    let groups: StockvalueGroup[] = [];
    for (let i = 0; i < entryValues.length; i++) {
      const value = entryValues[i];
      const valuePrice = parseInt(entryValues[i].price.split("$")[0]);
      const groupSymbols = groups.map((group: Stockvalue) => group.symbol);
      const indexOfValue = groupSymbols.indexOf(value.symbol);
      if (indexOfValue === -1) {
        groups.push({...value, numberOfValues: 1});
      }
      else {
        groups[indexOfValue] = {
          ...groups[indexOfValue],
          mentions: groups[indexOfValue].mentions + value.mentions,
          sentiment: groups[indexOfValue].sentiment + value.sentiment,
          lastPrice: value.price,
          // price: groups[indexOfValue].price + valuePrice,
          // priceChange: groups[indexOfValue].priceChange + value.priceChange,
          // pricePercentChange: groups[indexOfValue].pricePercentChange + value.pricePercentChange,
          numberOfValues: groups[indexOfValue].numberOfValues + 1,
        };
      }
    }
    console.log(groups)
    const mappedGroups = groups.map((group: StockvalueGroup) => {
      const sentiment = Math.round(100 * group.sentiment / group.numberOfValues ) / 100;
      const firstPrice = parseInt(group.price.split("$")[1]);
      const lastPrice = group.lastPrice ? parseInt(group.lastPrice?.split("$")[1]) : firstPrice;
      const priceChange = group.lastPrice ? Math.round(((lastPrice - firstPrice)) * 100) / 100 + "$" : group.priceChange;
      const pricePercentChange = group.lastPrice ? Math.round((1 - (lastPrice/firstPrice)) * 100) / 100 + "%" : group.pricePercentChange;
      return {
      ...group,
      sentiment,
      priceChange,
      pricePercentChange,
    }});
    setShownValues(mappedGroups);
  }, [timeframe])

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
          if (!sortDescending) return parseFloat(value1.priceChange) > parseFloat(value2.priceChange) ? 1 : -1;
          return parseFloat(value1.priceChange) < parseFloat(value2.priceChange) ? 1 : -1;
        }
        if (sortBy === "pricePercentChange") {
          if (sortDescending) return parseFloat(value1.pricePercentChange) < parseFloat(value2.pricePercentChange) ? 1 : -1;
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
        className="d-flex pt-5 w-100 h-100 flex-column position-relative justify-content-end align-items-center"
      >
        <div>
          <h1 style={{color: 'white'}}>Sentent.me</h1>
          <h2 style={{color: "white"}}>
            Analyzing the current sentiment of the most popular investing subreddits
          </h2>
        </div>
        <div
          className="h-100 d-flex flex-col"
          style={{ justifyContent: "flex-end" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
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
        {/* <Button
              onClick={() => console.log(selectedStock)}
              className="w-100 mt-1"
            >
              Search
            </Button>
        </div>
        {/* {selectedStock ? ( */}
        {/* <Stock
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
        /> */}
        {/* ) : ( */}
        <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span>{shownValues.length} Stocks</span>
        <Timeframeselector timeframe={timeframe} setTimeframe={setTimeframe}/>
        </div>
          <LegendStockListRow
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortDescending={sortDescending}
            setSortDescending={setSortDescending}
            sortValues={sortValues}
          />
          {sortValues().map((values: Stockvalue) => (
            <>
              <StockListRow
                key={values.symbol}
                values={values}
                selectedStock={selectedStock}
                setSelectedStock={setSelectedStock}
              />
              {selectedStock === values.symbol && (
                <Stock
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
              )}
            </>
          ))}
        </div>
        
      </Container>
    </div>
  );
}


