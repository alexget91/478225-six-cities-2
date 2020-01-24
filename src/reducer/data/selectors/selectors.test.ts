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
import {PlaceList, ReviewsList} from "../../../common/types";
import {getMockOffer} from "../../../common/test-stubs";
import {GlobalState} from "../../reducer";

const mockOffers: PlaceList = [
  getMockOffer(1, `city1`),
  getMockOffer(2, `city1`),
  getMockOffer(3, `city2`),
];

const mockFavorites: PlaceList = [getMockOffer(2, `city1`)];

const mockReviews: ReviewsList = [{
  id: 1,
  user: {
    id: 1,
    name: ``,
  },
  rating: 0,
  comment: ``,
  date: ``,
}];

const mockState: GlobalState = {
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
  expect(getOffersInCity(mockOffers, `city1`)).toEqual([mockOffers[0], mockOffers[1]]);
});

it(`Offer by ID selector returns correct offer from state`, () => {
  expect(getOfferByID(mockOffers, 2)).toEqual(mockOffers[1]);
});

it(`Offer by cities selector returns correct offers from state`, () => {
  expect(getOffersByCities(mockOffers)).toEqual({
    city1: [
      mockOffers[0],
      mockOffers[1],
    ],
    city2: [
      mockOffers[2],
    ],
  });
});
