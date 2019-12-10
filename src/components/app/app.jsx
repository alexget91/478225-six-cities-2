import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main";
import Offer from "../offer/offer";
import {placeList, reviewsList, sendingStatusType, userData} from "../../common/global-prop-types";
import {connect} from "react-redux";
import {ActionCreator as AppActionCreator} from "../../reducer/app/reducer/reducer";
import {ActionCreator as UserActionCreator} from "../../reducer/user/reducer/reducer";
import Operation from "../../reducer/operation/operation";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import Page from "../page/page";
import {PageType, FormSendingStatus} from "../../common/constants";
import SignIn from "../sign-in/sign-in";
import {Redirect, Route, Switch} from "react-router-dom";
import Path from "../../common/path";
import Header from "../header/header";
import {
  getOffersLoadStatus,
  getFavoritesLoadStatus,
  getError,
  getReviewSendingStatus,
} from "../../reducer/app/selectors/selectors";
import {
  getOffers,
  getReviews,
  getFavorites,
  getOffersByCities,
  getCitiesSelector,
  getOffersInCitySelector,
} from "../../reducer/data/selectors/selectors";
import {getAuthorizationRequired, getCity, getUser} from "../../reducer/user/selectors/selectors";
import withCurrentOffer from "../../hocs/with-current-offer/with-current-offer";
import withHandleFavoritesClick from "../../hocs/with-handle-favorites-click/with-handle-favorites-click";
import {compose} from "recompose";
import withReviewsList from "../../hocs/with-reviews-list/with-reviews-list";
import Favorites from "../favorites/favorites";
import PrivateRoute from "../../hocs/private-route/private-route";

const OfferWrapped = compose(
    withCurrentOffer,
    withReviewsList,
    withHandleFavoritesClick,
    withActiveItem
)(Offer);

const App = (props) => {
  const {offers, reviews, favorites, cities, offersInCity, activeCity, user, isOffersLoaded, isFavoritesLoaded
    , reviewSendingStatus, isAuthorizationRequired, error, loadReviews, onCityClick, onSignIn, onFavoritesClick
    , onCommentSubmit, onCommentSubmitSuccess, onErrorClose} = props;

  if (!isOffersLoaded) {
    return error ? error : `Loading...`;
  }

  const getComponentWithLayout = (Component, type) => {
    return <Page
      type={type}
      header={<Header
        isAuthorizationRequired={isAuthorizationRequired}
        email={user ? user.email : null}
      />}
      content={Component}
      error={error}
      onErrorClose={onErrorClose}
    />;
  };

  return <Switch>
    <Route path={Path.INDEX} exact render={() => {
      const pageType = offersInCity.length ? PageType.MAIN : PageType.MAIN_EMPTY;

      return getComponentWithLayout(<Main
        offers={offersInCity}
        cities={cities}
        activeCity={activeCity}
        onCityClick={onCityClick}
        onFavoritesClick={onFavoritesClick}
      />, pageType);
    }}/>

    <Route path={Path.LOGIN} exact render={() => {
      if (isAuthorizationRequired) {
        return getComponentWithLayout(<SignIn
          onFormSubmit={onSignIn}
        />, PageType.LOGIN);
      }

      return <Redirect to={Path.INDEX}/>;
    }}/>

    <Route path={`${Path.OFFER}/:id`} exact render={(routeProps) => {
      return getComponentWithLayout(<OfferWrapped
        {...routeProps}
        offers={offers}
        reviews={reviews}
        reviewSendingStatus={reviewSendingStatus}
        loadReviews={loadReviews}
        isAuthorizationRequired={isAuthorizationRequired}
        onFavoritesClick={onFavoritesClick}
        onNearPlaceFavoritesClick={onFavoritesClick}
        onCommentSubmit={onCommentSubmit}
        onCommentSubmitSuccess={onCommentSubmitSuccess}
      />, PageType.OFFER);
    }}/>

    <PrivateRoute path={Path.FAVORITES} exact isAuthorizationRequired={isAuthorizationRequired} render={() => {
      const pageType = favorites.length ? PageType.FAVORITES : PageType.FAVORITES_EMPTY;

      return getComponentWithLayout(<Favorites
        offers={getOffersByCities(favorites)}
        isLoaded={isFavoritesLoaded}
        onFavoritesClick={onFavoritesClick}
      />, pageType);
    }}/>
  </Switch>;
};

App.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCity: PropTypes.string,
  offers: placeList,
  offersInCity: placeList,
  reviews: reviewsList,
  favorites: placeList,
  user: PropTypes.exact(userData),
  isOffersLoaded: PropTypes.bool,
  isFavoritesLoaded: PropTypes.bool,
  reviewSendingStatus: sendingStatusType,
  isAuthorizationRequired: PropTypes.bool,
  error: PropTypes.string,
  loadReviews: PropTypes.func,
  onCityClick: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
  onFavoritesClick: PropTypes.func,
  onCommentSubmit: PropTypes.func,
  onCommentSubmitSuccess: PropTypes.func,
  onErrorClose: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  cities: getCitiesSelector(state),
  activeCity: getCity(state),
  offers: getOffers(state),
  offersInCity: getOffersInCitySelector(state),
  reviews: getReviews(state),
  favorites: getFavorites(state),
  isOffersLoaded: getOffersLoadStatus(state),
  isFavoritesLoaded: getFavoritesLoadStatus(state),
  reviewSendingStatus: getReviewSendingStatus(state),
  isAuthorizationRequired: getAuthorizationRequired(state),
  user: getUser(state),
  error: getError(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadReviews: (offerID) => dispatch(Operation.loadReviews(offerID)),
  onCityClick: (city) => dispatch(UserActionCreator.setCity(city)),
  onSignIn: (email, password) => dispatch(Operation.signIn(email, password)),
  onFavoritesClick: (offerID, isFavorite) => dispatch(Operation.toggleFavorite(offerID, isFavorite)),
  onCommentSubmit: (offerID, rating, comment) => {
    dispatch(AppActionCreator.setReviewSending(FormSendingStatus.SENDING));
    dispatch(Operation.sendReview(offerID, rating, comment));
  },
  onCommentSubmitSuccess: () => dispatch(AppActionCreator.setReviewSending(FormSendingStatus.READY)),
  onErrorClose: () => dispatch(AppActionCreator.setError()),
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
