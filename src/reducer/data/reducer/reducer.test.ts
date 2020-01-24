import {
  ActionType,
  ActionCreator,
  transformReviewsList,
  updateOffer,
  reducer,
  State,
} from "./reducer";
import {getMockOffer} from "../../../common/test-stubs";
import {PlaceCard, PlaceList, ReviewsList} from "../../../common/types";

const mockOffers: PlaceList = [
  getMockOffer(1, `Amsterdam`),
  getMockOffer(2, `Amsterdam`),
  getMockOffer(3, `Hamburg`),
];

const mockOffer: PlaceCard = getMockOffer(1, `city`);

const mockReviews: ReviewsList = [
  {
    id: 1,
    user: {
      id: 0,
      name: ``,
      is_pro: false,
      avatar_url: ``
    },
    rating: 0,
    comment: ``,
    date: `2019-05-08T14:13:56.569Z`
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
    id: 4,
    user: {
      id: 0,
      name: ``,
      is_pro: false,
      avatar_url: ``
    },
    rating: 0,
    comment: ``,
    date: `2019-01-08T11:14:58.569Z`
  },
  {
    id: 5,
    user: {
      id: 0,
      name: ``,
      is_pro: false,
      avatar_url: ``
    },
    rating: 0,
    comment: ``,
    date: `2019-03-08T11:15:58.569Z`
  },
  {
    id: 6,
    user: {
      id: 0,
      name: ``,
      is_pro: false,
      avatar_url: ``
    },
    rating: 0,
    comment: ``,
    date: `2019-08-08T11:14:58.569Z`
  },
  {
    id: 7,
    user: {
      id: 0,
      name: ``,
      is_pro: false,
      avatar_url: ``
    },
    rating: 0,
    comment: ``,
    date: `2019-02-08T11:14:58.569Z`
  },
  {
    id: 8,
    user: {
      id: 0,
      name: ``,
      is_pro: false,
      avatar_url: ``
    },
    rating: 0,
    comment: ``,
    date: `2018-04-08T11:14:58.569Z`
  },
  {
    id: 9,
    user: {
      id: 0,
      name: ``,
      is_pro: false,
      avatar_url: ``
    },
    rating: 0,
    comment: ``,
    date: `2019-09-08T11:14:58.569Z`
  },
  {
    id: 10,
    user: {
      id: 0,
      name: ``,
      is_pro: false,
      avatar_url: ``
    },
    rating: 0,
    comment: ``,
    date: `2018-03-08T11:14:58.569Z`
  },
  {
    id: 11,
    user: {
      id: 0,
      name: ``,
      is_pro: false,
      avatar_url: ``
    },
    rating: 0,
    comment: ``,
    date: `2019-03-08T11:14:58.569Z`
  },
  {
    id: 12,
    user: {
      id: 0,
      name: ``,
      is_pro: false,
      avatar_url: ``
    },
    rating: 0,
    comment: ``,
    date: `2019-05-08T11:14:58.569Z`
  },
];

