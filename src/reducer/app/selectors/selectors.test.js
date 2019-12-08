import {
  getOffersLoadStatus,
  getFavoritesLoadStatus,
  getReviewSendingStatus,
  getError,
} from "./selectors";
import NameSpace from "../../name-space";

const mockState = {
  [NameSpace.APP]: {
    isOffersLoaded: false,
    isFavoritesLoaded: false,
    reviewSendingStatus: `status`,
    errorMessage: `error`,
  },
};

it(`"Offers loaded" selector returns correct value from state`, () => {
  expect(getOffersLoadStatus(mockState)).toEqual(false);
});

it(`"Favorites loaded" selector returns correct value from state`, () => {
  expect(getFavoritesLoadStatus(mockState)).toEqual(false);
});

it(`Review sending status selector returns correct value from state`, () => {
  expect(getReviewSendingStatus(mockState)).toEqual(`status`);
});

it(`Error selector returns correct value from state`, () => {
  expect(getError(mockState)).toEqual(`error`);
});
