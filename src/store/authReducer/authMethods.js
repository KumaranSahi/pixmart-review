import { warningToast, successToast, infoToast } from "../../components";
import { setupAuthHeaderForServiceCalls } from "../../axiosUtils";
import {
  signUpUserService,
  changePasswordService,
  signinService,
} from "./authServices/authServices";

export const signUpUser = async ({ userData, setLoading, setCurrentPage }) => {
  setLoading(true);
  const data = await signUpUserService(userData);
  if (data.ok) {
    successToast("User Added Successfully");
    setCurrentPage("SIGNIN_PAGE");
    setLoading(false);
  } else {
    if (data.status === 409) {
      infoToast("User already exists in the pix ecosystem");
      infoToast("Please Try loging in");
      setLoading(false);
      return;
    }
    warningToast("Failed to add user");
    console.log(data);
    setLoading(false);
  }
};

export const checkAuthTimeout = ({ expirationTime, dispatch }) => {
  setTimeout(() => {
    signOutUser({ dispatch });
  }, expirationTime * (24 * 1000));
};

export const signOutUser = ({ dispatch }) => {
  localStorage.clear();
  setupAuthHeaderForServiceCalls(null);
  dispatch({
    type: "SIGNOUT_USER",
  });
};

export const onReload = ({ dispatch }) => {
  const token = localStorage.getItem("token");
  setupAuthHeaderForServiceCalls(token);
  const expiresIn = new Date(localStorage.getItem("expiresIn"));
  if (expiresIn <= new Date()) {
    signOutUser({ dispatch });
  } else {
    const userName = localStorage.getItem("userName");
    checkAuthTimeout({
      expirationTime: (expiresIn.getTime() - new Date().getTime()) / 1000,
      dispatch: dispatch,
    });
    dispatch({
      type: "SIGNIN_USER",
      payload: {
        token: token,
        userName: userName,
        expiresIn: expiresIn,
      },
    });
  }
};

export const changePassword = async ({
  userData,
  setLoading,
  setCurrentPage,
}) => {
  setLoading(true);
  const data = await changePasswordService(userData);
  if (data.ok) {
    successToast("Password changed successfully");
    setCurrentPage("SIGNIN_PAGE");
    setLoading(false);
  } else {
    warningToast("Unable to change password please try again later");
    console.log(data);
    setLoading(false);
  }
};

export const signInUser = async ({ userData, setLoading, dispatch }) => {
  setLoading(true);
  const data = await signinService(userData);
  if (data.ok) {
    localStorage.setItem("token", data.token);
    setupAuthHeaderForServiceCalls(data.token);
    localStorage.setItem("userName", data.userName);
    const expiresIn = new Date(new Date().getTime() + 86400000);
    localStorage.setItem("expiresIn", expiresIn);
    checkAuthTimeout({ expirationTime: 86400, dispatch: dispatch });
    dispatch({
      type: "SIGNIN_USER",
      payload: {
        token: data.token,
        userName: data.userName,
        expiresIn: expiresIn,
      },
    });
    successToast("User Logged in Successfully");
    setLoading(false);
  } else {
    warningToast("Invalid username or password");
    console.log(data);
    setLoading(false);
  }
};
