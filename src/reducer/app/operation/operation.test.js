import MockAdapter from "axios-mock-adapter";
import configureAPI from "../../../api";
import Operation from "./operation";
import {ActionTypes as UserActionTypes} from "../../user/reducer/reducer";
import {ActionTypes as AppActionTypes} from "../reducer/reducer";

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

const api = configureAPI();
const apiMock = new MockAdapter(api);

it(`Should make a correct API call to /hotels`, () => {
  const dispatch = jest.fn();
  const loader = Operation.loadOffers();

  apiMock
    .onGet(`/hotels`)
    .reply(200, mockOffers);

  return loader(dispatch, null, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: UserActionTypes.SET_CITY,
        payload: `Amsterdam`,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: AppActionTypes.SET_OFFERS,
        payload: mockOffersTransformed,
      });
    });
});
