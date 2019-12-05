import NameSpace from "../../name-space";

const NAME_SPACE = NameSpace.APP;

const getOffersLoadStatus = (state) => state[NAME_SPACE].isOffersLoaded;
const getReviewSendingStatus = (state) => state[NAME_SPACE].reviewSendingStatus;
const getError = (state) => state[NAME_SPACE].errorMessage;

export {
  getOffersLoadStatus,
  getReviewSendingStatus,
  getError,
};
