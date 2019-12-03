import {getCity, getUser, getAuthorizationRequired} from "./selectors";
import NameSpace from "../../name-space";

const mockState = {
  [NameSpace.USER]: {
    city: `city`,
    user: `user`,
    isAuthorizationRequired: true,
  },
};

it(`City selector returns correct city from state`, () => {
  expect(getCity(mockState)).toEqual(`city`);
});

it(`User selector returns correct user data from state`, () => {
  expect(getUser(mockState)).toEqual(`user`);
});

it(`"Authorization required" selector returns correct flag from state`, () => {
  expect(getAuthorizationRequired(mockState)).toEqual(true);
});
