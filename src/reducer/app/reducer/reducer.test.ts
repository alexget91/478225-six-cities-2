import {ActionCreator, ActionType, reducer, State} from "./reducer";
import {FormSendingStatus} from "../../../common/constants";

describe(`App action creators works correctly`, () => {
  it(`App action creator for set "offers is loaded" returns correct action`, () => {
    expect(ActionCreator.setOffersLoaded(true)).toEqual({
      type: ActionType.SET_OFFERS_LOADED,
      payload: true,
    });
  });

  it(`App action creator for set "favorites is loaded" returns correct action`, () => {
    expect(ActionCreator.setFavoritesLoaded(true)).toEqual({
      type: ActionType.SET_FAVORITES_LOADED,
      payload: true,
    });
  });

  it(`App action creator for set review sending status returns correct action`, () => {
    expect(ActionCreator.setReviewSending(`status`)).toEqual({
      type: ActionType.SET_REVIEW_SENDING,
      payload: `status`,
    });
  });

  it(`App action creator for set error message returns correct action`, () => {
    expect(ActionCreator.setError(`error`)).toEqual({
      type: ActionType.SET_ERROR,
      payload: `error`,
    });
  });
});

describe(`App reducer works correctly`, () => {
  const mockInitialState: State = {
    isOffersLoaded: false,
    isFavoritesLoaded: false,
    reviewSendingStatus: FormSendingStatus.READY,
    errorMessage: null,
  };

  it(`App reducer without action should return current state`, () => {
    expect(reducer(mockInitialState, {
      type: null,
      payload: null,
    })).toEqual(mockInitialState);
  });

  it(`App reducer should set "offers is loaded" correctly`, () => {
    expect(reducer(mockInitialState, {
      type: ActionType.SET_OFFERS_LOADED,
      payload: true,
    })).toEqual(Object.assign({}, mockInitialState, {
      isOffersLoaded: true,
    }));
  });

  it(`App reducer should set "favorites is loaded" correctly`, () => {
    expect(reducer(mockInitialState, {
      type: ActionType.SET_FAVORITES_LOADED,
      payload: true,
    })).toEqual(Object.assign({}, mockInitialState, {
      isFavoritesLoaded: true,
    }));
  });

  it(`App reducer should set review sending status correctly`, () => {
    expect(reducer(mockInitialState, {
      type: ActionType.SET_REVIEW_SENDING,
      payload: `newStatus`,
    })).toEqual(Object.assign({}, mockInitialState, {
      reviewSendingStatus: `newStatus`,
    }));
  });

  it(`App reducer should set error message correctly`, () => {
    expect(reducer(mockInitialState, {
      type: ActionType.SET_ERROR,
      payload: `error`,
    })).toEqual(Object.assign({}, mockInitialState, {
      errorMessage: `error`,
    }));
  });
});
