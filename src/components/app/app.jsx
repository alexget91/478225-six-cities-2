import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main";
import Offer from "../offer/offer";
import {placeList, userData} from "../../common/global-prop-types";
import reviews from "../../mocks/reviews";
import {connect} from "react-redux";
import {ActionCreator as UserActionCreator} from "../../reducer/user/reducer/reducer";
import withActiveItem, {transformPropNames} from "../../hocs/with-active-item/with-active-item";
import withTransformProps from "../../hocs/with-transform-props/with-transform-props";
import Page from "../page/page";
import {pageTypes} from "../../common/constants";
import SignIn from "../sign-in/sign-in";
import UserOperation from "../../reducer/user/operation/operation";
import AppOperation from "../../reducer/app/operation/operation";
import {Redirect, Route, Switch} from "react-router-dom";
import Path from "../../common/path";
import Header from "../header/header";
import {
  getOffers,
  getOffersLoadStatus,
  getCitiesSelector,
  getOffersInCitySelector,
} from "../../reducer/app/selectors/selectors";
import {getAuthorizationRequired, getCity, getUser} from "../../reducer/user/selectors/selectors";
import withCurrentOffer from "../../hocs/with-current-offer/with-current-offer";
import withFavoritesClickHandler from "../../hocs/with-favorites-click-handler/with-favorites-click-handler";
import {compose} from "recompose";

const OfferWithTransformedProps = withTransformProps(
    (props) => transformPropNames(`activeNearPlace`, `onActiveNearPlaceChange`, props)
)(Offer);

const OfferWrapped = compose(
    withCurrentOffer,
    withFavoritesClickHandler,
    withActiveItem
)(OfferWithTransformedProps);

const getComponentWithLayout = (Component, type, isAuthorizationRequired, user) => {
  return <Page
    type={type}
    header={<Header
      isAuthorizationRequired={isAuthorizationRequired}
      email={user ? user.email : null}
    />}
    content={Component}
  />;
};

const App = (props) => {
  const {offers, cities, offersInCity, activeCity, user, isOffersLoaded, isAuthorizationRequired
    , onCityClick, onSignIn, onFavoritesClick} = props;

  if (!isOffersLoaded) {
    return `Loading...`;
  }

  return <Switch>
    <Route path={Path.INDEX} exact render={() => {
      const pageType = offersInCity.length ? pageTypes.MAIN : pageTypes.MAIN_EMPTY;

      return getComponentWithLayout(<Main
        offers={offersInCity}
        cities={cities}
        activeCity={activeCity}
        onCityClick={onCityClick}
        onFavoritesClick={onFavoritesClick}
      />, pageType, isAuthorizationRequired, user);
    }}/>

    <Route path={Path.LOGIN} exact render={() => {
      if (isAuthorizationRequired) {
        return getComponentWithLayout(<SignIn
          onFormSubmit={onSignIn}
        />, pageTypes.LOGIN, isAuthorizationRequired, user);
      }

      return <Redirect to={Path.INDEX}/>;
    }}/>

    <Route path={`${Path.OFFER}/:id`} exact render={(routeProps) => {
      return getComponentWithLayout(<OfferWrapped
        {...routeProps}
        offers={offers}
        reviews={reviews}
        neighbourhood={[offers[1]]}
        onFavoritesClick={onFavoritesClick}
      />, pageTypes.OFFER, isAuthorizationRequired, user);
    }}/>
  </Switch>;
};

App.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCity: PropTypes.string,
  offers: placeList,
  offersInCity: placeList,
  user: PropTypes.exact(userData),
  isOffersLoaded: PropTypes.bool,
  isAuthorizationRequired: PropTypes.bool,
  onCityClick: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
  onFavoritesClick: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  cities: getCitiesSelector(state),
  activeCity: getCity(state),
  offers: getOffers(state),
  offersInCity: getOffersInCitySelector(state),
  isOffersLoaded: getOffersLoadStatus(state),
  isAuthorizationRequired: getAuthorizationRequired(state),
  user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (city) => dispatch(UserActionCreator.setCity(city)),
  onSignIn: (email, password) => dispatch(UserOperation.signIn(email, password)),
  onFavoritesClick: (offerID, isFavorite) => dispatch(AppOperation.toggleFavorite(offerID, isFavorite)),
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
