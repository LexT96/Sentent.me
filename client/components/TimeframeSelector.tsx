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
    <ButtonGroup>
      <Button
        className={`button${timeframe === "M" ? "--active" : ""}`}
        onClick={onMonthClick}
      >
        Last month
      </Button>
      <Button
        className={`button${timeframe === "W" ? "--active" : ""}`}
        onClick={onWeekClick}
      >
        Last week
      </Button>
      <Button
        className={`button${timeframe === "D" ? "--active" : ""}`}
        onClick={onDayClick}
      >
        Today
      </Button>
    </ButtonGroup>
  );
};

export default Timeframeselector;
