import React, { useEffect, useState } from "react";
import { DiscreteColorLegend } from "react-vis";
import Plot from "../Plot/Plot";
import StockInformation from "../StockInformation/StockInformation";

const Stock = ({
  mappedEntries,
  stock,
}: {
  mappedEntries: any;
  stock: Stock;
}) => {
  const [scale, setScale] = useState(0);
  useEffect(() => {
    // used to add an animation on opening
    setTimeout(() => setScale(1), 100);
  }, []);

  return (
    <div
      style={{ transform: `scaleY(${scale})` }}
      className="stock py-2 px-4 mb-3 justify-content-center position-relative"
    >
      <h2 className="text-center py-3">
        {stock._id} ({stock.companyName})
      </h2>
      <div className="position-absolute" style={{ right: 0, top: 0 }}>
        <DiscreteColorLegend
          items={[
            { title: "Sentimentscore", color: "#64dfdf" },
            { title: "Change in price (%)", color: "#6930c3" },
          ]}
        />
      </div>
      <Plot mappedEntries={mappedEntries} symbol={stock._id} />
      <StockInformation stock={stock} />
    </div>
  );
};

export default Stock;
