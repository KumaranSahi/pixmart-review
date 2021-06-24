import { authReducer } from "./authReducer";
import { authInitialState } from "../AuthContext";

describe("Tests for auth reducer", () => {
  it("Should return an object with token, userName and expiresIn values saved", () => {
    const signinUserValues = {
      type: "SIGNIN_USER",
      payload: {
        token: "Token",
        userName: "UserName",
        expiresIn: "ExpiresIn",
      },
    };
    expect(authReducer(authInitialState, signinUserValues)).toEqual({
      token: "Token",
      userName: "UserName",
      expiresIn: "ExpiresIn",
    });
  });
  it("Should return an object with token, userName and expiresIn values set asas null", () => {
    const signinUserValues = {
      type: "SIGNOUT_USER",
    };
    expect(authReducer(authInitialState, signinUserValues)).toEqual(
      authInitialState
    );
  });
});
