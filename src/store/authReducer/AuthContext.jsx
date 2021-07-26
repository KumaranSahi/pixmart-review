import {
  useReducer,
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import { authReducer } from "./authReducer/authReducer";
import {
  signUpUser,
  signInUser,
  onReload,
  signOutUser,
  changePassword,
} from "./authMethods";
import { setupAuthHeaderForServiceCalls } from "../../axiosUtils";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const authInitialState = {
  token: null,
  userName: null,
  expiresIn: null,
};

export const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState("SIGNIN_PAGE");

  const token = localStorage.getItem("token");
  setupAuthHeaderForServiceCalls(token);

  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    onReload({ dispatch });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userId: state.userId,
        token: state.token,
        userName: state.userName,
        expiresIn: state.expiresIn,
        authDispatch: dispatch,
        signUpUser: signUpUser,
        signInUser: signInUser,
        signOutUser: signOutUser,
        currentPage: currentPage,
        changePassword: changePassword,
        setAuthCurrentPage: setCurrentPage,
        authLoading: loading,
        setAuthLoading: setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
