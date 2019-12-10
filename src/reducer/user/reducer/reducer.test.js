import {ActionType, ActionCreator, reducer, transformUserData} from "./reducer";

it(`User data transformation works correctly`, () => {
  expect(transformUserData({
    "id": 1,
    "email": `email`,
    "name": `name`,
    "avatar_url": `avatarUrl`,
    "is_pro": false,
  })).toEqual({
    id: 1,
    email: `email`,
    name: `name`,
    avatarUrl: `avatarUrl`,
    isPro: false,
  });
});

describe(`User action creators works correctly`, () => {
  it(`User action creator for set the city returns correct action`, () => {
    expect(ActionCreator.setCity(`Paris`)).toEqual({
      type: ActionType.SET_CITY,
      payload: `Paris`
    });
  });

  it(`User action creator for set user returns correct action`, () => {
    expect(ActionCreator.setUser({foo: `bar`})).toEqual({
      type: ActionType.SET_USER,
      payload: {foo: `bar`}
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
  const mockInitialState = {
    city: null,
    user: null,
    isAuthorizationRequired: true,
  };

  it(`User reducer without action should return current state`, () => {
    expect(reducer(mockInitialState, {})).toEqual(mockInitialState);
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
      payload: {foo: `bar`}
    })).toEqual({
      city: null,
      user: {foo: `bar`},
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
