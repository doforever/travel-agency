import React from 'react';
import PropTypes from 'prop-types';
import {formatPrice} from '../../../utils/formatPrice';

import styles from './OrderOption.scss';

const OrderOptionDropdown = ({values, required, currentValue, setOptionValue}) => (
  <select
    className={styles.dropdown}
    value={currentValue}
    onChange={event => setOptionValue(event.currentTarget.value)}
  >
    {required ? '' : (
      <option key='null' value=''>---</option>
    )}
    {values.map(value => (
      <option key={value.id} value={value.id} className={styles.option}>{value.name} ({formatPrice(value.price)})</option>
    ))}
  </select>
);

OrderOptionDropdown.propTypes = {
  currentValue: PropTypes.string,
  setOptionValue: PropTypes.func,
  required: PropTypes.bool,
  values: PropTypes.array,
};

export default OrderOptionDropdown;
