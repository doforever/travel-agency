import React from 'react';
import PropTypes from 'prop-types';
import {formatPrice} from '../../../utils/formatPrice';

import Icon from '../../common/Icon/Icon';

import styles from './OrderOption.scss';

const OrderOptionIcons = ({values, required, setOptionValue}) => (
  <div className={styles.dropdown}>
    {required ? '' : (
      <div onClick={() => setOptionValue('')}><Icon name='time-circle'/> none</div>
    )}
    {values.map(value => (
      <div key={value.id} onClick={() => setOptionValue(value.id)} className={styles.icon}>
        <Icon name={value.icon}/> {value.name} ({formatPrice(value.price)})
      </div>
    ))}
  </div>
);

OrderOptionIcons.propTypes = {
  values: PropTypes.array,
  required: PropTypes.bool,
  setOptionValue: PropTypes.func,
};

export default OrderOptionIcons;
