import React, { useCallback, useEffect, useState } from "react";
import {
  FlexibleWidthXYPlot,
  Hint,
  HorizontalGridLines,
  LineSeries,
  LineSeriesPoint,
  VerticalBarSeries,
  VerticalGridLines,
  XAxis,
  YAxis,
} from "react-vis";

const Plot = ({
  mappedEntries,
  symbol,
}: {
  mappedEntries: any[];
  symbol: string;
}) => {
  const [opacity, setOpacity] = useState(0);
  const [priceEntries, setPriceEntries] = useState<any>(null);
  const [sentimentEntries, setSentimentEntries] = useState<any>(null);
  const [value, setValue] = useState<null | LineSeriesPoint>(null);
  const [maxPriceChange, setMaxPriceChange] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => setOpacity(1), 300);
  }, []);

  // calculate the tick format on the y axis to make sure it doesn't get cut off
  const calculateTickFormat = (v: number) => {
    if (maxPriceChange > 100) return Math.round(v / (100 / maxPriceChange));
    if (maxPriceChange > 25) return v;
    return v/4;
  }

  const calculatePriceDivider = (maxChange: number) => {
    if (maxChange > 100) return 100;
    if (maxChange > 25) return maxChange;
    return maxChange / 4;
  }

  const calculateMaxRelativePriceChange = () => {
    let maxChange = 0;
    mappedEntries.forEach((entry) => {
      const priceChange = Math.abs(parseFloat(entry.value.pricePercentChange.split("%")[0]));
      if (priceChange > maxChange) maxChange = entry. value.pricePercentChange;
    });
    setMaxPriceChange(maxChange);
    return maxChange;
  };

  // prpaare the mapped entries to be displayed on the plot
  const prepareEntriesForDisplay = () => {
    const maxChange = calculateMaxRelativePriceChange();
    const priceArray: PlotEntry[] = [];
    const sentimentArray: PlotSentiment[] = [];
    mappedEntries.forEach((entry) => {
      const entryValue: Stockvalue = entry.value;
      const priceDivider = calculatePriceDivider(maxChange);
      const sentiment = Math.round(entryValue.sentiment * 100);
      const dateSplit = entry._id.split(".");
      const date = dateSplit[0] + "." + dateSplit[1];
      const priceChange = parseFloat(
        entryValue.pricePercentChange.split("%")[0]
      );
      priceArray.push({
        x: date,
        y: priceChange * priceDivider,
        "Pricechange (%)": priceChange + "%",
        "Pricechange ($)": entryValue.priceChange,
        Price: entryValue.price,
        Sentiment: sentiment,
      });
      sentimentArray.push({
        x: date,
        y: sentiment,
        y0: 0,
      });
    });
    setPriceEntries(priceArray);
    setSentimentEntries(sentimentArray);
  };

  useEffect(() => {
    prepareEntriesForDisplay();
  }, [mappedEntries, symbol]);


  return (
    <FlexibleWidthXYPlot
      style={{ opacity, transition: "opacity 1s" }}
      onMouseLeave={() => setValue(null)}
      height={400}
      yDomain={[-105, 105]}
      margin={{ bottom: 100, left: 50, right: 50 }}
      xType={"ordinal"}
    >
      <HorizontalGridLines style={{ stroke: "#ccc"}} />
      <VerticalGridLines style={{ stroke: "#ccc", }} />
      <VerticalBarSeries fill={"#64dfdf"} barWidth={0.2} data={sentimentEntries} />
      <LineSeries
        onNearestXY={(value) => setValue(value)}
        stroke={"#6930c3"}
        data={priceEntries}
      />
      <XAxis style={{fontSize: "0.6rem"}} />
      {value && <Hint value={value} />}
      <YAxis tickFormat={(v) => `${calculateTickFormat(v)}%`} title="Pricechange" />
      <YAxis orientation="right" title="Sentiment" />
    </FlexibleWidthXYPlot>
  );
};

export default Plot;
