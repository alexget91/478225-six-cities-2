import {PlaceCard, PlaceList, ReviewItem, ReviewsList} from "../../../common/types";
import {ActionCreator, Reducer} from "../../interfaces";

enum ActionType {
  SET_OFFERS = `SET_OFFERS`,
  SET_REVIEWS = `SET_REVIEWS`,
  SET_FAVORITES = `SET_FAVORITES`,
  UPDATE_OFFER = `UPDATE_OFFER`,
}

type ActionPayload = PlaceCard | PlaceList | ReviewsList;

interface State {
  offers: PlaceList,
  reviews: ReviewsList,
  favorites: PlaceList,
}


const initialState: State = {
  offers: [],
  reviews: [],
  favorites: [],
};

const transformReviewsList = (reviews: ReviewsList): ReviewsList => reviews ? reviews
    .sort((a: ReviewItem, b: ReviewItem): number => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10)
  : [];

const updateOffer = (offers: PlaceList, newOffer: PlaceCard): PlaceList => {
  const index = offers.findIndex((offer: PlaceCard) => offer.id === newOffer.id);
  offers.splice(index, 1, newOffer);

  return offers.slice();
};

const ActionCreator: ActionCreator<ActionType, ActionPayload> = {
  setOffers: (offers: PlaceList) => ({
    type: ActionType.SET_OFFERS,
    payload: offers,
  }),

  setReviews: (reviews: ReviewsList) => ({
    type: ActionType.SET_REVIEWS,
    payload: transformReviewsList(reviews),
  }),

  setFavorites: (favorites: PlaceList) => ({
    type: ActionType.SET_FAVORITES,
    payload: favorites,
  }),

  updateOffer: (offer: PlaceCard) => ({
    type: ActionType.UPDATE_OFFER,
    payload: offer,
  }),
};

const reducer: Reducer<ActionType, ActionPayload, State> = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_OFFERS:
      return Object.assign({}, state, {
        offers: action.payload
      });
    case ActionType.SET_REVIEWS:
      return Object.assign({}, state, {
        reviews: action.payload
      });
    case ActionType.SET_FAVORITES:
      return Object.assign({}, state, {
        favorites: action.payload
      });
    case ActionType.UPDATE_OFFER:
      return Object.assign({}, state, {
        offers: updateOffer(state.offers, action.payload as PlaceCard)
      });
  }

  return state;
};

export {
  transformReviewsList,
  updateOffer,
  ActionType,
  ActionCreator,
  reducer,
  State,
};
