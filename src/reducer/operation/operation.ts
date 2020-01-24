import {Dispatch} from "redux";
import {ActionCreator as AppActionCreator} from "../app/reducer/reducer";
import {ActionCreator as DataActionCreator} from "../data/reducer/reducer";
import {ActionCreator as UserActionCreator} from "../user/reducer/reducer";
import {FormSendingStatus} from "../../common/constants";
import Path from "../../common/path";
import history from "../../history";
import {getAuthorizationRequired} from "../user/selectors/selectors";
import {AxiosInstance, AxiosResponse} from "axios";
import {GlobalState} from "../reducer";

enum FavoriteStatus {
  TRUE = 1,
  FALSE = 0,
}

interface OnIsAuthorized {
  (): void;
}

interface GetState {
  (): GlobalState;
}

interface OperationList {
  [name: string]: (...param: any) => OperationItem
}

interface OperationItem {
  (dispatch: Dispatch<any>, getState: GetState, api: AxiosInstance): Promise<string | void>
}


const withAuthCheck = (state: GlobalState, onIsAuthorized: OnIsAuthorized): void => {
  if (getAuthorizationRequired(state)) {
    history.push(Path.LOGIN);
  } else {
    onIsAuthorized();
  }
};

const Operation: OperationList = {
  loadOffers: () => (dispatch, _, api) => {
    return api.get(`/hotels`)
      .then((response: AxiosResponse) => {
        if (response.data) {
          dispatch(UserActionCreator.setCity(response.data[0].city.name));
          dispatch(DataActionCreator.setOffers(response.data));
          dispatch(AppActionCreator.setOffersLoaded(true));
        }
      });
  },

  loadReviews: (offerID: number) => (dispatch, _, api) => {
    return api.get(`/comments/${offerID}`)
      .then((response: AxiosResponse) => {
        dispatch(DataActionCreator.setReviews(response.data));
      });
  },

  loadFavorites: () => (dispatch, _, api) => {
    return api.get(`/favorite`)
      .then((response: AxiosResponse) => {
        if (response.data) {
          dispatch(DataActionCreator.setFavorites(response.data));
          dispatch(AppActionCreator.setFavoritesLoaded(true));
        }
      });
  },

  sendReview: (offerID: number, rating: number, comment: string) =>
    (dispatch, getState, api) => {
      return api.post(`/comments/${offerID}`, {rating, comment})
        .then((response: AxiosResponse) => {
          withAuthCheck(getState(), () => {
            if (response.data) {
              dispatch(DataActionCreator.setReviews(response.data));
              dispatch(AppActionCreator.setReviewSending(FormSendingStatus.SUCCESS));

            } else {
              dispatch(AppActionCreator.setReviewSending(FormSendingStatus.READY));
            }
          });
        });
    },

  toggleFavorite: (offerID: number, isFavorite: boolean) =>
    (dispatch, getState, api) => {
      return api.post(`/favorite/${offerID}/${isFavorite ? FavoriteStatus.FALSE : FavoriteStatus.TRUE}`)
        .then((response: AxiosResponse) => {
          withAuthCheck(getState(), () => {
            if (response.data) {
              dispatch(DataActionCreator.updateOffer(response.data));
              dispatch(Operation.loadFavorites());
            }
          });
        });
    },

  signIn: (email?: string, password?: string) =>
    (dispatch, _, api) => {
      return api.post(`/login`, {email, password})
        .then((response: AxiosResponse) => {
          if (response.data) {
            dispatch(UserActionCreator.setUser(response.data));
            dispatch(UserActionCreator.setAuthorizationRequired(false));
            dispatch(Operation.loadOffers());
            dispatch(Operation.loadFavorites());
          }
        });
    },

  getUser: () => (dispatch, _, api) => {
    return api.get(`/login`)
      .then((response: AxiosResponse) => {
        if (response.data) {
          dispatch(UserActionCreator.setUser(response.data));
          dispatch(Operation.loadFavorites());
          dispatch(UserActionCreator.setAuthorizationRequired(false));
        }
        dispatch(Operation.loadOffers());
      });
  },
};

export {FavoriteStatus, withAuthCheck};

export default Operation;
