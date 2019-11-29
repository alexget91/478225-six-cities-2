import MockAdapter from "axios-mock-adapter";
import configureAPI from "../../../api";
import Operation from "./operation";
import {ActionTypes} from "../reducer/reducer";

const mockUser = {
  "id": 1,
  "email": `email`,
  "name": `name`,
  "avatar_url": `avatarUrl`,
  "is_pro": false
};

const mockUserTransformed = {
  id: 1,
  email: `email`,
  name: `name`,
  avatarUrl: `avatarUrl`,
  isPro: false
};

const api = configureAPI();
const apiMock = new MockAdapter(api);

it(`Should make a correct API call to /login`, () => {
  const dispatch = jest.fn();
  const loader = Operation.signIn();

  apiMock
    .onPost(`/login`)
    .reply(200, mockUser);

  return loader(dispatch, null, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionTypes.SET_USER,
        payload: mockUserTransformed,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionTypes.SET_AUTHORIZATION_REQUIRED,
        payload: false,
      });
    });
});
