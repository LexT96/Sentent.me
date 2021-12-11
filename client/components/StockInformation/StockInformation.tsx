import React from "react";
import { Row, Col, ListGroup } from "react-bootstrap";

const StockInformation = ({ stock }: { stock: Stock }) => {
  return (
    <Row className="p-3">
      <Col md={4} lg={3}>
        <ListGroup className="h-100">
          <ListGroup.Item>
            <div className="d-flex flex-column align-items-md-center pb-5 pt-2 h-100">
              <h4 className="text-md-center">{stock.companyName}</h4>
              {stock.image && (
                <img
                  src={stock.image}
                  alt={stock._id}
                  height={190}
                  width={190}
                />
              )}
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={8} lg={9}>
        <ListGroup as="ul">
          {stock.website && (
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 w-100 me-auto">
                <div className="fw-bold text-left">Website</div>
                <a className="link-primary" href={stock.website}>
                  {stock.website}
                </a>
              </div>
            </ListGroup.Item>
          )}
          {stock.sector && (
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 w-100 me-auto">
                <div className="fw-bold">Sector</div>
                {stock.sector}
              </div>
            </ListGroup.Item>
          )}
          {stock.industry && (
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 w-100 me-auto">
                <div className="fw-bold">Industry</div>
                {stock.industry}
              </div>
            </ListGroup.Item>
          )}
          {stock.description && (
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 w-100 me-auto">
                <div className="fw-bold">Description</div>
                {stock.description}
              </div>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Col>
    </Row>
  );
};

export default StockInformation;