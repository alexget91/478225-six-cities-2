import {UserActionCreator} from "../user-reducer/user-reducer";
import {AppActionCreator} from "../app-reducer/app-reducer";

const Operation = {
  loadOffers: () => (dispatch, _, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(UserActionCreator.setCity(response.data[0].city.name));
        dispatch(AppActionCreator.setOffers(response.data));
      });
  },

  signIn: (email, password) => (dispatch, _, api) => {
    return api.post(`/login`, {
      email,
      password
    })
    .then((response) => {
      dispatch(UserActionCreator.setUser(response.data));
      dispatch(UserActionCreator.setAuthorizationRequired(false));
    });
  },
};

export default Operation;
