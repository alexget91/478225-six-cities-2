import NameSpace from "../../name-space";
import {State} from "../reducer/reducer";
import {FormSendingStatus} from "../../../common/constants";
import {GlobalState} from "../../reducer";

const NAME_SPACE: NameSpace = NameSpace.APP;

const getOffersLoadStatus = (state: GlobalState): boolean => (state[NAME_SPACE] as State).isOffersLoaded;
const getFavoritesLoadStatus = (state: GlobalState): boolean => (state[NAME_SPACE] as State).isFavoritesLoaded;
const getReviewSendingStatus = (state: GlobalState): FormSendingStatus => (state[NAME_SPACE] as State).reviewSendingStatus;
const getError = (state: GlobalState): string => (state[NAME_SPACE] as State).errorMessage;

export {
  getOffersLoadStatus,
  getFavoritesLoadStatus,
  getReviewSendingStatus,
  getError,
};
