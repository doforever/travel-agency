import React from 'react';
import PropTypes from 'prop-types';

import pricing from '../../../data/pricing.json';
import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';

import {Row, Col} from 'react-flexbox-grid';
import styles from './OrderForm.scss';

const OrderForm = ({tripCost, options, setOrderOption}) => {
  return (
    <Row className={styles.row}>
      {pricing.map(option => (
        <Col key={option.id} md={4} className={styles.column}>
          <OrderOption {...option} currentValue={options[option.id]} setOrderOption={setOrderOption}/>
        </Col>
      ))}
      <Col xs={12} className={styles.column}>
        <OrderSummary cost={tripCost} options={options}/>
      </Col>
    </Row>
  );
};

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
};

export default OrderForm;
