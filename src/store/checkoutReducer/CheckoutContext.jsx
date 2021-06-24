import {
  useReducer,
  createContext,
  useEffect,
  useContext,
  useState,
} from "react";
import { useAuth } from "..";
import { checkoutReducer } from "./checkoutReducer/checkoutReducer";
import {
  loadAddresses,
  loadPayment,
  addNewAddress,
  addNewPayment,
  deleteAddress,
  deletePaymentDetails,
  placeOrder,
} from "./checkoutMethods";

export const CheckoutContext = createContext();

export const useCheckout = () => useContext(CheckoutContext);

export const checkoutInitialState = {
  address: null,
  paymentDetails: null,
  currentState: "ADDRESSPAGE",
  userAddresses: [],
  userPaymentDetails: [],
};

export const CheckoutContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    if (token)
      loadAddresses({
        dispatch: dispatch,
        setLoading: setLoading,
      });
  }, [token]);

  useEffect(() => {
    if (token) loadPayment({ dispatch: dispatch, setLoading: setLoading });
  }, [token]);

  const [state, dispatch] = useReducer(checkoutReducer, checkoutInitialState);

  return (
    <CheckoutContext.Provider
      value={{
        checkoutDispatch: dispatch,
        address: state.address,
        userAddresses: state.userAddresses,
        userPaymentDetails: state.userPaymentDetails,
        paymentDetails: state.paymentDetails,
        currentState: state.currentState,
        addNewAddress: addNewAddress,
        deleteAddress: deleteAddress,
        addNewPayment: addNewPayment,
        deletePaymentDetails: deletePaymentDetails,
        placeOrder: placeOrder,
        checkoutLoading: loading,
        setCheckoutLoading: setLoading,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
