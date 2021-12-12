import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Bar, ComposedChart, Label, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import CustomTooltip from "../CustomTooltip/CustomTooltip";

export default function Plot({ stock, mappedEntries }: {stock: Stock, mappedEntries: any}) {
    const [historicalData, setHistoricalData] = useState(stock.historical ?? [])

    // changes the date format from historicaldata entries from "YYYY-MM-DD" to "DD.MM.YYYY"
    // to make it match with the format of the mappedEntries
    const formatDateInHistoricalData = useCallback((data: any) => {
        const formattedData = data.map((historicalEntry: any) => {
            const date = moment(historicalEntry.date, "YYYY-MM-DD").format("DD.MM.YYYY");
            return { ...historicalEntry, date };
        });
        return formattedData;
    }, [stock]);

    // takes the historical data and adds the sentiment from the mappedEntries to it
    const addSentimentToHistoricalData = useCallback((data: any) => {
        const formattedData = data.map((historicalEntry: any) => {
            const indexOfMatchingEntry = mappedEntries.findIndex((entry: any) => entry.date == historicalEntry.date);
            const rawSentiment = mappedEntries[indexOfMatchingEntry]?.sentiment;
            const mentions = mappedEntries[indexOfMatchingEntry]?.mentions;
            const lastDaysSentiment = mappedEntries[indexOfMatchingEntry-1]?.sentiment;
            let sentimentChange;
            if (lastDaysSentiment) sentimentChange = Math.round(((rawSentiment- lastDaysSentiment) / lastDaysSentiment) * 100); 
            else sentimentChange = 0;
            const sentiment = Math.round(rawSentiment * 100);
            return { ...historicalEntry, sentiment, sentimentChange, mentions };
        });
        return formattedData;
    }, [stock]);

    const prepareHistoricalDataForDisplay = useCallback(() => {
    const dataWithCorrectDate = formatDateInHistoricalData(historicalData);
    const dataWithSentiment = addSentimentToHistoricalData(dataWithCorrectDate);
    return dataWithSentiment;
    }, [stock]);

    useEffect(() => {
      setHistoricalData(prepareHistoricalDataForDisplay());
    }, []);

    const formatDateForXAxis = (date: string) => {
       if (!date) return;
        const dateSplit = date.split(".");
        return dateSplit[0] + "." + dateSplit[1];
    }

    const formatPriceChange = (priceChange: number) => {
        return priceChange.toFixed(1);
    }
      
    return (
      <ResponsiveContainer minHeight={320} width="100%">
        <ComposedChart data={historicalData}>
          <defs>
            <linearGradient
              id={`sentiment-gradient`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={"#80ffdb"} stopOpacity={0.9} />
              <stop offset="90%" stopColor={"#80ffdb"} stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            interval={2}
            axisLine={true}
            tickLine={true}
            tickFormatter={(date: string) => formatDateForXAxis(date)}
            reversed={true}
          />
          <YAxis
            axisLine={true}
            tickLine={true}
            domain={["auto", "auto"]}
            width={80}
            tickFormatter={(priceChange: number) =>
              formatPriceChange(priceChange)
            }
            yAxisId="left"
            dx={3}
            allowDataOverflow={false}
          />
          {/* <YAxis
            axisLine={true}
            tickLine={true}
            width={50}
            domain={[-100, 100]}
            yAxisId="right"
            orientation="right"
            dx={3}
            allowDataOverflow={false}
          /> */}
          <Tooltip
            content={(content: any) => <CustomTooltip content={content} />}
          />
          <Bar
            yAxisId="left"
            dataKey="sentiment"
            barSize={20}
            fill={"url(#sentiment-gradient"}
          />
          <Line
            yAxisId="left"
            dataKey={"changePercent"}
            stroke={"#6930c3"}
            strokeWidth={3}
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
}