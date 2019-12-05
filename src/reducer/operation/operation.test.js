import MockAdapter from "axios-mock-adapter";
import configureAPI from "../../api";
import Operation from "./operation";
import {ActionTypes as AppActionTypes} from "../app/reducer/reducer";
import {ActionTypes as DataActionTypes} from "../data/reducer/reducer";
import {ActionTypes as UserActionTypes} from "../user/reducer/reducer";
import {getMockOfferFields, getMockOfferFieldsTransformed} from "../../common/test-stubs";
import {FormSendingStatus} from "../../common/constants";

const mockOffers = [
  getMockOfferFields(1, `Amsterdam`),
  getMockOfferFields(2, `Amsterdam`),
  getMockOfferFields(3, `Hamburg`),
];

const mockOffersTransformed = [
  getMockOfferFieldsTransformed(1, `Amsterdam`),
  getMockOfferFieldsTransformed(2, `Amsterdam`),
  getMockOfferFieldsTransformed(3, `Hamburg`),
];

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

const mockReviews = [
  {
    id: 2,
    user: {
      "is_pro": false,
      "avatar_url": ``
    },
    date: `2019-04-08T11:14:58.569Z`
  },
  {
    id: 3,
    user: {
      "is_pro": false,
      "avatar_url": ``
    },
    date: `2019-06-08T11:14:58.569Z`
  },
];

const mockReviewsTransformed = [
  {
    id: 3,
    user: {
      isPro: false,
      avatarUrl: ``
    },
    date: `2019-06-08T11:14:58.569Z`
  },
  {
    id: 2,
    user: {
      isPro: false,
      avatarUrl: ``
    },
    date: `2019-04-08T11:14:58.569Z`
  },
];

const api = configureAPI();
const apiMock = new MockAdapter(api);

it(`Should make a correct API call to get hotels`, () => {
  const dispatch = jest.fn();
  const loader = Operation.loadOffers();

  apiMock
    .onGet(`/hotels`)
    .reply(200, mockOffers);

  return loader(dispatch, null, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: UserActionTypes.SET_CITY,
        payload: `Amsterdam`,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: DataActionTypes.SET_OFFERS,
        payload: mockOffersTransformed,
      });
      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: AppActionTypes.SET_OFFERS_LOADED,
        payload: true,
      });
    });
});

it(`Should make a correct API call to get reviews`, () => {
  const dispatch = jest.fn();
  const offerID = 1;
  const loader = Operation.loadReviews(offerID);

  apiMock
    .onGet(`/comments/${offerID}`)
    .reply(200, mockReviews);

  return loader(dispatch, null, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: DataActionTypes.SET_REVIEWS,
        payload: mockReviewsTransformed,
      });
    });
});

describe(`Should make a correct API call to send review`, () => {
  it(`When data is correct`, () => {
    const dispatch = jest.fn();
    const offerID = 1;
    const loader = Operation.sendReview(offerID, 5, `comment`);

    apiMock
      .onPost(`/comments/${offerID}`)
      .reply(200, mockReviews);

    return loader(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: DataActionTypes.SET_REVIEWS,
          payload: mockReviewsTransformed,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: AppActionTypes.SET_REVIEW_SENDING,
          payload: FormSendingStatus.SUCCESS,
        });
      });
  });

  it(`When data is not correct`, () => {
    const dispatch = jest.fn();
    const offerID = 1;
    const loader = Operation.sendReview(offerID, null, ``);

    apiMock
      .onPost(`/comments/${offerID}`)
      .reply(200, undefined);

    return loader(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: AppActionTypes.SET_REVIEW_SENDING,
          payload: FormSendingStatus.READY,
        });
      });
  });
});

describe(`Should make a correct API call to toggle favorite status`, () => {
  const dispatch = jest.fn();
  const offerID = 1;
  const setFavorite = Operation.toggleFavorite(offerID, false);
  const removeFavorite = Operation.toggleFavorite(offerID, true);

  apiMock
    .onPost(`/favorite/${offerID}/1`).reply(200, {id: offerID, isFavorite: true})
    .onPost(`/favorite/${offerID}/0`).reply(200, {id: offerID, isFavorite: false});

  it(`On favorite set`, () => setFavorite(dispatch, null, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: DataActionTypes.UPDATE_OFFER,
        payload: {id: offerID, isFavorite: true},
      });
    }));

  it(`On favorite remove`, () => removeFavorite(dispatch, null, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenCalledWith({
        type: DataActionTypes.UPDATE_OFFER,
        payload: {id: offerID, isFavorite: false},
      });
    }));
});

it(`Should make a correct API call to sign in`, () => {
  const dispatch = jest.fn();
  const loader = Operation.signIn();

  apiMock
    .onPost(`/login`)
    .reply(200, mockUser);

  return loader(dispatch, null, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: UserActionTypes.SET_USER,
        payload: mockUserTransformed,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: UserActionTypes.SET_AUTHORIZATION_REQUIRED,
        payload: false,
      });
    });
});