const mockReviewsTransformed: ReviewsList = [
  {
    id: 9,
    user: {
      id: 0,
      name: ``,
      is_pro: false,
      avatar_url: ``
    },
    rating: 0,
    comment: ``,
    date: `2019-09-08T11:14:58.569Z`
  },
  {
    id: 6,
    user: {
      id: 0,
      name: ``,
      is_pro: false,
      avatar_url: ``
    },
    rating: 0,
    comment: ``,
    date: `2019-08-08T11:14:58.569Z`
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
  {
    id: 1,
    user: {
      id: 0,
      name: ``,
      is_pro: false,
      avatar_url: ``
    },
    rating: 0,
    comment: ``,
    date: `2019-05-08T14:13:56.569Z`
  },
  {
    id: 12,
    user: {
      id: 0,
      name: ``,
      is_pro: false,
      avatar_url: ``
    },
    rating: 0,
    comment: ``,
    date: `2019-05-08T11:14:58.569Z`
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
  {
    id: 5,
    user: {
      id: 0,
      name: ``,
      is_pro: false,
      avatar_url: ``
    },
    rating: 0,
    comment: ``,
    date: `2019-03-08T11:15:58.569Z`
  },
  {
    id: 11,
    user: {
      id: 0,
      name: ``,
      is_pro: false,
      avatar_url: ``
    },
    rating: 0,
    comment: ``,
    date: `2019-03-08T11:14:58.569Z`
  },
  {
    id: 7,
    user: {
      id: 0,
      name: ``,
      is_pro: false,
      avatar_url: ``
    },
    rating: 0,
    comment: ``,
    date: `2019-02-08T11:14:58.569Z`
  },
  {
    id: 4,
    user: {
      id: 0,
      name: ``,
      is_pro: false,
      avatar_url: ``
    },
    rating: 0,
    comment: ``,
    date: `2019-01-08T11:14:58.569Z`
  },
];

describe(`Data transformation works correctly`, () => {
  it(`Reviews list transformation works correctly`, () => {
    expect(transformReviewsList(mockReviews)).toEqual(mockReviewsTransformed);
  });

  it(`Update offer in list works correctly`, () => {
    expect(updateOffer([
      getMockOffer(1, `Amsterdam`),
      getMockOffer(2, `Amsterdam`),
    ], mockOffer)).toEqual([
      mockOffer,
      getMockOffer(2, `Amsterdam`),
    ]);
  });
});

describe(`Data action creators works correctly`, () => {
  it(`Data action creator for set offers returns correct action`, () => {
    expect(ActionCreator.setOffers(mockOffers)).toEqual({
      type: ActionType.SET_OFFERS,
      payload: mockOffers,
    });
  });

  it(`Data action creator for set reviews returns correct action`, () => {
    expect(ActionCreator.setReviews(mockReviews)).toEqual({
      type: ActionType.SET_REVIEWS,
      payload: mockReviewsTransformed,
    });
  });

  it(`Data action creator for set favorites returns correct action`, () => {
    expect(ActionCreator.setFavorites(mockOffers)).toEqual({
      type: ActionType.SET_FAVORITES,
      payload: mockOffers,
    });
  });

  it(`Data action creator for update offer returns correct action`, () => {
    expect(ActionCreator.updateOffer(mockOffer)).toEqual({
      type: ActionType.UPDATE_OFFER,
      payload: mockOffer,
    });
  });
});

describe(`Data reducer works correctly`, () => {
  const mockInitialState: State = {
    offers: [
      getMockOffer(1, `city1`, false),
      getMockOffer(2, `city2`, false),
    ],
    reviews: [],
    favorites: [],
  };

  it(`Data reducer without action should return current state`, () => {
    expect(reducer(mockInitialState, {
      type: null,
      payload: null,
    })).toEqual(mockInitialState);
  });

  it(`Data reducer should set given value as offers`, () => {
    expect(reducer(mockInitialState, {
      type: ActionType.SET_OFFERS,
      payload: mockOffers
    })).toEqual(Object.assign({}, mockInitialState, {
      offers: mockOffers,
    }));
  });

  it(`Data reducer should set given value as reviews`, () => {
    expect(reducer(mockInitialState, {
      type: ActionType.SET_REVIEWS,
      payload: mockReviewsTransformed
    })).toEqual(Object.assign({}, mockInitialState, {
      reviews: mockReviewsTransformed,
    }));
  });

  it(`Data reducer should set given value as favorites`, () => {
    expect(reducer(mockInitialState, {
      type: ActionType.SET_FAVORITES,
      payload: mockOffers
    })).toEqual(Object.assign({}, mockInitialState, {
      favorites: mockOffers,
    }));
  });

  it(`Data reducer should update offer correctly`, () => {
    expect(reducer(mockInitialState, {
      type: ActionType.UPDATE_OFFER,
      payload: mockOffer,
    })).toEqual(Object.assign({}, mockInitialState, {
      offers: [
        mockOffer,
        getMockOffer(2, `city2`, false),
      ],
    }));
  });
});
