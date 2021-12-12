import React, { Dispatch, SetStateAction, useCallback } from "react";
import styles from "./LegendStockRow.module.scss";

const LegendStockListRow = ({
  sortBy,
  setSortBy,
  sortDescending,
  setSortDescending,
  sortValues,
}: {
  sortBy: keyof Stockvalue;
  setSortBy: Dispatch<SetStateAction<keyof Stockvalue>>;
  sortDescending: boolean;
  setSortDescending: Dispatch<SetStateAction<boolean>>;
  sortValues: () => void;
}) => {

  // change column that the rows get sorted by or change sort direction
  const handleSortClick = useCallback(
    (value: keyof Stockvalue) => {
      if (value === sortBy) {
        setSortDescending(!sortDescending);
        return;
      }
      setSortBy(value);
      setSortDescending(true);
      sortValues();
    },
    [sortBy, sortDescending]
  );

  return (
    <thead>
      <tr className="">
        <Column
          title="Symbol"
          sortBy={sortBy}
          sortDescending={sortDescending}
          handleSortClick={handleSortClick}
          type="symbol"
        />
        <Column
          title="Mentions"
          sortBy={sortBy}
          sortDescending={sortDescending}
          handleSortClick={handleSortClick}
          type="mentions"
        />
        <Column
          title="Price"
          sortBy={sortBy}
          sortDescending={sortDescending}
          handleSortClick={handleSortClick}
          type="price"
        />
        <Column
          title="Pricechange ($)"
          sortBy={sortBy}
          sortDescending={sortDescending}
          handleSortClick={handleSortClick}
          type="priceChange"
        />
        <Column
          title="Pricechange (%)"
          sortBy={sortBy}
          sortDescending={sortDescending}
          handleSortClick={handleSortClick}
          type="pricePercentChange"
        />
        <Column
          title="Sentiment"
          sortBy={sortBy}
          sortDescending={sortDescending}
          handleSortClick={handleSortClick}
          type="sentiment"
          isLast
        />
      </tr>
    </thead>
  );
};

const Column = ({
  sortBy,
  title,
  handleSortClick,
  type,
  sortDescending,
  isLast,
}: {
  sortBy: keyof Stockvalue;
  title: string;
  handleSortClick: any;
  type: keyof Stockvalue;
  sortDescending: boolean;
  isLast?: boolean;
}) => {
  const getSortIcon = () => {
    return (
      <img
        width={14}
        height={14}
        src={`/assets/images/arrow-${sortDescending ? "down" : "up"}.png`}
        alt=""
      />
    );
  };

  return (
    <th className={`cursor-pointer ${isLast ? "pe-3" : ""}`} onClick={() => handleSortClick(type)}>
      <div className="d-flex align-items-center justify-content-end">
        <div className={styles["arrow-container"]}>
          {sortBy === type && getSortIcon()}
        </div>
        <h5 className="ms-2 right">{title}</h5>
      </div>
    </th>
  );
};

export default LegendStockListRow;
