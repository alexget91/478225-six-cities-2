import {ActionCreator as AppActionCreator} from "../app/reducer/reducer";
import {ActionCreator as DataActionCreator} from "../data/reducer/reducer";
import {ActionCreator as UserActionCreator} from "../user/reducer/reducer";
import {FormSendingStatus} from "../../common/constants";
import Path from "../../common/path";
import history from "../../history";
import {getAuthorizationRequired} from "../user/selectors/selectors";

const FAVORITE_STATUS = {
  TRUE: 1,
  FALSE: 0,
};

const withAuthCheck = (state, onIsAuthorized) => {
  if (getAuthorizationRequired(state)) {
    history.push(Path.LOGIN);
  } else {
    onIsAuthorized();
  }
};

const Operation = {
  loadOffers: () => (dispatch, _, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        if (response.data) {
          dispatch(UserActionCreator.setCity(response.data[0].city.name));
          dispatch(DataActionCreator.setOffers(response.data));
          dispatch(AppActionCreator.setOffersLoaded(true));
        }
      });
  },

  loadReviews: (offerID) => (dispatch, _, api) => {
    return api.get(`/comments/${offerID}`)
      .then((response) => {
        dispatch(DataActionCreator.setReviews(response.data));
      });
  },

  loadFavorites: () => (dispatch, _, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        if (response.data) {
          dispatch(DataActionCreator.setFavorites(response.data));
          dispatch(AppActionCreator.setFavoritesLoaded(true));
        }
      });
  },

  sendReview: (offerID, rating, comment) => (dispatch, getState, api) => {
    return api.post(`/comments/${offerID}`, {rating, comment})
      .then((response) => {
        withAuthCheck(getState(), () => {
          if (response.data) {
            dispatch(DataActionCreator.setReviews(response.data));
            dispatch(AppActionCreator.setReviewSending(FormSendingStatus.SUCCESS));

          } else {
            dispatch(AppActionCreator.setReviewSending(FormSendingStatus.READY));
          }
        });
      });
  },

  toggleFavorite: (offerID, isFavorite) => (dispatch, getState, api) => {
    return api.post(`/favorite/${offerID}/${isFavorite ? FAVORITE_STATUS.FALSE : FAVORITE_STATUS.TRUE}`)
      .then((response) => {
        withAuthCheck(getState(), () => {
          if (response.data) {
            dispatch(DataActionCreator.updateOffer(response.data));
            dispatch(Operation.loadFavorites());
          }
        });
      });
  },

  signIn: (email, password) => (dispatch, _, api) => {
    return api.post(`/login`, {
      email,
      password
    })
      .then((response) => {
        if (response.data) {
          dispatch(UserActionCreator.setUser(response.data));
          dispatch(UserActionCreator.setAuthorizationRequired(false));
          dispatch(Operation.loadOffers());
          dispatch(Operation.loadFavorites());
        }
      });
  },

  getUser: () => (dispatch, _, api) => {
    return api.get(`/login`)
      .then((response) => {
        if (response.data) {
          dispatch(UserActionCreator.setUser(response.data));
          dispatch(Operation.loadFavorites());
          dispatch(UserActionCreator.setAuthorizationRequired(false));
        }
        dispatch(Operation.loadOffers());
      });
  },
};

export {withAuthCheck};

export default Operation;
