import React from 'react';
import PropTypes from 'prop-types';

const OrderOptionNumber = ({name}) => {
  return (
    <div>{name}</div>
  );
};

OrderOptionNumber.propTypes = {
  name: PropTypes.string,
};

export default OrderOptionNumber;
