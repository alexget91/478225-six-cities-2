import {ActionCreator, ActionTypes, reducer, transformOfferData, transformOffersList, updateOffer} from "./reducer";
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

describe(`Offers list transformation works correctly`, () => {
  it(`Offer data transformation works correctly`, () => {
    expect(transformOfferData(mockOffer)).toEqual(mockOfferTransformed);
  });

  it(`Offer list transformation works correctly`, () => {
    expect(transformOffersList(mockOffers)).toEqual(mockOffersTransformed);
  });

  it(`Update offer in list works correctly`, () => {
    expect(updateOffer([{id: 1}, {id: 2}], mockOffer)).toEqual([mockOfferTransformed, {id: 2}]);
  });
});

describe(`App action creators works correctly`, () => {
  it(`App action creator for set offers returns correct action`, () => {
    expect(ActionCreator.setOffers(mockOffers)).toEqual({
      type: ActionTypes.SET_OFFERS,
      payload: mockOffersTransformed,
    });
  });

  it(`App action creator for set "offers is loaded" returns correct action`, () => {
    expect(ActionCreator.setOffersLoaded(true)).toEqual({
      type: ActionTypes.SET_OFFERS_LOADED,
      payload: true,
    });
  });

  it(`App action creator for update offer returns correct action`, () => {
    expect(ActionCreator.updateOffer({foo: `bar`})).toEqual({
      type: ActionTypes.UPDATE_OFFER,
      payload: {foo: `bar`},
    });
  });
});

describe(`App reducer works correctly`, () => {
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
    isOffersLoaded: false,
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

  it(`App reducer should set "offers is loaded" correctly`, () => {
    expect(reducer(mockInitialState, {
      type: ActionTypes.SET_OFFERS_LOADED,
      payload: true,
    })).toEqual(Object.assign({}, mockInitialState, {
      isOffersLoaded: true,
    }));
  });

  it(`App reducer should update offer correctly`, () => {
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
