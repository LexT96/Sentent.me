import React, { useCallback, useEffect, useState } from "react";
import { Row, Col, ListGroup } from "react-bootstrap";
import styles from "./StockInformation.module.scss";

const StockInformation = ({ stock }: { stock: Stock }) => {

  const [showReadMoreButton, setShowReadMoreButton] = useState(false);
  const [description, setDescription] = useState<string|null>("");

  // either show the full description if it is a short one or hide the rest behind a read more button
  const handleDescriptionLength = useCallback(() => {
    if (!stock.description) return null;
    const cutOffLength = 500;
    if (stock.description.length > cutOffLength) {
      setShowReadMoreButton(true);
      return stock.description.substring(0, cutOffLength) + "...";
    }
    return stock.description;
  }, [stock]);

  useEffect(() => {
    setDescription(handleDescriptionLength());
  }, []);

  const onReadMoreClick = () => {
    setDescription(stock.description);
    setShowReadMoreButton(false);
  }

  return (
    <Row className="p-3">
      <Col md={4} lg={3}>
        <ListGroup className="h-100">
          <ListGroup.Item>
            <div className="d-flex flex-column align-items-center pb-3 pt-2 h-100">
              <h4 className="text-md-center">{stock.companyName}</h4>
              {stock.image && (
                <img
                  className="rounded-3"
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
            <ListGroup.Item as="li">
              <div className="ms-2 pt-2">
                <div className="fw-bold">Website</div>
                <a className="link-primary" target="_blank" rel="noreferrer" href={stock.website}>
                  {stock.website}
                </a>
              </div>
            </ListGroup.Item>
          )}
          {stock.sector && (
            <ListGroup.Item as="li">
              <div className="ms-2">
                <div className="fw-bold">Sector</div>
                {stock.sector}
              </div>
            </ListGroup.Item>
          )}
          {stock.industry && (
            <ListGroup.Item as="li">
              <div className="ms-2">
                <div className="fw-bold">Industry</div>
                {stock.industry}
              </div>
            </ListGroup.Item>
          )}
          {description && (
            <ListGroup.Item as="li">
              <div className="ms-2 pb-2">
                <div className="fw-bold">Description</div>
                {description}
                {showReadMoreButton && 
                <div>
                  <button onClick={onReadMoreClick} className={`mt-3 ${styles.btn} btn`}>Read more</button>
                </div>
                }
              </div>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Col>
    </Row>
  );
};

export default StockInformation;

