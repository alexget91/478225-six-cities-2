import {ActionCreator, ActionTypes, reducer, getOffersByCities, transformOfferData} from "./reducer";

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

describe(`App action creators works correctly`, () => {
  it(`App action creator for set offers returns correct action`, () => {
    expect(ActionCreator.setOffers(mockOffers)).toEqual({
      type: ActionTypes.SET_OFFERS,
      payload: mockOffersTransformed,
    });
  });
});

describe(`App reducer works correctly`, () => {
  it(`App reducer without action should return current state`, () => {
    expect(reducer({
      offers: mockOffersTransformed,
    }, {})).toEqual({
      offers: mockOffersTransformed,
    });
  });

  it(`App reducer should set given value as offers`, () => {
    expect(reducer({
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
      offers: mockOffersTransformed,
    });
  });
});
