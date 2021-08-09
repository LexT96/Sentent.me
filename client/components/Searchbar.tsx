import React, { Dispatch, SetStateAction } from "react";
import { Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

const Searchbar = ({
  stocks,
  setSelectedStock,
}: {
  stocks: Stock[];
  setSelectedStock: Dispatch<SetStateAction<Stock | null>>;
}) => {
  const handleChange = (matchingStocks: Stock[]) => {
    setSelectedStock(matchingStocks[0]);
  };

  return (
    <Form.Group className="w-100">
      <Typeahead
        id="basic-typeahead-single"
        labelKey={(stock: Stock) => `${stock._id} (${stock.name})`}
        onChange={handleChange}
        options={stocks}
        placeholder="Enter a stock..."
      />
    </Form.Group>
  );
};

export default Searchbar;
