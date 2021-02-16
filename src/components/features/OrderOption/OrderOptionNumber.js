import React from 'react';
import PropTypes from 'prop-types';
import {formatPrice} from '../../../utils/formatPrice';

import styles from './OrderOption.scss';

const OrderOptionNumber = ({price, setOptionValue, currentValue, limits}) => {
  return (
    <div className={styles.number}>
      <input
        type='number'
        className={styles.inputSmall}
        value={currentValue}
        min={limits.min}
        max={limits.max}
        onChange={event => setOptionValue(parseInt(event.currentTarget.value))}/>
      ({formatPrice(price)})
    </div>
  );
};

OrderOptionNumber.propTypes = {
  price: PropTypes.string,
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.number,
  limits: PropTypes.objectOf(PropTypes.number),
};

export default OrderOptionNumber;
