import React from 'react';
import PropTypes from 'prop-types';

const OrderOptionDropdown = ({name}) => {
  return (
    <div>{name}</div>
  );
};

OrderOptionDropdown.propTypes = {
  name: PropTypes.string,
};

export default OrderOptionDropdown;
