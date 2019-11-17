import axios from "axios";

const configureAPI = () => axios.create({
  baseURL: `https://htmlacademy-react-2.appspot.com/six-cities`,
  timeout: 5000,
  withCredentials: true,
});

export default configureAPI;
