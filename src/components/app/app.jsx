import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main";
import Offer from "../offer/offer";
import {placeListByCity, placeListByID, userData} from "../../common/global-prop-types";
import reviews from "../../mocks/reviews";
import {connect} from "react-redux";
import {ActionCreator as UserActionCreator} from "../../reducer/user/reducer/reducer";
import withActiveItem, {transformPropNames} from "../../hocs/with-active-item/with-active-item";
import withTransformProps from "../../hocs/with-transform-props/with-transform-props";
import Page from "../page/page";
import {pageTypes} from "../../common/constants";
import SignIn from "../sign-in/sign-in";
import UserOperation from "../../reducer/user/operation/operation";
import {Redirect, Route, Switch} from "react-router-dom";
import Path from "../../common/path";
import Header from "../header/header";
import {getCities, getOffers} from "../../reducer/app/selectors/selectors";
import {getAuthorizationRequired, getCity, getUser} from "../../reducer/user/selectors/selectors";

const OfferWrapped = withActiveItem(withTransformProps(
    (props) => transformPropNames(`activeNearPlace`, `onActiveNearPlaceChange`, props)
)(Offer));

const getComponentWithLayout = (Component, type, user) => {
  return <Page
    type={type}
    header={<Header email={user ? user.email : null}/>}
    content={Component}
  />;
};

const App = (props) => {
  const {offers, cities, activeCity, user, isAuthorizationRequired, onCityClick, onSignIn} = props;

  if (!cities.length) {
    return `Loading...`;
  }

  return <Switch>
    <Route path={Path.INDEX} exact render={() => {
      const pageType = offers.offersByCities[activeCity].length ? pageTypes.MAIN : pageTypes.MAIN_EMPTY;

      return getComponentWithLayout(<Main
        offers={offers.offersByCities[activeCity]}
        cities={cities}
        activeCity={activeCity}
        onCityClick={onCityClick}
      />, pageType, user);
    }}/>

    <Route path={Path.LOGIN} exact render={() => {
      if (isAuthorizationRequired) {
        return getComponentWithLayout(<SignIn
          onFormSubmit={onSignIn}
        />, pageTypes.LOGIN, user);
      }

      return <Redirect to={Path.INDEX}/>;
    }}/>

    <Route path={`${Path.OFFER}/:id`} exact render={(routeProps) => getComponentWithLayout(<OfferWrapped
      {...routeProps}
      offers={offers.allOffers}
      reviews={reviews}
      neighbourhood={[offers.allOffers[1]]}
    />, pageTypes.OFFER, user)}/>
  </Switch>;
};

App.propTypes = {
  activeCity: PropTypes.string,
  offers: PropTypes.exact({
    allOffers: placeListByID,
    offersByCities: placeListByCity,
  }),
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  user: PropTypes.exact(userData),
  isAuthorizationRequired: PropTypes.bool,
  onCityClick: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeCity: getCity(state),
  offers: getOffers(state),
  cities: getCities(state),
  isAuthorizationRequired: getAuthorizationRequired(state),
  user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (city) => dispatch(UserActionCreator.setCity(city)),
  onSignIn: (email, password) => dispatch(UserOperation.signIn(email, password)),
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
