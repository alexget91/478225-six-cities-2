import {ActionCreator, ActionTypes, reducer, transformOfferData, transformOffersList} from "./reducer";

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
  allOffers: {
    1: {
      id: 1,
      city: {
        name: `Amsterdam`,
      },
      host: {
        isPro: false,
        avatarUrl: ``,
      },
    },
    2: {
      id: 2,
      city: {
        name: `Amsterdam`,
      },
      host: {
        isPro: false,
        avatarUrl: ``,
      },
    },
    3: {
      id: 3,
      city: {
        name: `Hamburg`,
      },
      host: {
        isPro: false,
        avatarUrl: ``,
      },
    },
  },
  offersByCities: {
    Amsterdam: [
      {
        id: 1,
        city: {
          name: `Amsterdam`,
        },
        host: {
          isPro: false,
          avatarUrl: ``,
        },
      },
      {
        id: 2,
        city: {
          name: `Amsterdam`,
        },
        host: {
          isPro: false,
          avatarUrl: ``,
        },
      },
    ],
    Hamburg: [
      {
        id: 3,
        city: {
          name: `Hamburg`,
        },
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
      "city": `city`,
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
      city: `city`,
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

  it(`Offer list transformation works correctly`, () => {
    expect(transformOffersList(mockOffers)).toEqual(mockOffersTransformed);
  });
});

describe(`App action creators works correctly`, () => {
  it(`App action creator for set offers returns correct action`, () => {
    expect(ActionCreator.setOffers(mockOffers)).toEqual({
      type: ActionTypes.SET_OFFERS,
      payload: mockOffersTransformed,
    });
  });

  it(`App action creator for set cities returns correct action`, () => {
    expect(ActionCreator.setCities()).toEqual({
      type: ActionTypes.SET_CITIES,
    });
  });
});

describe(`App reducer works correctly`, () => {
  const mockInitialState = {
    offers: {},
    cities: [],
  };

  it(`App reducer without action should return current state`, () => {
    expect(reducer(mockInitialState, {})).toEqual(mockInitialState);
  });

  it(`App reducer should set given value as offers`, () => {
    expect(reducer(mockInitialState, {
      type: ActionTypes.SET_OFFERS,
      payload: mockOffersTransformed
    })).toEqual(Object.assign({}, mockInitialState, {
      offers: mockOffersTransformed,
    }));
  });

  it(`App reducer should set cities correctly`, () => {
    const mockState = {
      offers: {
        allOffers: {
          1: {foo: `bar`}
        },
        offersByCities: {
          city1: [{foo: `bar`}],
          city2: []
        },
      },
      cities: [],
    };

    expect(reducer(mockState, {
      type: ActionTypes.SET_CITIES,
    })).toEqual(Object.assign({}, mockState, {
      cities: [`city1`, `city2`],
    }));
  });
});
