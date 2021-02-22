import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../../../utils/formatPrice';
import { calculateTotal } from '../../../utils/calculateTotal';
import settings from '../../../data/settings';

import pricing from '../../../data/pricing.json';
import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';
import Button from './../../common/Button/Button';

import { Row, Col } from 'react-flexbox-grid';
import styles from './OrderForm.scss';

const sendOrder = (order, tripCost) => {
  const totalCost = formatPrice(calculateTotal(tripCost, order.options));

  const payload = {
    ...order,
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
    .then(function (response) {
      return response.json();
    }).then(function (parsedResponse) {
      console.log('parsedResponse', parsedResponse);
    });
};

const validateOrder = order => {
  let validity = true;
  for (let method in validationMethods) {
    if(!validationMethods[method](order.options[method])){
      validity = false;
    }
  }
  return validity;
};

const validationMethods = {
  contact: value => !(value === ''),
  name: value => !(value === ''),
};

const OrderForm = ({ tripCost, days, options, order, setOrderOption}) => {
  const [isValid, setValidity] = useState(true);

  const validateAndSend = () => {
    const newValidity = validateOrder(order);
    setValidity(newValidity);
    if (newValidity) {
      sendOrder(order, tripCost);
    }
    else {
      console.log('order validation failed');
    }
  };

  return (
    <Row className={styles.row}>
      {pricing.map(option => (
        <Col key={option.id} md={4} className={styles.column}>
          <OrderOption
            {...option}
            currentValue={options[option.id]}
            setOrderOption={setOrderOption}
            showValidation={!isValid}
            validationMethod={validationMethods[option.id]}/>
        </Col>
      ))}
      <Col xs={12} className={styles.column}>
        <OrderSummary cost={tripCost} days={days} options={options} />
      </Col>
      <Col xs={12} className={styles.column}>
        <Button onClick={() => validateAndSend()}>Order now!</Button>
      </Col>
    </Row>
  );
};

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  days: PropTypes.number,
  options: PropTypes.object,
  order: PropTypes.object,
  setOrderOption: PropTypes.func,
};

export default OrderForm;
