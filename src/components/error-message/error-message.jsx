import React from "react";
import PropTypes from "prop-types";

const ErrorMessage = (props) => {
  const {error, onCloseClick} = props;

  return <div style={{
    position: `fixed`,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    margin: `0 auto`,
    padding: `5px`,
    textAlign: `center`,
    fontSize: `25px`,
    backgroundColor: `red`,
    color: `black`,
  }}>{error}
    <span className="js-close" style={{float: `right`, cursor: `pointer`}} onClick={onCloseClick}>[close]</span>
  </div>;
};

ErrorMessage.propTypes = {
  error: PropTypes.string,
  onCloseClick: PropTypes.func,
};

export default ErrorMessage;
