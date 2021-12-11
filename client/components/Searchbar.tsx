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


  const handleChange = (matchingStocks: Stock[]) => {
    const symbol = matchingStocks[0]?._id;
    if (!symbol) return;
    setSelectedStock(symbol);
    const symbolElement = document.getElementById(symbol);
    if (!symbolElement) return;
    symbolElement.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Form.Group>
      <Typeahead
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
