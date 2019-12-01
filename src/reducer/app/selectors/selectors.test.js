import {getCities, getOffers} from "./selectors";
import NameSpace from "../../name-space";

const mockState = {
  [NameSpace.APP]: {
    offers: [{foo: `bar`}],
    cities: [`1`, `2`],
  },
};

it(`Offers selector returns correct offers from state`, () => {
  expect(getOffers(mockState)).toEqual([{foo: `bar`}]);
});

it(`Cities selector returns correct cities from state`, () => {
  expect(getCities(mockState)).toEqual([`1`, `2`]);
});
