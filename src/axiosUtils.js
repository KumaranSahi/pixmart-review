import axios from "axios";

export const setupAuthHeaderForServiceCalls = (token) => {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = "Bearer " + token);
  }
  delete axios.defaults.headers.common["Authorization"];
};

export const APP_URL = "https://pixmart-api.herokuapp.com";

export const setupAuthExceptionHandler = (push) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        push("/signin");
      }
      return Promise.reject(error);
    }
  );
};
