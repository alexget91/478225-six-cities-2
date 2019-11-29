import axios from "axios";
import {ActionCreator} from "./reducer/user/reducer/reducer";

const configureAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-2.appspot.com/six-cities`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    switch (err.response.status) {
      case 400:
        throw new Error(err.response.data.error);
      case 403:
        dispatch(ActionCreator.setAuthorizationRequired(true));
        break;
    }

    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default configureAPI;
