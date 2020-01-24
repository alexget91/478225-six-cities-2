import {AxiosInstance} from "axios";
import MockAdapter from "axios-mock-adapter";
import configureAPI from "../../api";
import Operation, {FavoriteStatus, withAuthCheck} from "./operation";
import {ActionType as AppActionType} from "../app/reducer/reducer";
import {ActionType as DataActionType} from "../data/reducer/reducer";
import {ActionType as UserActionType} from "../user/reducer/reducer";
import {getMockOffer} from "../../common/test-stubs";
import {FormSendingStatus} from "../../common/constants";
import NameSpace from "../name-space";
import history from "../../history";
import Path from "../../common/path";
import {PlaceList, ReviewsList, User} from "../../common/types";
import {GlobalState} from "../reducer";

const mockOffers: PlaceList = [
  getMockOffer(1, `Amsterdam`),
  getMockOffer(2, `Amsterdam`),
  getMockOffer(3, `Hamburg`),
];

const mockUser: User = {
  id: 1,
  email: `email`,
  name: `name`,
  avatar_url: `avatarUrl`,
  is_pro: false
};

const mockReviews: ReviewsList = [
  {
    id: 2,
    user: {
      id: 0,
      name: ``,
      is_pro: false,
      avatar_url: ``
    },
    rating: 0,
    comment: ``,
    date: `2019-04-08T11:14:58.569Z`
  },
  {
    id: 3,
    user: {
      id: 0,
      name: ``,
      is_pro: false,
      avatar_url: ``
    },
    rating: 0,
    comment: ``,
    date: `2019-06-08T11:14:58.569Z`
  },
];

const mockReviewsTransformed: ReviewsList = [
  {
    id: 3,
    user: {
      id: 0,
      name: ``,
      is_pro: false,
      avatar_url: ``
    },
    rating: 0,
    comment: ``,
    date: `2019-06-08T11:14:58.569Z`
  },
  {
    id: 2,
    user: {
      id: 0,
      name: ``,
      is_pro: false,
      avatar_url: ``
    },
    rating: 0,
    comment: ``,
    date: `2019-04-08T11:14:58.569Z`
  },
];

const mockFavorites: PlaceList = [getMockOffer(2, `Amsterdam`)];

const api: AxiosInstance = configureAPI();
const apiMock: MockAdapter = new MockAdapter(api);

const getMockState = (isAuthorizationRequired?: boolean): GlobalState => ({[NameSpace.USER]: {
  city: null,
  user: null,
  isAuthorizationRequired,
}});

describe(`Should make a correct API call to get hotels`, () => {
  const dispatch = jest.fn();
  const loader = Operation.loadOffers();

  it(`When request success`, () => {
    apiMock
      .onGet(`/hotels`)
      .reply(200, mockOffers);

    return loader(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: UserActionType.SET_CITY,
          payload: `Amsterdam`,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: DataActionType.SET_OFFERS,
          payload: mockOffers,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: AppActionType.SET_OFFERS_LOADED,
          payload: true,
        });
      });
  });

  it(`When request error`, () => {
    apiMock
      .onGet(`/hotels`)
      .reply(200, undefined);

    return loader(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
      });
  });
});

it(`Should make a correct API call to get reviews`, () => {
  const dispatch = jest.fn();
  const offerID: number = 1;
  const loader = Operation.loadReviews(offerID);

  apiMock
    .onGet(`/comments/${offerID}`)
    .reply(200, mockReviews);

  return loader(dispatch, null, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: DataActionType.SET_REVIEWS,
        payload: mockReviewsTransformed,
      });
    });
});

describe(`Should make a correct API call to get favorites`, () => {
  const dispatch = jest.fn();
  const loader = Operation.loadFavorites();

  it(`When request success`, () => {
    apiMock
      .onGet(`/favorite`)
      .reply(200, mockFavorites);

    return loader(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: DataActionType.SET_FAVORITES,
          payload: mockFavorites,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: AppActionType.SET_FAVORITES_LOADED,
          payload: true,
        });
      });
  });

  it(`When request error`, () => {
    apiMock
      .onGet(`/favorite`)
      .reply(200, undefined);

    return loader(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
      });
  });
});

describe(`Should make a correct API call to send review`, () => {
  it(`When data is correct`, () => {
    const dispatch = jest.fn();
    const offerID: number = 1;
    const loader = Operation.sendReview(offerID, 5, `comment`);

    apiMock
      .onPost(`/comments/${offerID}`)
      .reply(200, mockReviews);

    return loader(dispatch, getMockState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: DataActionType.SET_REVIEWS,
          payload: mockReviewsTransformed,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: AppActionType.SET_REVIEW_SENDING,
          payload: FormSendingStatus.SUCCESS,
        });
      });
  });

  it(`When data is not correct`, () => {
    const dispatch = jest.fn();
    const offerID: number = 1;
    const loader = Operation.sendReview(offerID, null, ``);

    apiMock
      .onPost(`/comments/${offerID}`)
      .reply(200, undefined);

    return loader(dispatch, getMockState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: AppActionType.SET_REVIEW_SENDING,
          payload: FormSendingStatus.READY,
        });
      });
  });
});

