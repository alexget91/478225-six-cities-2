import NameSpace from "../../name-space";
import {GlobalState} from "../../reducer";
import {User} from "../../../common/types";
import {State} from "../reducer/reducer";

const NAME_SPACE: NameSpace = NameSpace.USER;

const getCity = (state: GlobalState): string => {
  return (state[NAME_SPACE] as State).city;
};

const getUser = (state: GlobalState): User => {
  return (state[NAME_SPACE] as State).user;
};

const getAuthorizationRequired = (state: GlobalState): boolean => {
  return (state[NAME_SPACE] as State).isAuthorizationRequired;
};

export {getCity, getUser, getAuthorizationRequired};
