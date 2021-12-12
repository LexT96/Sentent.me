import React, { Dispatch, SetStateAction } from "react";
import { Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

const Searchbar = ({
  stocks,
  setSelectedStock,
}: {
  stocks: Stock[];
  setSelectedStock: Dispatch<SetStateAction<string>>;
}) => {

  // handles change in the typeahead searchbar
  const handleChange = (matchingStocks: Stock[]) => {
    const symbol = matchingStocks[0]?._id;
    if (!symbol) return;
    setSelectedStock(symbol);
    // finds the table row that matches the field value
    const symbolElement = document.getElementById(symbol);
    if (!symbolElement) return;
    // if the s
    symbolElement.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Form.Group>
      <Typeahead
        id="Stocksearch"
        labelKey={(stock: any) => `$${stock._id} (${stock.companyName})`}
        onChange={handleChange}
        options={stocks}
        onKeyDown={() => setSelectedStock("")}
        placeholder="Enter a stock..."
      />
    </Form.Group>
  );
};

export default Searchbar;
