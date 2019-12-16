import * as React from "react";

interface Props {
  error?: string,
  onCloseClick?: () => void,
}

const ErrorMessage = (props: Props) => {
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

export default ErrorMessage;
