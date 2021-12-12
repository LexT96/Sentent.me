import React, { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import styles from "./Plot.module.scss";

export default function Plot2({ stock }: {stock: Stock}) {
    const historicalData = stock.historical ?? [];
    // const [priceEntries, setPriceEntries] = useState<any>(null);
    // const [sentimentEntries, setSentimentEntries] = useState<any>(null);
    console.log(historicalData);
    
    // const prepareEntriesForDisplay = () => {
    //     const priceArray: PlotEntry[] = [];
    //     const sentimentArray: PlotSentiment[] = [];
    //     mappedEntries.forEach((entry: any) => {
    //       const entryValue: Stockvalue = entry;
    //       const sentiment = Math.round(entryValue.sentiment * 100);
    //       const dateSplit = entry.date.split(".");
    //       const date = dateSplit[0] + "." + dateSplit[1][1];
    //       const priceChange = parseFloat(
    //         entryValue.pricePercentChange.split("%")[0]
    //       );
    //       priceArray.push({
    //         x: date,
    //         y: priceChange,
    //         "Pricechange (%)": priceChange + "%",
    //         "Pricechange ($)": entryValue.priceChange,
    //         Price: entryValue.price,
    //         Sentiment: sentiment,
    //       });
    //       sentimentArray.push({
    //         x: date,
    //         y: sentiment,
    //         y0: 0,
    //       });
    //     });
    //     setPriceEntries(priceArray);
    //     setSentimentEntries(sentimentArray);
    //   };

    //   useEffect(() => {
    //     prepareEntriesForDisplay();
    //   }, [mappedEntries, symbol]);

    const formatDate = (date: string) => {
        const dateSplit = date.split("-");
        return dateSplit[2] + "." + dateSplit[1];
    }

    const formatPrice = (price: string) => {
        return parseFloat(price).toFixed(2) + "$";
    }
      
    return <ResponsiveContainer minHeight={300} width="100%">
        <AreaChart data={historicalData}>
            <defs>
        <linearGradient id={`price-gradient`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={"#6930c3"} stopOpacity={0.9} />
        <stop offset="90%" stopColor={"#6930c3"} stopOpacity={0.2} />
        </linearGradient>
        </defs>
        <XAxis
      dataKey="date"
      interval={2}
      axisLine={true}
      tickLine={true}
      tickFormatter={(date:string) => formatDate(date)}
      reversed={true}
      padding={{ right: 20 }}
    />
        <YAxis
      tickCount={10}
      axisLine={true}
      tickLine={true}
      tickFormatter={(price: string) => formatPrice(price)}
      width={80}
      domain={[0, "auto"]}
      dx={3}
      allowDataOverflow={false}
    />
    <Tooltip content={(content: any) =>  
    { const {payload}: any = content;
    if (!payload[0]) return <div/>;
    const hoveredEntry = payload[0];
    return (
      <div className="d-flex flex-column align-items-start px-1">
        <ListGroup as="ul" className={styles["tooltip-list"]}>
          <ListGroup.Item>Price: {hoveredEntry.value}</ListGroup.Item>
          <ListGroup.Item>Date: {formatDate(hoveredEntry.payload.date)}</ListGroup.Item>
          <ListGroup.Item>Change: {hoveredEntry.payload.change.toFixed(2)}</ListGroup.Item>
          <ListGroup.Item>
            ChangePercent: {hoveredEntry.payload.changePercent.toFixed(2)}
          </ListGroup.Item>
          <ListGroup.Item>Volume: {hoveredEntry.payload.volume}</ListGroup.Item>
        </ListGroup>
      </div>
    );
          }
    }/>
        <Area dataKey={"close"} stroke="linear" fill={"url(#price-gradient)"} fillOpacity={1} />
        </AreaChart>
    </ResponsiveContainer>
}