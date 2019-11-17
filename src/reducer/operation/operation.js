import {UserActionCreator} from "../user-reducer/user-reducer";
import {AppActionCreator} from "../app-reducer/app-reducer";

const Operation = {
  loadOffers: () => (dispatch, _, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(UserActionCreator.setCity(response.data[0].city.name));
        dispatch(AppActionCreator.setOffers(response.data));
      });
  }
};

export default Operation;
