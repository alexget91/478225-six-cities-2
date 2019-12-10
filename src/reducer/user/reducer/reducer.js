const initialState = {
  city: null,
  user: null,
  isAuthorizationRequired: true,
};

const ActionType = {
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

const ActionCreator = {
  setCity: (city) => ({
    type: ActionType.SET_CITY,
    payload: city
  }),

  setUser: (data) => ({
    type: ActionType.SET_USER,
    payload: transformUserData(data)
  }),

  setAuthorizationRequired: (flag) => ({
    type: ActionType.SET_AUTHORIZATION_REQUIRED,
    payload: flag
  }),
};

const reducer = (state = initialState, action) => {
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

export {reducer, ActionCreator, ActionType, transformUserData};
