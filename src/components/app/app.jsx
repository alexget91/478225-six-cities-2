import React from "react";
import Index from "../index";
import PropTypes from "prop-types";

const App = (props) => {
  const {placeNames} = props;
  const onPlaceNameClick = () => {};

  return <Index
    placeNames={placeNames}
    onPlaceNameClick={onPlaceNameClick}
  />;
};

App.propTypes = {
  placeNames: PropTypes.arrayOf(PropTypes.string),
};

export default App;
