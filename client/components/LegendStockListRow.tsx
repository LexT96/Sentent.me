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
    <Row className="flex-nowrap glass-card align-items-center p-2 pt-3">
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
        handleSortClick={handleSortClick}
        type="priceChange"
      />
      <Column
        title="Pricechange %"
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
      />
    </Row>
  );
};

const Column = ({
  sortBy,
  title,
  handleSortClick,
  type,
  sortDescending
}: {
  sortBy: keyof Stockvalue;
  title: string;
  handleSortClick: any;
  type: keyof Stockvalue;
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
    <Col xs={4} md={3} lg={2}>
      <Button className="legend-button" onClick={() => handleSortClick(type)}>
        <div className="d-flex align-items-center">
          <h4>{title}</h4>
          {sortBy === type && sortIcon()}
        </div>
      </Button>
    </Col>
  );
};

export default LegendStockListRow;
