import React, { Dispatch, SetStateAction, useCallback } from "react";
import { Button, ButtonGroup, Nav } from "react-bootstrap";
import styles from "./TimeframeSelector.module.scss";


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

  const onTimeframeClick = (selectedTimeFrame: TimeFrame) => {
    setTimeframe(selectedTimeFrame);
  };

  return (
    <ButtonGroup>
      <Button
        className={timeframe === "M" ? styles["button--active"] : styles.button}
        onClick={() => onTimeframeClick(TimeFrame.MONTH)}
      >
        Last month
      </Button>
      <Button
        className={timeframe === "W" ? styles["button--active"] : styles.button}
        onClick={() => onTimeframeClick(TimeFrame.WEEK)}
      >
        Last week
      </Button>
      <Button
        className={timeframe === "D" ? styles["button--active"] : styles.button}
        onClick={() => onTimeframeClick(TimeFrame.DAY)}
      >
        Today
      </Button>
    </ButtonGroup>
  );
};

export default Timeframeselector;
