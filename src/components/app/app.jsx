import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main";
import Offer from "../offer/offer";
import {placeListByCity} from "../../common/global-prop-types";
import URLS from "../../common/urls";
import reviews from "../../mocks/reviews";
import {connect} from "react-redux";
import {UserActionCreator} from "../../reducer/user-reducer/user-reducer";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import withTransformProps from "../../hocs/with-transform-props/with-transform-props";
import {compose} from "redux";
import Page from "../page/page";
import {pageTypes} from "../../common/constants";
import Header from "../header/header";

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

const getPageData = (props, cities) => {
  const {activeCity, offers, onCityClick} = props;

  switch (location.pathname) {
    case URLS.main:
      return {
        content: <MainWrapped
          cities={cities}
          activeCity={offers[activeCity].city}
          offers={offers[activeCity].offers}
          onCityClick={onCityClick}
        />,
        type: pageTypes.MAIN,
      };
    case URLS.offer:
      return {
        content: <OfferWrapped
          offer={offers[`Dusseldorf`].offers[0]}
          city={offers[activeCity].city}
          reviews={reviews}
          neighbourhood={[offers[`Dusseldorf`].offers[1]]}
        />,
        type: pageTypes.OFFER,
      };
  }

  return null;
};

getPageData.propTypes = {
  activeCity: PropTypes.string,
  offers: placeListByCity,
  onCityClick: PropTypes.func.isRequired
};

const App = (props) => {
  const {offers} = props;
  const cities = Object.keys(offers);

  if (!cities.length) {
    return `Loading...`;
  }

  const pageData = getPageData(props, cities);

  return <Page
    header={<Header/>}
    content={pageData.content}
    type={pageData.type}
  />;
};

App.propTypes = {
  offers: placeListByCity,
};


const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeCity: state.userReducer.city,
  offers: state.appReducer.offers,
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (city) => dispatch(UserActionCreator.setCity(city)),
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
