import React from 'react';
import {Row, Col} from 'react-flexbox-grid';

import OrderSummary from '../OrderSummary/OrderSummary';

const OrderForm = () => {
  return (
    <Row>
      <Col xs={12}>
        <OrderSummary />
      </Col>
    </Row>
  );
};

export default OrderForm;
