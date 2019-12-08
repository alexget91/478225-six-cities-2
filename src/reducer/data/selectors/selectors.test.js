import {
  getOffers,
  getReviews,
  getFavorites,
  getCities,
  getOffersInCity,
  getOfferByID,
  getOffersByCities,
} from "./selectors";
import NameSpace from "../../name-space";

const mockOffers = [
  {
    id: 1,
    city: {name: `city1`},
  },
  {
    id: 2,
    city: {name: `city1`},
  },
  {
    id: 3,
    city: {name: `city2`},
  },
];

const mockFavorites = [{
  id: 2,
  city: {name: `city1`},
}];

const mockReviews = [{id: 1}];

const mockState = {
  [NameSpace.DATA]: {
    offers: mockOffers,
    reviews: mockReviews,
    favorites: mockFavorites,
  },
};

it(`Offers selector returns correct offers from state`, () => {
  expect(getOffers(mockState)).toEqual(mockOffers);
});

it(`Reviews selector returns correct offers from state`, () => {
  expect(getReviews(mockState)).toEqual(mockReviews);
});

it(`Favorites selector returns correct offers from state`, () => {
  expect(getFavorites(mockState)).toEqual(mockFavorites);
});

it(`Cities selector returns correct cities from state`, () => {
  expect(getCities(mockOffers)).toEqual([`city1`, `city2`]);
});

it(`Offers in city selector returns correct offers from state`, () => {
  expect(getOffersInCity(mockOffers, `city1`)).toEqual([{
    id: 1,
    city: {name: `city1`},
  },
  {
    id: 2,
    city: {name: `city1`},
  }]);
});

it(`Offer by ID selector returns correct offer from state`, () => {
  expect(getOfferByID(mockOffers, 2)).toEqual({
    id: 2,
    city: {name: `city1`},
  });
});

it(`Offer by cities selector returns correct offers from state`, () => {
  expect(getOffersByCities(mockOffers)).toEqual({
    city1: [
      {
        id: 1,
        city: {name: `city1`},
      },
      {
        id: 2,
        city: {name: `city1`},
      },
    ],
    city2: [
      {
        id: 3,
        city: {name: `city2`},
      },
    ],
  });
});
