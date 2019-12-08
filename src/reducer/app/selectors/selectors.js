import NameSpace from "../../name-space";

const NAME_SPACE = NameSpace.APP;

const getOffersLoadStatus = (state) => state[NAME_SPACE].isOffersLoaded;
const getFavoritesLoadStatus = (state) => state[NAME_SPACE].isFavoritesLoaded;
const getReviewSendingStatus = (state) => state[NAME_SPACE].reviewSendingStatus;
const getError = (state) => state[NAME_SPACE].errorMessage;

export {
  getOffersLoadStatus,
  getFavoritesLoadStatus,
  getReviewSendingStatus,
  getError,
};
