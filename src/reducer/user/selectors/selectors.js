import NameSpace from "../../name-space";

const NAME_SPACE = NameSpace.USER;

const getCity = (state) => {
  return state[NAME_SPACE].city;
};

const getUser = (state) => {
  return state[NAME_SPACE].user;
};

const getAuthorizationRequired = (state) => {
  return state[NAME_SPACE].isAuthorizationRequired;
};

export {getCity, getUser, getAuthorizationRequired};
