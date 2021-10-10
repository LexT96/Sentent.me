import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  XYPlot,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  XAxis,
  YAxis,
  VerticalBarSeries,
  FlexibleXYPlot,
  FlexibleWidthXYPlot,
  Hint,
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

const Plot = ({mappedEntries, symbol}: {mappedEntries: any[], symbol: string}) => {
    const [priceEntries, setPriceEntries] = useState<any>(null);
    const [sentimentEntries, setSentimentEntries] = useState<any>(null);
    const [maxValue, setMaxValue] = useState<number>(mappedEntries[0].value);
    const [sentimentBorders, setSentimentBorders] = useState<number[]>([1000,-1000]);
    const [value, setValue] = useState(null);

    useEffect(() => {
      const prepareEntries = () => {
        const priceArray = [];
        const sentimentArray = [];
        for (let i = 1; i < mappedEntries.length; i++) {
          if (!mappedEntries[i]) return;
          const entryValue: Stockvalue = mappedEntries[i].value;
          const sentiment = Math.round(entryValue.sentiment * 100);
          const priceChange = parseFloat(
            entryValue.pricePercentChange.split("%")[0]
          );
          priceArray.push({
            x: mappedEntries[i]._id,
            y: priceChange*4,
            Price: entryValue.price,
          });
          sentimentArray.push({
            x: mappedEntries[i]._id,
            y: sentiment ,
            y0: 0,
          });
        }
        setPriceEntries(priceArray);
        setSentimentEntries(sentimentArray);
        setSentimentBorders([
          Math.min(-100,Math.min(...sentimentArray.map((s) => s.y))),
          Math.max(...sentimentArray.map((s) => s.y)),
        ]);
      };
        prepareEntries();
    }, [mappedEntries, symbol])

    console.log(sentimentBorders)


  return (
    <FlexibleWidthXYPlot
      onMouseLeave={() => setValue(false)}
      height={400}
      yDomain={[-100, 100]}
      margin={{ bottom: 100, left: 100, right: 100 }}
      xType={"ordinal"}
    >
      <HorizontalGridLines style={{ stroke: "#B7E9ED" }} />
      <VerticalGridLines style={{ stroke: "#B7E9ED" }} />
      <LineSeries
        onNearestXY={(value) => setValue(value)}
        style={{ stroke: "#F00" }}
        data={priceEntries}
      />
      <VerticalBarSeries barWidth={0.1} data={sentimentEntries} />
      {/* <LineSeries data={sentimentEntries} /> */}
      <XAxis />
      {value && <Hint value={value} />}
      <YAxis tickFormat={(v) => `${v / 4}%`} title="Pricechange" />
      <YAxis orientation="right" title="Sentiment" />
    </FlexibleWidthXYPlot>
  );
};

export default Plot;
