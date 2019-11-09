import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main";
import Offer from "../offer/offer";
import {placeList} from "../../common/global-prop-types";
import URLS from "../../common/urls";
import reviews from "../../mocks/reviews";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer";

const getPageScreen = (props) => {
  const {cities, activeCity, offers, allOffers, onCityClick} = props;

  switch (location.pathname) {
    case URLS.main:
      return <Main cities={cities} activeCity={activeCity} offers={offers} onCityClick={(city) => {
        onCityClick(city, allOffers);
      }}/>;
    case URLS.offer:
      return <Offer offer={offers[0]} reviews={reviews} neighbourhood={[offers[1]]}/>;
  }

  return null;
};

getPageScreen.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCity: PropTypes.string,
  offers: placeList,
  allOffers: placeList,
  onCityClick: PropTypes.func.isRequired
};

const App = (props) => {
  return <React.Fragment>{getPageScreen(props)}</React.Fragment>;
};


const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeCity: state.city,
  offers: state.offers,
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (city, allOffers) => {
    dispatch(ActionCreator.setCity(city));
    dispatch(ActionCreator.setOffers(city, allOffers));
  },
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
