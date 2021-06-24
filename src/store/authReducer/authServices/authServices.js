import axios from "axios";
import { APP_URL } from "../../../axiosUtils";

export const signUpUserService = async (userData) => {
  try {
    const { data } = await axios.post(`${APP_URL}/api/users/signup`, userData);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error;
      if (serverError && serverError.response) {
        return serverError.response;
      }
    }
    return { ok: false, errorMessage: "Something went wrong" };
  }
};

export const changePasswordService = async (userData) => {
  try {
    const { data } = await axios.post(
      `${APP_URL}/api/users/password`,
      userData
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error;
      if (serverError && serverError.response) {
        return serverError.response;
      }
    }
    return { ok: false, errorMessage: "Something went wrong" };
  }
};

export const signinService = async (userData) => {
  try {
    const {
      data: { data },
    } = await axios.post(`${APP_URL}/api/users/signin`, userData);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error;
      if (serverError && serverError.response) {
        return serverError.response;
      }
    }
    return { ok: false, errorMessage: "Something went wrong" };
  }
};
