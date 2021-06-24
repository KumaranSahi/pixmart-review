export const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGNIN_USER":
      return {
        ...state,
        token: action.payload.token,
        userName: action.payload.userName,
        expiresIn: action.payload.expiresIn,
      };
    case "SIGNOUT_USER":
      return {
        ...state,
        token: null,
        userName: null,
        expiresIn: null,
      };
    default:
      return state;
  }
};
