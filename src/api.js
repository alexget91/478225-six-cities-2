import axios from "axios";

const HTTPstatus = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
};

const configureAPI = (onLoginFail, onError) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-2.appspot.com/six-cities`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    if (err.response) {
      switch (err.response.status) {
        case HTTPstatus.BAD_REQUEST:
          onError(err.response.data.error);
          break;
        case HTTPstatus.UNAUTHORIZED:
          onLoginFail();
          break;
        case HTTPstatus.INTERNAL_SERVER_ERROR:
          onError(`Server is not available`);
          break;
        default:
          onError(`${err.response.status}: ${err.response.data.error}`);
      }
    } else {
      onError(`${err.code}: ${err.message}`);
    }

    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default configureAPI;
