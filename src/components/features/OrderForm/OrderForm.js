import React from 'react';
import PropTypes from 'prop-types';
import {formatPrice} from '../../../utils/formatPrice';
import {calculateTotal} from '../../../utils/calculateTotal';
import settings from '../../../data/settings';

import pricing from '../../../data/pricing.json';
import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';
import Button from './../../common/Button/Button';

import {Row, Col} from 'react-flexbox-grid';
import styles from './OrderForm.scss';

const sendOrder = (options, tripCost) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...options,
    totalCost,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse){
      console.log('parsedResponse', parsedResponse);
    });
};

const OrderForm = ({tripCost, days, options, setOrderOption}) => {
  return (
    <Row className={styles.row}>
      {pricing.map(option => (
        <Col key={option.id} md={4} className={styles.column}>
          <OrderOption {...option} currentValue={options[option.id]} setOrderOption={setOrderOption}/>
        </Col>
      ))}
      <Col xs={12} className={styles.column}>
        <OrderSummary cost={tripCost} days={days} options={options}/>
      </Col>
      <Button onClick={() => sendOrder(options, tripCost)}>Order now!</Button>
    </Row>
  );
};

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  days: PropTypes.number,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
};

export default OrderForm;
