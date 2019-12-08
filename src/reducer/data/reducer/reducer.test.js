import {
  transformUserData,
  transformOfferData,
  transformOffersList,
  transformReviewsList,
  ActionTypes,
  ActionCreator,
  updateOffer,
  reducer,
} from "./reducer";
import {getMockOfferFields, getMockOfferFieldsTransformed} from "../../../common/test-stubs";

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

const mockOffersTransformed = [
  {
    id: 1,
    city: {
      name: `Amsterdam`,
    },
    host: {
      "isPro": false,
      "avatarUrl": ``,
    },
  },
  {
    id: 2,
    city: {
      name: `Amsterdam`,
    },
    host: {
      "isPro": false,
      "avatarUrl": ``,
    },
  },
  {
    id: 3,
    city: {
      name: `Hamburg`,
    },
    host: {
      "isPro": false,
      "avatarUrl": ``,
    },
  }
];

const mockOffer = getMockOfferFields(1, `city`);
const mockOfferTransformed = getMockOfferFieldsTransformed(1, `city`);

const mockUser = {
  "is_pro": `is_pro`,
  "avatar_url": `avatar_url`,
  "foo": `bar`,
};

const mockUserTransformed = {
  isPro: `is_pro`,
  avatarUrl: `avatar_url`,
  foo: `bar`,
};

const mockReviews = [
  {
    id: 1,
    user: {
      "is_pro": false,
      "avatar_url": ``
    },
    date: `2019-05-08T14:13:56.569Z`
  },
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
  {
    id: 4,
    user: {
      "is_pro": false,
      "avatar_url": ``
    },
    date: `2019-01-08T11:14:58.569Z`
  },
  {
    id: 5,
    user: {
      "is_pro": false,
      "avatar_url": ``
    },
    date: `2019-03-08T11:15:58.569Z`
  },
  {
    id: 6,
    user: {
      "is_pro": false,
      "avatar_url": ``
    },
    date: `2019-08-08T11:14:58.569Z`
  },
  {
    id: 7,
    user: {
      "is_pro": false,
      "avatar_url": ``
    },
    date: `2019-02-08T11:14:58.569Z`
  },
  {
    id: 8,
    user: {
      "is_pro": false,
      "avatar_url": ``
    },
    date: `2018-04-08T11:14:58.569Z`
  },
  {
    id: 9,
    user: {
      "is_pro": false,
      "avatar_url": ``
    },
    date: `2019-09-08T11:14:58.569Z`
  },
  {
    id: 10,
    user: {
      "is_pro": false,
      "avatar_url": ``
    },
    date: `2018-03-08T11:14:58.569Z`
  },
  {
    id: 11,
    user: {
      "is_pro": false,
      "avatar_url": ``
    },
    date: `2019-03-08T11:14:58.569Z`
  },
  {
    id: 12,
    user: {
      "is_pro": false,
      "avatar_url": ``
    },
    date: `2019-05-08T11:14:58.569Z`
  },
];

const mockReviewsTransformed = [
  {
    id: 9,
    user: {
      isPro: false,
      avatarUrl: ``
    },
    date: `2019-09-08T11:14:58.569Z`
  },
  {
    id: 6,
    user: {
      isPro: false,
      avatarUrl: ``
    },
    date: `2019-08-08T11:14:58.569Z`
  },
  {
    id: 3,
    user: {
      isPro: false,
      avatarUrl: ``
    },
    date: `2019-06-08T11:14:58.569Z`
  },
  {
    id: 1,
    user: {
      isPro: false,
      avatarUrl: ``
    },
    date: `2019-05-08T14:13:56.569Z`
  },
  {
    id: 12,
    user: {
      isPro: false,
      avatarUrl: ``
    },
    date: `2019-05-08T11:14:58.569Z`
  },
  {
    id: 2,
    user: {
      isPro: false,
      avatarUrl: ``
    },
    date: `2019-04-08T11:14:58.569Z`
  },
  {
    id: 5,
    user: {
      isPro: false,
      avatarUrl: ``
    },
    date: `2019-03-08T11:15:58.569Z`
  },
  {
    id: 11,
    user: {
      isPro: false,
      avatarUrl: ``
    },
    date: `2019-03-08T11:14:58.569Z`
  },
  {
    id: 7,
    user: {
      isPro: false,
      avatarUrl: ``
    },
    date: `2019-02-08T11:14:58.569Z`
  },
  {
    id: 4,
    user: {
      isPro: false,
      avatarUrl: ``
    },
    date: `2019-01-08T11:14:58.569Z`
  },
];

