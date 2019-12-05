import axios from "axios";
import Settings from "./common/settings";

const configureAPI = (onLoginFail, onError) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-2.appspot.com/six-cities`,
    timeout: Settings.API_TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    switch (err.response.status) {
      case 400:
        onError(err.response.data.error);
        break;
      case 401:
        onLoginFail();
        break;
      case 500:
        onError(`Server is not available`);
        break;
      default:
        onError(`${err.response.status}: ${err.response.data.error}`);
    }

    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default configureAPI;
