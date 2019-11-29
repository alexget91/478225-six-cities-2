import {getOffers} from "./selectors";
import NameSpace from "../../name-space";

const mockState = {
  [NameSpace.APP]: {
    offers: [{foo: `bar`}],
  },
};

it(`Offers selector returns correct offers from state`, () => {
  expect(getOffers(mockState)).toEqual([{foo: `bar`}]);
});
