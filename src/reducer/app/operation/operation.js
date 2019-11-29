import {ActionCreator as UserActionCreator} from "../../user/reducer/reducer";
import {ActionCreator as AppActionCreator} from "../reducer/reducer";

const Operation = {
  loadOffers: () => (dispatch, _, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(UserActionCreator.setCity(response.data[0].city.name));
        dispatch(AppActionCreator.setOffers(response.data));
      });
  },
};

export default Operation;
