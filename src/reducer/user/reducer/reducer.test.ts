import {ActionType, ActionCreator, reducer, State} from "./reducer";
import {User} from "../../../common/types";

const mockUser: User = {
  id: 1,
  email: `email`,
  name: `name`,
  avatar_url: `avatarUrl`,
  is_pro: false
};

describe(`User action creators works correctly`, () => {
  it(`User action creator for set the city returns correct action`, () => {
    expect(ActionCreator.setCity(`Paris`)).toEqual({
      type: ActionType.SET_CITY,
      payload: `Paris`
    });
  });

  it(`User action creator for set user returns correct action`, () => {
    expect(ActionCreator.setUser(mockUser)).toEqual({
      type: ActionType.SET_USER,
      payload: mockUser
    });
  });

  it(`User action creator for set "authorization required" returns correct action`, () => {
    expect(ActionCreator.setAuthorizationRequired(true)).toEqual({
      type: ActionType.SET_AUTHORIZATION_REQUIRED,
      payload: true
    });
  });
});

describe(`User reducer works correctly`, () => {
  const mockInitialState: State = {
    city: null,
    user: null,
    isAuthorizationRequired: true,
  };

  it(`User reducer without action should return current state`, () => {
    expect(reducer(mockInitialState, {
      type: null,
      payload: null,
    })).toEqual(mockInitialState);
  });

  it(`User reducer should set given value as city`, () => {
    expect(reducer(mockInitialState, {
      type: ActionType.SET_CITY,
      payload: `Paris`
    })).toEqual({
      city: `Paris`,
      user: null,
      isAuthorizationRequired: true,
    });
  });

  it(`User reducer should set given value as user`, () => {
    expect(reducer(mockInitialState, {
      type: ActionType.SET_USER,
      payload: mockUser
    })).toEqual({
      city: null,
      user: mockUser,
      isAuthorizationRequired: true,
    });
  });

  it(`User reducer should set given value as "authorization required"`, () => {
    expect(reducer(mockInitialState, {
      type: ActionType.SET_AUTHORIZATION_REQUIRED,
      payload: false
    })).toEqual({
      city: null,
      user: null,
      isAuthorizationRequired: false,
    });
  });
});
