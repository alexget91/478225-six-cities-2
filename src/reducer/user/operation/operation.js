import {ActionCreator} from "../reducer/reducer";

const Operation = {
  signIn: (email, password) => (dispatch, _, api) => {
    return api.post(`/login`, {
      email,
      password
    })
    .then((response) => {
      dispatch(ActionCreator.setUser(response.data));
      dispatch(ActionCreator.setAuthorizationRequired(false));
    });
  },
};

export default Operation;
