import React from 'react';
import PropTypes from 'prop-types';

import styles from './OrderOption.scss';

const OrderOptionText = ({setOptionValue, currentValue, required, showValidation, validationMethod}) => {

  const isValid = () => {
    return !(required && !validationMethod(currentValue));
  };

  const showInvalid = () => {
    return showValidation && !isValid();
  };

  return (
    <input
      type='text'
      className={showInvalid() ? `${styles.input} ${styles.inputInvalid}` : styles.input}
      value={currentValue}
      onChange={event => setOptionValue(event.currentTarget.value)}/>
  );
};

OrderOptionText.propTypes = {
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.string,
  required: PropTypes.bool,
  showValidation: PropTypes.bool,
  validationMethod: PropTypes.func,
};

export default OrderOptionText;
