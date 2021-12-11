import React, { Dispatch, SetStateAction, useCallback } from "react";

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
        isLast
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
  sortDescending,
  isLast
}: {
  sortBy: keyof Stockvalue;
  title: string;
  handleSortClick: any;
  type: keyof Stockvalue;
  isLong?: boolean,
  sortDescending: boolean;
  isLast?: boolean;
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
  let className = "";
  if (isLong) className += "long ";
  if (isLast) className += "pe-3 ";
  return (
    <th className={className} onClick={() => handleSortClick(type)}>
        <div className="d-flex align-items-center justify-content-end">
          {sortBy === type && sortIcon()}
          <h5 className="text-right">{title}</h5>
        </div>
    </th>
  );
};

export default LegendStockListRow;
