import {getOffers,
  getOffersLoadStatus,
  getCities,
  getOffersInCity,
  getOfferByID} from "./selectors";
import NameSpace from "../../name-space";

const NAME_SPACE = NameSpace.APP;

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

const mockState = {
  [NAME_SPACE]: {
    offers: mockOffers,
    isOffersLoaded: false,
  },
};

it(`Offers selector returns correct offers from state`, () => {
  expect(getOffers(mockState)).toEqual(mockOffers);
});

it(`"Offers loaded" selector returns correct value from state`, () => {
  expect(getOffersLoadStatus(mockState)).toEqual(false);
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
