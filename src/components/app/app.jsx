import React from "react";
import Index from "../index";
import PropTypes from 'prop-types';

const App = (props) => {
  const {placeNames} = props;

  return <Index placeNames={placeNames}/>;
};

App.propTypes = {
  placeNames: PropTypes.arrayOf(PropTypes.string),
};

export default App;