describe(`Should make a correct API call to toggle favorite status`, () => {
  const dispatch = jest.fn();
  const handleLoadFavorites = jest.fn();
  const offerID: number = 1;
  const setFavorite = Operation.toggleFavorite(offerID, false);
  const removeFavorite = Operation.toggleFavorite(offerID, true);

  describe(`On favorite set`, () => {
    it(`Success`, () => {
      Operation.loadFavorites = () => handleLoadFavorites;

      apiMock
        .onPost(`/favorite/${offerID}/${FavoriteStatus.TRUE}`).reply(200, {id: offerID, is_favorite: true});

      return setFavorite(dispatch, getMockState, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(2);
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: DataActionType.UPDATE_OFFER,
            payload: {id: offerID, is_favorite: true},
          });
          expect(dispatch).toHaveBeenNthCalledWith(2, handleLoadFavorites);
        });
    });

    it(`Error`, () => {
      apiMock
        .onPost(`/favorite/${offerID}/${FavoriteStatus.TRUE}`).reply(200, undefined);

      return setFavorite(dispatch, getMockState, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(2);
        });
    });
  });

  describe(`On favorite remove`, () => {
    it(`Success`, () => {
      Operation.loadFavorites = () => handleLoadFavorites;

      apiMock
        .onPost(`/favorite/${offerID}/${FavoriteStatus.FALSE}`).reply(200, {id: offerID, is_favorite: false});

      return removeFavorite(dispatch, getMockState, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(4);
          expect(dispatch).toHaveBeenNthCalledWith(3, {
            type: DataActionType.UPDATE_OFFER,
            payload: {id: offerID, is_favorite: false},
          });
          expect(dispatch).toHaveBeenNthCalledWith(4, handleLoadFavorites);
        });
    });

    it(`Error`, () => {
      apiMock
        .onPost(`/favorite/${offerID}/${FavoriteStatus.FALSE}`).reply(200, undefined);

      return removeFavorite(dispatch, getMockState, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(4);
        });
    });
  });
});

describe(`Should make a correct API call to sign in`, () => {
  const dispatch = jest.fn();
  const handleLoadOffers = jest.fn();
  const handleLoadFavorites = jest.fn();
  const loader = Operation.signIn();

  it(`When authorization success`, () => {
    Operation.loadOffers = () => handleLoadOffers;
    Operation.loadFavorites = () => handleLoadFavorites;

    apiMock
      .onPost(`/login`)
      .reply(200, mockUser);

    return loader(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: UserActionType.SET_USER,
          payload: mockUser,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: UserActionType.SET_AUTHORIZATION_REQUIRED,
          payload: false,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, handleLoadOffers);
        expect(dispatch).toHaveBeenNthCalledWith(4, handleLoadFavorites);
      });
  });

  it(`When authorization error`, () => {
    apiMock
      .onPost(`/login`)
      .reply(200, undefined);

    return loader(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(4);
      });
  });
});

describe(`Should make a correct API call to check authorization`, () => {
  const dispatch = jest.fn();
  const handleLoadOffers = jest.fn();
  const handleLoadFavorites = jest.fn();
  const loader = Operation.getUser();

  it(`When user is authorized`, () => {
    Operation.loadOffers = () => handleLoadOffers;
    Operation.loadFavorites = () => handleLoadFavorites;

    apiMock
      .onGet(`/login`)
      .reply(200, mockUser);

    return loader(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: UserActionType.SET_USER,
          payload: mockUser,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, handleLoadFavorites);
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: UserActionType.SET_AUTHORIZATION_REQUIRED,
          payload: false,
        });
        expect(dispatch).toHaveBeenNthCalledWith(4, handleLoadOffers);
      });
  });

  it(`When user is not authorized`, () => {
    Operation.loadOffers = () => handleLoadOffers;

    apiMock
      .onGet(`/login`)
      .reply(200, undefined);

    return loader(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(5);
        expect(dispatch).toHaveBeenCalledWith(handleLoadOffers);
      });
  });
});

describe(`withAuthCheck`, () => {
  const handleIsAuthorized = jest.fn();

  it(`Redirects to login page if authorization required`, () => {
    history.push = jest.fn();
    withAuthCheck(getMockState(true), handleIsAuthorized);

    expect(handleIsAuthorized).toHaveBeenCalledTimes(0);
    expect(history.push).toHaveBeenCalledTimes(1);
    expect(history.push.mock.calls[0]).toEqual([Path.LOGIN]);
  });

  it(`Calls callback if user is authorized`, () => {
    withAuthCheck(getMockState(), handleIsAuthorized);
    expect(handleIsAuthorized).toHaveBeenCalledTimes(1);
  });
});
