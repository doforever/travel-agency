import React from 'react';
import PropTypes from 'prop-types';
import {calculateTotal} from '../../../utils/calculateTotal';
import {formatPrice} from '../../../utils/formatPrice';

import styles from './OrderSummary.scss';

const OrderSummary = ({cost, options}) => {
  return (
    <div className={styles.component}>
      {/* <h2>Start date {options['start-date']}</h2> */}
      <h2>Total <strong>{formatPrice(calculateTotal(cost, options))}</strong></h2>
    </div>
  );
};

OrderSummary.propTypes = {
  cost: PropTypes.string,
  options: PropTypes.object,
};

export default OrderSummary;
