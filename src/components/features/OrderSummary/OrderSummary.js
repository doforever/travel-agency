import React from 'react';
import PropTypes from 'prop-types';
import {calculateTotal} from '../../../utils/calculateTotal';
import {formatPrice} from '../../../utils/formatPrice';
import {promoPrice} from '../../../utils/promoPrice';

import styles from './OrderSummary.scss';

const OrderSummary = ({cost, days, options}) => {
  const startDate = options['start-date'];
  let endDate = new Date();
  if (startDate) endDate.setDate(startDate.getDate() + days);
  const price = calculateTotal(cost, options);

  return (
    <div className={styles.component}>
      {startDate ?
        <div>
          <h3>Start date: {startDate.toLocaleDateString()}</h3>
          <h3>End date: {endDate.toLocaleDateString()}</h3>
        </div>
        : ''
      }
      <h2 className={styles.promoPrice}>Price from <strong>{formatPrice(promoPrice(price, 20))}</strong></h2>
      <h2>Standard price <strong>{formatPrice(price)}</strong></h2>
    </div>
  );
};

OrderSummary.propTypes = {
  cost: PropTypes.string,
  days: PropTypes.number,
  options: PropTypes.object,
};

export default OrderSummary;
