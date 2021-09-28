import React, { Dispatch, SetStateAction, useCallback } from "react";
import { Button, ButtonGroup, Nav } from "react-bootstrap";

const Timeframeselector = ({
  timeframe,
  setTimeframe,
}: {
  timeframe: string;
  setTimeframe: Dispatch<SetStateAction<string>>;
}) => {
  const onMonthClick = () => {
    setTimeframe("M");
  };
  const onWeekClick = () => {
    setTimeframe("W");
  };
  const onDayClick = () => {
    setTimeframe("D");
  };

  return (
    <ButtonGroup aria-label="Basic example">
      <Button
        onClick={onMonthClick}
        variant={timeframe === "M" ? "primary" : "outline-primary"}
      >
        Last month
      </Button>
      <Button
        onClick={onWeekClick}
        variant={timeframe === "W" ? "primary" : "outline-primary"}
      >
        Last week
      </Button>
      <Button
        onClick={onDayClick}
        variant={timeframe === "D" ? "primary" : "outline-primary"}
      >
        Today
      </Button>
    </ButtonGroup>
  );
};

export default Timeframeselector;
