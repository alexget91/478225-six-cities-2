import {FormSendingStatus} from "../../../common/constants";

const initialState = {
  isOffersLoaded: false,
  isFavoritesLoaded: false,
  reviewSendingStatus: FormSendingStatus.READY,
  errorMessage: null,
};

const ActionType = {
  SET_OFFERS_LOADED: `SET_OFFERS_LOADED`,
  SET_FAVORITES_LOADED: `SET_FAVORITES_LOADED`,
  SET_REVIEW_SENDING: `SET_REVIEW_SENDING`,
  SET_ERROR: `SET_ERROR`,
};

const ActionCreator = {
  setOffersLoaded: (status) => ({
    type: ActionType.SET_OFFERS_LOADED,
    payload: status,
  }),

  setFavoritesLoaded: (status) => ({
    type: ActionType.SET_FAVORITES_LOADED,
    payload: status,
  }),

  setReviewSending: (status) => ({
    type: ActionType.SET_REVIEW_SENDING,
    payload: status,
  }),

  setError: (error) => ({
    type: ActionType.SET_ERROR,
    payload: error,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_OFFERS_LOADED:
      return Object.assign({}, state, {
        isOffersLoaded: action.payload
      });
    case ActionType.SET_FAVORITES_LOADED:
      return Object.assign({}, state, {
        isFavoritesLoaded: action.payload
      });
    case ActionType.SET_REVIEW_SENDING:
      return Object.assign({}, state, {
        reviewSendingStatus: action.payload
      });
    case ActionType.SET_ERROR:
      return Object.assign({}, state, {
        errorMessage: action.payload
      });
  }

  return state;
};

export {reducer, ActionCreator, ActionType};
