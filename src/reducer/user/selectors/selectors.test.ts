import {getCity, getUser, getAuthorizationRequired} from "./selectors";
import NameSpace from "../../name-space";
import {GlobalState} from "../../reducer";

const mockState: GlobalState = {
  [NameSpace.USER]: {
    city: `city`,
    user: {
      id: 0,
      name: ``,
      email: ``,
    },
    isAuthorizationRequired: true,
  },
};

it(`City selector returns correct city from state`, () => {
  expect(getCity(mockState)).toEqual(`city`);
});

it(`User selector returns correct user data from state`, () => {
  expect(getUser(mockState)).toEqual({
    id: 0,
    name: ``,
    email: ``,
  });
});

it(`"Authorization required" selector returns correct flag from state`, () => {
  expect(getAuthorizationRequired(mockState)).toEqual(true);
});
