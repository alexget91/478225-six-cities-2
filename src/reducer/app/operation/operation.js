import {ActionCreator as UserActionCreator} from "../../user/reducer/reducer";
import {ActionCreator as AppActionCreator} from "../reducer/reducer";

const FAVORITE_STATUS = {
  TRUE: 1,
  FALSE: 0,
};

const Operation = {
  loadOffers: () => (dispatch, _, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(UserActionCreator.setCity(response.data[0].city.name));
        dispatch(AppActionCreator.setOffers(response.data));
        dispatch(AppActionCreator.setOffersLoaded(true));
      });
  },

  toggleFavorite: (offerID, isFavorite) => (dispatch, _, api) => {
    return api.post(`/favorite/${offerID}/${isFavorite ? FAVORITE_STATUS.FALSE : FAVORITE_STATUS.TRUE}`)
      .then((response) => {
        if (response.data) {
          dispatch(AppActionCreator.updateOffer(response.data));
        }
      });
  },
};

export default Operation;
