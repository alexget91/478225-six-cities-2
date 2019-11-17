import {UserActionTypes, UserActionCreator, userReducer} from "./user-reducer";

describe(`User action creators works correctly`, () => {
  it(`User action creator for set the city returns correct action`, () => {
    expect(UserActionCreator.setCity(`Paris`)).toEqual({
      type: UserActionTypes.SET_CITY,
      payload: `Paris`
    });
  });
});

describe(`User reducer works correctly`, () => {
  it(`User reducer without action should return current state`, () => {
    expect(userReducer({
      city: `Hamburg`,
    }, {})).toEqual({
      city: `Hamburg`,
    });
  });

  it(`User reducer should set given value as city`, () => {
    expect(userReducer({
      city: `Hamburg`,
    }, {
      type: UserActionTypes.SET_CITY,
      payload: `Paris`
    })).toEqual({
      city: `Paris`,
    });
  });
});
