import MockAdapter from "axios-mock-adapter";
import configureAPI from "../../api";
import Operation from "./operation";
import {UserActionTypes} from "../user-reducer/user-reducer";
import {AppActionTypes} from "../app-reducer/app-reducer";

const mockOffers = [
  {
    id: 1,
    city: {
      name: `Amsterdam`,
    },
    host: {
      "is_pro": false,
      "avatar_url": ``,
    },
  },
  {
    id: 2,
    city: {
      name: `Amsterdam`,
    },
    host: {
      "is_pro": false,
      "avatar_url": ``,
    },
  },
  {
    id: 3,
    city: {
      name: `Hamburg`,
    },
    host: {
      "is_pro": false,
      "avatar_url": ``,
    },
  }
];

const mockOffersTransformed = {
  Amsterdam: {
    city: {
      name: `Amsterdam`,
    },
    offers: [
      {
        id: 1,
        host: {
          isPro: false,
          avatarUrl: ``,
        },
      },
      {
        id: 2,
        host: {
          isPro: false,
          avatarUrl: ``,
        },
      },
    ],
  },
  Hamburg: {
    city: {
      name: `Hamburg`,
    },
    offers: [
      {
        id: 3,
        host: {
          isPro: false,
          avatarUrl: ``,
        },
      },
    ],
  },
};

const mockUser = {
  "id": 1,
  "email": `email`,
  "name": `name`,
  "avatar_url": `avatarUrl`,
  "is_pro": false
};

const mockUserTransformed = {
  id: 1,
  email: `email`,
  name: `name`,
  avatarUrl: `avatarUrl`,
  isPro: false
};

const api = configureAPI();
const apiMock = new MockAdapter(api);

it(`Should make a correct API call to /hotels`, () => {
  const offersDispatch = jest.fn();
  const offersLoader = Operation.loadOffers();

  apiMock
    .onGet(`/hotels`)
    .reply(200, mockOffers);

  return offersLoader(offersDispatch, null, api)
    .then(() => {
      expect(offersDispatch).toHaveBeenCalledTimes(2);
      expect(offersDispatch).toHaveBeenNthCalledWith(1, {
        type: UserActionTypes.SET_CITY,
        payload: `Amsterdam`,
      });
      expect(offersDispatch).toHaveBeenNthCalledWith(2, {
        type: AppActionTypes.SET_OFFERS,
        payload: mockOffersTransformed,
      });
    });
});

it(`Should make a correct API call to /login`, () => {
  const userDispatch = jest.fn();
  const userLoader = Operation.signIn();

  apiMock
    .onPost(`/login`)
    .reply(200, mockUser);

  return userLoader(userDispatch, null, api)
    .then(() => {
      expect(userDispatch).toHaveBeenCalledTimes(2);
      expect(userDispatch).toHaveBeenNthCalledWith(1, {
        type: UserActionTypes.SET_USER,
        payload: mockUserTransformed,
      });
      expect(userDispatch).toHaveBeenNthCalledWith(2, {
        type: UserActionTypes.SET_AUTHORIZATION_REQUIRED,
        payload: false,
      });
    });
});
