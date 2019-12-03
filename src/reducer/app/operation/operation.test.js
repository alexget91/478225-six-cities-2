import MockAdapter from "axios-mock-adapter";
import configureAPI from "../../../api";
import Operation from "./operation";
import {ActionTypes as UserActionTypes} from "../../user/reducer/reducer";
import {ActionTypes as AppActionTypes} from "../reducer/reducer";
import {getMockOfferFields, getMockOfferFieldsTransformed} from "../../../common/test-stubs";

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
        type: AppActionTypes.SET_OFFERS,
        payload: mockOffersTransformed,
      });
      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: AppActionTypes.SET_OFFERS_LOADED,
        payload: true,
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
        type: AppActionTypes.UPDATE_OFFER,
        payload: {id: offerID, isFavorite: true},
      });
    }));

  it(`On favorite remove`, () => removeFavorite(dispatch, null, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenCalledWith({
        type: AppActionTypes.UPDATE_OFFER,
        payload: {id: offerID, isFavorite: false},
      });
    }));
});
