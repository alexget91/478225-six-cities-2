import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main";
import Offer from "../offer/offer";
import {placeListByCity, userData} from "../../common/global-prop-types";
import reviews from "../../mocks/reviews";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/user/reducer/reducer";
import withActiveItem, {transformPropNames} from "../../hocs/with-active-item/with-active-item";
import withTransformProps from "../../hocs/with-transform-props/with-transform-props";
import Page from "../page/page";
import {pageTypes} from "../../common/constants";
import SignIn from "../sign-in/sign-in";
import Operation from "../../reducer/user/operation/operation";
import {Redirect, Route, Switch} from "react-router-dom";
import Path from "../../common/path";
import Header from "../header/header";

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
  const {offers, activeCity, user, isAuthorizationRequired, onCityClick, onSignIn} = props;
  const cities = Object.keys(offers);

  if (!cities.length) {
    return `Loading...`;
  }

  return <Switch>
    <Route path={Path.INDEX} exact render={() => {
      const isEmpty = !offers[activeCity].offers.length;
      const pageType = isEmpty ? pageTypes.MAIN_EMPTY : pageTypes.MAIN;

      return getComponentWithLayout(<Main
        offers={offers}
        cities={cities}
        activeCity={activeCity}
        isEmpty={isEmpty}
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

    <Route path={`${Path.OFFER}/:id`} exact render={() => getComponentWithLayout(<OfferWrapped
      offer={offers[`Dusseldorf`].offers[0]}
      city={offers[`Dusseldorf`].city}
      reviews={reviews}
      neighbourhood={[offers[`Dusseldorf`].offers[1]]}
    />, pageTypes.OFFER, user)}/>
  </Switch>;
};

App.propTypes = {
  activeCity: PropTypes.string,
  offers: placeListByCity,
  user: PropTypes.exact(userData),
  isAuthorizationRequired: PropTypes.bool,
  onCityClick: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeCity: state.user.city,
  offers: state.app.offers,
  isAuthorizationRequired: state.user.isAuthorizationRequired,
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (city) => dispatch(ActionCreator.setCity(city)),
  onSignIn: (email, password) => dispatch(Operation.signIn(email, password)),
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
