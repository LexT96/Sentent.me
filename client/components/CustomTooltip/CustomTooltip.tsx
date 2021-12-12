import React from "react";
import { ListGroup } from "react-bootstrap";
import { formatDateForXAxis } from "../../helpers";

export default function CustomTooltip({ content }: any) {
  const { payload }: any = content;
  if (!payload[0]) return <div />;
  const hoveredEntry = payload[0];
  return (
    <div className="d-flex flex-column align-items-start px-1">
      <ListGroup as="ul" className={"rounded"}>
        <ListGroup.Item>
          Date: {formatDateForXAxis(hoveredEntry.payload.date)}
        </ListGroup.Item>
        <ListGroup.Item>Price: {hoveredEntry.payload.close}</ListGroup.Item>
        <ListGroup.Item>
          Pricechange: {hoveredEntry.payload.changePercent.toFixed(2)}%
        </ListGroup.Item>
        {hoveredEntry.payload.sentiment && (
          <ListGroup.Item>
            Sentiment: {hoveredEntry.payload.sentiment}
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
}