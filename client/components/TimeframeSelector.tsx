import React, { Dispatch, SetStateAction, useCallback } from "react";
import { Button, ButtonGroup, Nav } from "react-bootstrap";


enum TimeFrame {
  DAY = "D",
  WEEK = "W",
  MONTH = "M",
}

const Timeframeselector = ({
  timeframe,
  setTimeframe,
}: {
  timeframe: string;
  setTimeframe: Dispatch<SetStateAction<string>>;
}) => {
  const onClick = (selectedTimeFrame: TimeFrame) => {
    setTimeframe(selectedTimeFrame);
  };

  return (
    <ButtonGroup>
      <Button
        className={`button${timeframe === "M" ? "--active" : ""}`}
        onClick={() => onClick(TimeFrame.MONTH)}
      >
        Last month
      </Button>
      <Button
        className={`button${timeframe === "W" ? "--active" : ""}`}
        onClick={() => onClick(TimeFrame.WEEK)}
      >
        Last week
      </Button>
      <Button
        className={`button${timeframe === "D" ? "--active" : ""}`}
        onClick={() => onClick(TimeFrame.DAY)}
      >
        Today
      </Button>
    </ButtonGroup>
  );
};

export default Timeframeselector;
