import React from "react";
import Main from "../main/main";
import {placeList} from "../../common/global-prop-types";

const App = (props) => {
  const {offers} = props;

  return <Main offers={offers}/>;
};

App.propTypes = {offers: placeList};

export default App;
