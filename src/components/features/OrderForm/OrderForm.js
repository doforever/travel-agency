import React from 'react';
import PropTypes from 'prop-types';

import pricing from '../../../data/pricing.json';
import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';

import {Row, Col} from 'react-flexbox-grid';

const OrderForm = ({tripCost, options}) => {
  return (
    <Row>
      {pricing.map(option => (
        <Col key={option.id} md={4}>
          <OrderOption {...option}/>
        </Col>
      ))}
      <Col xs={12}>
        <OrderSummary cost={tripCost} options={options}/>
      </Col>
    </Row>
  );
};

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
};

export default OrderForm;
