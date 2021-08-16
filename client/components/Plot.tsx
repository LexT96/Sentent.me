import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  XYPlot,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  XAxis,
  YAxis,
} from "react-vis";

const mockEntries = [
  { _id: "08/21/2021", price: "$15.00", priceChange: "0.03", sentiment: "0.05", sentimentChange: "0.4"},
  { _id: "08/22/2021", price: "$15.20", priceChange: "0.01", sentiment: "0.02", sentimentChange: "0.2"},
  { _id: "08/23/2021", price: "$14.80", priceChange: "-0.1", sentiment: "-0.05", sentimentChange: "0.6" },
  { _id: "08/24/2021", price: "$15.00", priceChange: "0.07", sentiment: "0", sentimentChange: "-0.1" },
  { _id: "08/25/2021", price: "$15.40", priceChange: "-0.03", sentiment: "0.01", sentimentChange: "0.2" },
  { _id: "08/26/2021", price: "$15.60", priceChange: "0.1", sentiment: "0.03", sentimentChange: "0" },
  { _id: "08/27/2021", price: "$15.80", priceChange: "-0.03", sentiment: "0.01", sentimentChange: "0.03" },
];

const DATE_FORMAT = "dd/MM/YYYY"

const Plot = ({entries, symbol}: {entries: Entry[], symbol: string}) => {
    const [priceEntries, setPriceEntries] = useState<any>(null);
    const [sentimentEntries, setSentimentEntries] = useState<any>(null);
    const prepareEntries = () => {
      const priceArray = [];
      const sentimentArray = [];
      for (let i = 1; i < entries.length; i++) {
        const entryValue: Stockvalue | undefined = entries[i].values.find(
          (v) => v.symbol == symbol
        );
        if (!entryValue) continue;
        priceArray.push({
          x: entries[i]._id,
          y: parseFloat(entryValue.priceChange),
        });
        sentimentArray.push({
          x: entries[i]._id,
          y:
            1 -
            parseFloat(entryValue.sentiment) / parseFloat(entryValue.sentiment),
        });
      }
      setPriceEntries(priceArray);
      setSentimentEntries(sentimentArray);
    };

    useEffect(() => {
        prepareEntries();
    }, [])

    if (!priceEntries || !sentimentEntries) return <></>;
    console.log(priceEntries)
    console.log(sentimentEntries)
    console.log(entries)

  return (
    <XYPlot height={400} width={1000} margin={{bottom: 100, left: 100}} xType={"ordinal"}>
      <HorizontalGridLines style={{ stroke: "#B7E9ED" }} />
      <VerticalGridLines style={{ stroke: "#B7E9ED" }} />
      <LineSeries data={priceEntries} />
      <LineSeries style={{stroke: "#F00"}} data={sentimentEntries} />
      <XAxis tickLabelAngle={-45} />
      <YAxis tickFormat={v => `${v*100}%`}/>
    </XYPlot>
  );
};

export default Plot;
