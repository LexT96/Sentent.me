import React from "react";
import { Nav } from "react-bootstrap";

const Timeframeselector = () => {
  return (
    <Nav variant="pills" className="flex-column">
      <Nav.Item>
        <Nav.Link eventKey="first">Tab 1</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="second">Tab 2</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Timeframeselector;
