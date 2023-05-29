import React from 'react';
import { Col, Row } from 'reactstrap';

const RowBlock = ({ left, rigth }) => {
  return (
    <>
      <Row>
        <Col md="6">{left}</Col>
        <Col md="6">{rigth}</Col>
      </Row>
    </>
  );
};

export default RowBlock;
