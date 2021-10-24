import React, { Dispatch, SetStateAction } from "react";
import { Button, Col, Row } from "react-bootstrap";

const LegendStockListRow = ({
  sortBy,
  setSortBy,
  sortDescending,
  setSortDescending,
  sortValues,
}: any) => {
  const handleSortClick = (value: keyof Stockvalue) => {
    if (value === sortBy) {
      setSortDescending(!sortDescending);
      return;
    }
    setSortBy(value);
    setSortDescending(true);
    sortValues();
  };
  return (
    <tr className="stock-table-header legend-row glass-card">
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
        title="Pricechange $"
        sortBy={sortBy}
        sortDescending={sortDescending}
        isLong
        handleSortClick={handleSortClick}
        type="priceChange"
      />
      <Column
        title="Pricechange %"
        sortBy={sortBy}
        sortDescending={sortDescending}
        isLong
        handleSortClick={handleSortClick}
        type="pricePercentChange"
      />
      <Column
        title="Sentiment"
        sortBy={sortBy}
        sortDescending={sortDescending}
        handleSortClick={handleSortClick}
        type="sentiment"
      />
    </tr>
  );
};

const Column = ({
  sortBy,
  title,
  handleSortClick,
  type,
  isLong,
  sortDescending
}: {
  sortBy: keyof Stockvalue;
  title: string;
  handleSortClick: any;
  type: keyof Stockvalue;
  isLong?: boolean,
  sortDescending: boolean;
}) => {
  const sortIcon = () => {
    if (sortDescending) {
      return (
        <img
          className="ms-2"
          width={15}
          height={12}
          src={"/assets/arrow-down.png"}
          alt=""
        />
      );
    }
    return (
      <img
        className="ms-2"
        width={15}
        height={12}
        src={"/assets/arrow-up.png"}
        alt=""
      />
    );
  };
  return (
    <th className={isLong ? "long" : ""} onClick={() => handleSortClick(type)}>
        <div className="d-flex align-items-center my-auto">
          <h4 className="text-center">{title}</h4>
          {sortBy === type && sortIcon()}
        </div>
    </th>
  );
};

export default LegendStockListRow;
