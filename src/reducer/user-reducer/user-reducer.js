const UserActionTypes = {
  SET_CITY: `SET_CITY`,
};

const initialState = {
  city: null,
};

const UserActionCreator = {
  setCity: (city) => ({
    type: UserActionTypes.SET_CITY,
    payload: city
  }),
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CITY:
      return Object.assign({}, state, {
        city: action.payload
      });
  }

  return state;
};

export {userReducer, UserActionCreator, UserActionTypes};
