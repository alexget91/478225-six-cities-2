import {User} from "../../../common/types";
import {ActionCreator, Reducer} from "../../interfaces";

enum ActionType {
  SET_CITY = `SET_CITY`,
  SET_USER = `SET_USER`,
  SET_AUTHORIZATION_REQUIRED = `SET_AUTHORIZATION_REQUIRED`,
}

type ActionPayload = string | User | boolean;

interface State {
  city: string,
  user: User,
  isAuthorizationRequired: boolean,
}


const initialState: State = {
  city: null,
  user: null,
  isAuthorizationRequired: true,
};

const ActionCreator: ActionCreator<ActionType, ActionPayload> = {
  setCity: (city: string) => ({
    type: ActionType.SET_CITY,
    payload: city
  }),

  setUser: (data: User) => ({
    type: ActionType.SET_USER,
    payload: data
  }),

  setAuthorizationRequired: (flag: boolean) => ({
    type: ActionType.SET_AUTHORIZATION_REQUIRED,
    payload: flag
  }),
};

const reducer: Reducer<ActionType, ActionPayload, State> = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_CITY:
      return Object.assign({}, state, {
        city: action.payload
      });
    case ActionType.SET_USER:
      return Object.assign({}, state, {
        user: action.payload
      });
    case ActionType.SET_AUTHORIZATION_REQUIRED:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload
      });
  }

  return state;
};

export {reducer, ActionCreator, ActionType, State};
