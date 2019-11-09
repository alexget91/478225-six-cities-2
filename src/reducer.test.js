import {ActionCreator, getOffersInCity, reducer} from "./reducer";

const mockOffers = [
  {
    id: 1,
    city: {
      name: `Amsterdam`,
    },
  },
  {
    id: 2,
    city: {
      name: `Amsterdam`,
    },
  },
  {
    id: 3,
    city: {
      name: `Hamburg`,
    },
  }
];


describe(`Getting a list of offers in the city works correctly`, () => {
  it(`In an existing city`, () => {
    expect(getOffersInCity(`Hamburg`, mockOffers)).toEqual([
      {
        id: 3,
        city: {
          name: `Hamburg`,
        },
      }
    ]);
  });

  it(`In a nonexistent city`, () => {
    expect(getOffersInCity(`1`, mockOffers)).toEqual([]);
  });
});

describe(`Action creators works correctly`, () => {
  it(`Action creator for set the city returns correct action`, () => {
    expect(ActionCreator.setCity(`Paris`)).toEqual({
      type: `SET_CITY`,
      payload: `Paris`
    });
  });

  it(`Action creator for set offers in an existing city returns correct action`, () => {
    expect(ActionCreator.setOffers(`Amsterdam`, mockOffers)).toEqual({
      type: `SET_OFFERS`,
      payload: [
        {
          id: 1,
          city: {
            name: `Amsterdam`,
          },
        },
        {
          id: 2,
          city: {
            name: `Amsterdam`,
          },
        }
      ],
    });
  });

  it(`Action creator for set offers in a nonexistent city returns correct action`, () => {
    expect(ActionCreator.setOffers(`1`, mockOffers)).toEqual({
      type: `SET_OFFERS`,
      payload: []
    });
  });
});

describe(`Reducer works correctly`, () => {
  it(`Reducer without action should return current state`, () => {
    expect(reducer({
      city: `Hamburg`,
      offers: [{
        id: 3,
        city: {
          name: `Hamburg`,
        },
      }],
    }, {})).toEqual({
      city: `Hamburg`,
      offers: [{
        id: 3,
        city: {
          name: `Hamburg`,
        },
      }],
    });
  });

  it(`Reducer should set given value as city`, () => {
    expect(reducer({
      city: `Hamburg`,
      offers: [{
        id: 3,
        city: {
          name: `Hamburg`,
        },
      }],
    }, {
      type: `SET_CITY`,
      payload: `Paris`
    })).toEqual({
      city: `Paris`,
      offers: [{
        id: 3,
        city: {
          name: `Hamburg`,
        },
      }],
    });
  });

  it(`Reducer should set given value as offers`, () => {
    expect(reducer({
      city: `Hamburg`,
      offers: [{
        id: 3,
        city: {
          name: `Hamburg`,
        },
      }],
    }, {
      type: `SET_OFFERS`,
      payload: [{
        id: 1,
        city: {
          name: `Amsterdam`,
        },
      }]
    })).toEqual({
      city: `Hamburg`,
      offers: [{
        id: 1,
        city: {
          name: `Amsterdam`,
        },
      }],
    });
  });
});
