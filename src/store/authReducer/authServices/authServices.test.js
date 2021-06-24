import {
  changePasswordService,
  signinService,
  signUpUserService,
} from "./authServices";
import axios from "axios";

jest.mock("axios");

describe("Tests for change password service", () => {
  it("Should return an object with confirmation message", async () => {
    axios.post.mockResolvedValue({
      data: {
        ok: true,
        message: "Password Updated Successfully",
      },
    });
    const changePasswordOutput = await changePasswordService({
      email: "Email",
      password: "Password",
      confirmPassword: "ConfirmPassword",
    });
    expect(changePasswordOutput).toEqual({
      ok: true,
      message: "Password Updated Successfully",
    });
  });
  it("Should return object for when error is API error", async () => {
    axios.post.mockRejectedValue({
      response: {
        ok: false,
        message: "Unable to update password please try again later",
      },
    });
    axios.isAxiosError.mockImplementation((payload) => true);
    const changePasswordErrorOutput = await changePasswordService({
      email: "Email",
      password: "Password",
      confirmPassword: "ConfirmPassword",
    });
    expect(changePasswordErrorOutput).toEqual({
      ok: false,
      message: "Unable to update password please try again later",
    });
  });

  it("Should return object for errors other than API error", async () => {
    axios.post.mockRejectedValue({
      response: {
        ok: false,
        message: "Unable to update password please try again later",
      },
    });
    const changePasswordErrorOutput = await changePasswordService({
      ok: false,
      message: "Unable to update password please try again later",
    });
    expect(changePasswordErrorOutput).toEqual({
      errorMessage: "Something went wrong",
      ok: false,
    });
  });
});

describe("Tests for signin service", () => {
  it("Should return an object with signed in user details", async () => {
    axios.post.mockResolvedValue({
      message: "Sign in successful, here is your token, please keep it safe!",
      data: {
        data: {
          ok: true,
          token: "Token",
          userName: "UserName",
        },
      },
    });
    const signinServiceOutput = await signinService({
      email: "Email",
      password: "Password",
    });
    expect(signinServiceOutput).toEqual({
      ok: true,
      token: "Token",
      userName: "UserName",
    });
  });
  it("Should return object for when error is API error", async () => {
    axios.post.mockRejectedValue({
      response: {
        ok: false,
        message: "Unable to signin user please try again later",
      },
    });
    axios.isAxiosError.mockImplementation((payload) => true);
    const signinServiceErrorOutput = await signinService({
      email: "Email",
      password: "Password",
    });
    expect(signinServiceErrorOutput).toEqual({
      ok: false,
      message: "Unable to signin user please try again later",
    });
  });

  it("Should return object for errors other than API error", async () => {
    axios.post.mockRejectedValue({
      response: {
        ok: false,
        message: "Unable to signin user please try again later",
      },
    });
    const signinServiceErrorOutput = await signinService({
      ok: false,
      message: "Unable to update password please try again later",
    });
    expect(signinServiceErrorOutput).toEqual({
      errorMessage: "Something went wrong",
      ok: false,
    });
  });
});

describe("Tests for signup user service", () => {
  it("Should return an object with confirmation of user sugnup", async () => {
    axios.post.mockResolvedValue({
      data: { ok: true, message: "User Added Successfully" },
    });
    const signUpServiceOutput = await signUpUserService({
      name: "UserName",
      email: "Email",
      password: "Password",
    });
    expect(signUpServiceOutput).toEqual({
      ok: true,
      message: "User Added Successfully",
    });
  });
  it("Should return object for when error is API error", async () => {
    axios.post.mockRejectedValue({
      response: {
        ok: false,
        message: "Unable to create new user please try again later",
      },
    });
    axios.isAxiosError.mockImplementation((payload) => true);
    const signUpServiceErrorOutput = await signUpUserService({
      name: "UserName",
      email: "Email",
      password: "Password",
    });
    expect(signUpServiceErrorOutput).toEqual({
      ok: false,
      message: "Unable to create new user please try again later",
    });
  });

  it("Should return object for errors other than API error", async () => {
    axios.post.mockRejectedValue({
      response: {
        ok: false,
        message: "Unable to create new user please try again later",
      },
    });
    const signUpServiceErrorOutput = await signUpUserService({
      name: "UserName",
      email: "Email",
      password: "Password",
    });
    expect(signUpServiceErrorOutput).toEqual({
      errorMessage: "Something went wrong",
      ok: false,
    });
  });
});
