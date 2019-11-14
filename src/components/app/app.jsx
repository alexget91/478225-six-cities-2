import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main";
import Offer from "../offer/offer";
import {placeList} from "../../common/global-prop-types";
import URLS from "../../common/urls";
import reviews from "../../mocks/reviews";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import withTransformProps from "../../hocs/with-transform-props/with-transform-props";
import {compose} from "redux";

const DEFAULT_SORT = `popular`;

const transformPropNames = (newItem, newCallback, props) => {
  const newProps = Object.assign({}, props, {
    [newItem]: props.activeItem,
    [newCallback]: props.onActiveItemChange,
  });
  delete newProps.activeItem;
  delete newProps.onActiveItemChange;
  return newProps;
};

const getComponentWithOffer = (Component) => withActiveItem(withTransformProps(
    (props) => transformPropNames(`activeOffer`, `onActiveOfferChange`, props)
)(Component));

const getComponentWithSort = (Component) => withActiveItem(withTransformProps(
    (props) => transformPropNames(`sort`, `onSortChange`, props)
)(Component), DEFAULT_SORT);


const MainWrapped = compose(getComponentWithOffer, getComponentWithSort)(Main);

const OfferWrapped = withActiveItem(withTransformProps(
    (props) => transformPropNames(`activeNearPlace`, `onActiveNearPlaceChange`, props)
)(Offer));

const getPageScreen = (props) => {
  const {cities, activeCity, offers, allOffers, onCityClick} = props;

  switch (location.pathname) {
    case URLS.main:
      return <MainWrapped cities={cities} activeCity={activeCity} offers={offers} onCityClick={(city) => {
        onCityClick(city, allOffers);
      }}/>;
    case URLS.offer:
      return <OfferWrapped offer={offers[0]} reviews={reviews} neighbourhood={[offers[1]]}/>;
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
