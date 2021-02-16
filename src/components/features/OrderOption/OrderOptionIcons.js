import React from 'react';
import PropTypes from 'prop-types';

const OrderOptionIcons = ({name}) => {
  return (
    <div>{name}</div>
  );
};

OrderOptionIcons.propTypes = {
  name: PropTypes.string,
};

export default OrderOptionIcons;