describe(`Data transformation works correctly`, () => {
  it(`User data transformation works correctly`, () => {
    expect(transformUserData(mockUser)).toEqual(mockUserTransformed);
  });

  it(`Offer data transformation works correctly`, () => {
    expect(transformOfferData(mockOffer)).toEqual(mockOfferTransformed);
  });

  it(`Offers list transformation works correctly`, () => {
    expect(transformOffersList(mockOffers)).toEqual(mockOffersTransformed);
  });

  it(`Reviews list transformation works correctly`, () => {
    expect(transformReviewsList(mockReviews)).toEqual(mockReviewsTransformed);
  });

  it(`Update offer in list works correctly`, () => {
    expect(updateOffer([{id: 1}, {id: 2}], mockOffer)).toEqual([mockOfferTransformed, {id: 2}]);
  });
});

describe(`Data action creators works correctly`, () => {
  it(`Data action creator for set offers returns correct action`, () => {
    expect(ActionCreator.setOffers(mockOffers)).toEqual({
      type: ActionTypes.SET_OFFERS,
      payload: mockOffersTransformed,
    });
  });

  it(`Data action creator for set reviews returns correct action`, () => {
    expect(ActionCreator.setReviews(mockReviews)).toEqual({
      type: ActionTypes.SET_REVIEWS,
      payload: mockReviewsTransformed,
    });
  });

  it(`Data action creator for set favorites returns correct action`, () => {
    expect(ActionCreator.setFavorites(mockOffers)).toEqual({
      type: ActionTypes.SET_FAVORITES,
      payload: mockOffersTransformed,
    });
  });

  it(`Data action creator for update offer returns correct action`, () => {
    expect(ActionCreator.updateOffer({foo: `bar`})).toEqual({
      type: ActionTypes.UPDATE_OFFER,
      payload: {foo: `bar`},
    });
  });
});

describe(`Data reducer works correctly`, () => {
  const mockInitialState = {
    offers: [
      {
        id: 1,
        isFavorite: false,
      },
      {
        id: 2,
        isFavorite: false,
      },
    ],
    reviews: [],
    favorites: [],
  };

  it(`Data reducer without action should return current state`, () => {
    expect(reducer(mockInitialState, {})).toEqual(mockInitialState);
  });

  it(`Data reducer should set given value as offers`, () => {
    expect(reducer(mockInitialState, {
      type: ActionTypes.SET_OFFERS,
      payload: mockOffersTransformed
    })).toEqual(Object.assign({}, mockInitialState, {
      offers: mockOffersTransformed,
    }));
  });

  it(`Data reducer should set given value as reviews`, () => {
    expect(reducer(mockInitialState, {
      type: ActionTypes.SET_REVIEWS,
      payload: mockReviewsTransformed
    })).toEqual(Object.assign({}, mockInitialState, {
      reviews: mockReviewsTransformed,
    }));
  });

  it(`Data reducer should set given value as favorites`, () => {
    expect(reducer(mockInitialState, {
      type: ActionTypes.SET_FAVORITES,
      payload: mockOffersTransformed
    })).toEqual(Object.assign({}, mockInitialState, {
      favorites: mockOffersTransformed,
    }));
  });

  it(`Data reducer should update offer correctly`, () => {
    expect(reducer(mockInitialState, {
      type: ActionTypes.UPDATE_OFFER,
      payload: Object.assign({}, mockOffer, {
        "id": 2,
        "is_favorite": true,
      }),
    })).toEqual(Object.assign({}, mockInitialState, {
      offers: [
        {
          id: 1,
          isFavorite: false,
        },
        Object.assign({}, mockOfferTransformed, {
          id: 2,
          isFavorite: true,
        }),
      ],
    }));
  });
});
