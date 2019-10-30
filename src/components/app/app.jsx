import React from "react";
import Main from "../main/main";
import Offer from "../offer/offer";
import {placeList} from "../../common/global-prop-types";
import URLS from "../../common/urls";

const getPageScreen = (props) => {
  const {offers} = props;

  switch (location.pathname) {
    case URLS.main:
      return <Main offers={offers}/>;
    case URLS.offer:
      return <Offer offer={offers[0]}/>;
  }

  return null;
};

getPageScreen.propTypes = {offers: placeList};

const App = (props) => {
  return <React.Fragment>{getPageScreen(props)}</React.Fragment>;
};

export default App;
