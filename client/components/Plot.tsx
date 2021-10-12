import React, { useEffect, useState } from "react";
import {
  FlexibleWidthXYPlot,
  Hint, HorizontalGridLines, LineSeries, LineSeriesPoint, VerticalBarSeries, VerticalGridLines, XAxis,
  YAxis
} from "react-vis";


const Plot = ({mappedEntries, symbol}: {mappedEntries: any[], symbol: string}) => {
    const [opacity, setOpacity] = useState(0);
    const [priceEntries, setPriceEntries] = useState<any>(null);
    const [sentimentEntries, setSentimentEntries] = useState<any>(null);
    const [value, setValue] = useState<null | LineSeriesPoint>(null);

    useEffect(() => {
      setTimeout(() => setOpacity(1), 300);
    }, [])

    useEffect(() => {
      const prepareEntries = () => {
        const priceArray = [];
        const sentimentArray = [];
        for (let i = 1; i < mappedEntries.length; i++) {
          if (!mappedEntries[i]) return;
          const entryValue: Stockvalue = mappedEntries[i].value;
          const sentiment = Math.round(entryValue.sentiment * 100);
          const dateSplit = mappedEntries[i]._id.split(".");
          const date = dateSplit[0] + "." + dateSplit[1];
          const priceChange = parseFloat(
            entryValue.pricePercentChange.split("%")[0]
          );
          priceArray.push({
            x: date,
            y: priceChange * 4,
            "Pricechange (%)": priceChange + "%",
            "Pricechange ($)": entryValue.priceChange,
            Price: entryValue.price,
            Sentiment: sentiment,
          });
          sentimentArray.push({
            x: date,
            y: sentiment ,
            y0: 0,
          });
        }
        setPriceEntries(priceArray);
        setSentimentEntries(sentimentArray);
      };
        prepareEntries();
    }, [mappedEntries, symbol])

  return (
    <FlexibleWidthXYPlot
      style={{ opacity, transition: "opacity 1s" }}
      onMouseLeave={() => setValue(null)}
      height={400}
      yDomain={[-100, 100]}
      margin={{ bottom: 100, left: 50, right: 50 }}
      xType={"ordinal"}
    >
      <HorizontalGridLines style={{ stroke: "#B7E9ED" }} />
      <VerticalGridLines style={{ stroke: "#B7E9ED" }} />
      <VerticalBarSeries barWidth={0.2} data={sentimentEntries} />
      <LineSeries
        onNearestXY={(value) => setValue(value)}
        style={{ stroke: "#F00" }}
        data={priceEntries}
      />
      <XAxis />
      {value && (
        <Hint
          value={value}
        />
      )}
      <YAxis tickFormat={(v) => `${v/4}%`} title="Pricechange" />
      <YAxis orientation="right" title="Sentiment" />
    </FlexibleWidthXYPlot>
  );
};

export default Plot;
