const UserActionTypes = {
  SET_CITY: `SET_CITY`,
  SET_USER: `SET_USER`,
  SET_AUTHORIZATION_REQUIRED: `SET_AUTHORIZATION_REQUIRED`,
};

const transformUserData = (data) => {
  const newData = Object.assign({}, data, {
    avatarUrl: data.avatar_url,
    isPro: data.is_pro,
  });

  delete newData.avatar_url;
  delete newData.is_pro;

  return newData;
};

const initialState = {
  city: null,
  user: null,
  isAuthorizationRequired: true,
};

const UserActionCreator = {
  setCity: (city) => ({
    type: UserActionTypes.SET_CITY,
    payload: city
  }),

  setUser: (data) => ({
    type: UserActionTypes.SET_USER,
    payload: transformUserData(data)
  }),

  setAuthorizationRequired: (flag) => ({
    type: UserActionTypes.SET_AUTHORIZATION_REQUIRED,
    payload: flag
  }),
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CITY:
      return Object.assign({}, state, {
        city: action.payload
      });
    case UserActionTypes.SET_USER:
      return Object.assign({}, state, {
        user: action.payload
      });
    case UserActionTypes.SET_AUTHORIZATION_REQUIRED:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload
      });
  }

  return state;
};

export {userReducer, UserActionCreator, UserActionTypes, transformUserData};
