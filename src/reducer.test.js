import {ActionCreator, ActionTypes, getOffersByCities, Operation, reducer, transformOfferData} from "./reducer";
import configureAPI from "./api";
import MockAdapter from "axios-mock-adapter";

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


describe(`Offers list transformation works correctly`, () => {
  it(`Offer data transformation works correctly`, () => {
    expect(transformOfferData({
      "preview_image": `preview_image`,
      "is_favorite": `is_favorite`,
      "is_premium": `is_premium`,
      "max_adults": `max_adults`,
      "price": `price`,
      "host": {
        "is_pro": `is_pro`,
        "avatar_url": `avatar_url`,
        "foo": `bar`,
      },
      "foo": `bar`,
    })).toEqual({
      previewImage: `preview_image`,
      isFavorite: `is_favorite`,
      isPremium: `is_premium`,
      maxAdults: `max_adults`,
      priceByNight: `price`,
      host: {
        isPro: `is_pro`,
        avatarUrl: `avatar_url`,
        foo: `bar`,
      },
      foo: `bar`,
    });
  });

  it(`Breakdown of offers by city works correctly`, () => {
    expect(getOffersByCities(mockOffers)).toEqual(mockOffersTransformed);
  });
});

describe(`Action creators works correctly`, () => {
  it(`Action creator for set the city returns correct action`, () => {
    expect(ActionCreator.setCity(`Paris`)).toEqual({
      type: ActionTypes.SET_CITY,
      payload: `Paris`
    });
  });

  it(`Action creator for set offers returns correct action`, () => {
    expect(ActionCreator.setOffers(mockOffers)).toEqual({
      type: ActionTypes.SET_OFFERS,
      payload: mockOffersTransformed,
    });
  });
});

describe(`Reducer works correctly`, () => {
  it(`Reducer without action should return current state`, () => {
    expect(reducer({
      city: `Hamburg`,
      offers: mockOffersTransformed,
    }, {})).toEqual({
      city: `Hamburg`,
      offers: mockOffersTransformed,
    });
  });

  it(`Reducer should set given value as city`, () => {
    expect(reducer({
      city: `Hamburg`,
      offers: mockOffersTransformed,
    }, {
      type: ActionTypes.SET_CITY,
      payload: `Paris`
    })).toEqual({
      city: `Paris`,
      offers: mockOffersTransformed,
    });
  });

  it(`Reducer should set given value as offers`, () => {
    expect(reducer({
      city: `Hamburg`,
      offers: {
        Paris: {
          city: {
            name: `Paris`,
          },
          offers: [
            {
              id: 4,
            },
          ],
        },
      },
    }, {
      type: ActionTypes.SET_OFFERS,
      payload: mockOffersTransformed
    })).toEqual({
      city: `Hamburg`,
      offers: mockOffersTransformed,
    });
  });

  it(`Should make a correct API call to /hotels`, () => {
    const api = configureAPI();
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = Operation.loadOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(200, mockOffers);

    return offersLoader(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionTypes.SET_CITY,
          payload: `Amsterdam`,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionTypes.SET_OFFERS,
          payload: mockOffersTransformed,
        });
      });
  });
});
