import React from 'react';
import PropTypes from 'prop-types';
import loading from '../assets/spinner.png';

export default function InlineLoading(props) {
  const defSize = 5;
  const { size = defSize } = props;
  return (
    <img className={ `animate-spin w-${size}` } src={ loading } alt="loading spinner" />
  );
}

InlineLoading.defaultProps = {
  size: 5,
};

InlineLoading.propTypes = {
  size: PropTypes.number,
};
