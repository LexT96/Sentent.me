import React, { Dispatch, SetStateAction, useCallback } from "react";
import { Button, ButtonGroup, Nav } from "react-bootstrap";

const Timeframeselector = ({
  timeframe,
  setTimeframe,
}: {
  timeframe: string;
  setTimeframe: Dispatch<SetStateAction<string>>;
}) => {
    const onYearClick = () => {
        setTimeframe("Y");
    };
    const onMonthClick = () => {
        setTimeframe("M");
    };
    const onWeekClick = () => {
        setTimeframe("W");
    };

  return (
    <ButtonGroup aria-label="Basic example">
      <Button onClick={onYearClick} variant={timeframe === "Y" ? "primary" : "outline-primary"}>
        1 Y
      </Button>
      <Button onClick={onMonthClick} variant={timeframe === "M" ? "primary" : "outline-primary"}>
        1 M
      </Button>
      <Button onClick={onWeekClick} variant={timeframe === "W" ? "primary" : "outline-primary"}>
        1 W
      </Button>
    </ButtonGroup>
  );
};

export default Timeframeselector;
