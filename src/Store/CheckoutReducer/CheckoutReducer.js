import { APP_URL } from "../../axiosUtils";
import { successToast, warningToast } from "../../UI/Toast/Toast";
import axios from "axios";

export const checkoutReducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER_ADDRESSES":
      return {
        ...state,
        userAddresses: [...action.payload],
      };
    case "ADD_USER_PAYMENTS":
      return {
        ...state,
        userPaymentDetails: [...action.payload],
      };
    case "ADD_ADDRESS":
      return {
        ...state,
        address: state.userAddresses.filter(
          ({ _id }) => _id === action.payload
        )[0],
      };
    case "MOVE_TO_ADDRESS":
      return {
        ...state,
        currentState: "ADDRESSPAGE",
      };
    case "MOVE_TO_PAYMENT":
      return {
        ...state,
        currentState: "PAYMENTPAGE",
      };
    case "MOVE_TO_ORDER_SUMMARY":
      return {
        ...state,
        currentState: "ORDERSUMMARY",
      };
    case "ADD_PAYMENT_DETAILS":
      return {
        ...state,
        paymentDetails:
          action.payload === "COD"
            ? "COD"
            : state.userPaymentDetails.filter(
                ({ _id }) => _id === action.payload
              )[0],
      };
    case "PLACE_ORDER":
      return {
        ...state,
        currentState: "ORDERPLACED",
      };
    default:
      return state;
  }
};

export const loadAddresses = async ({ dispatch, setLoading }) => {
  try {
    const {
      data: { data },
    } = await axios.get(`${APP_URL}/api/addresses`);
    dispatch({
      type: "ADD_USER_ADDRESSES",
      payload: [...data],
    });
  } catch (error) {
    console.log(error);
    warningToast("Unable to add address");
    setLoading(false);
  }
};

export const loadPayment = async ({ dispatch, setLoading }) => {
  try {
    const {
      data: { data },
    } = await axios.get(`${APP_URL}/api/payments`);
    dispatch({
      type: "ADD_USER_PAYMENTS",
      payload: [...data],
    });
  } catch (error) {
    console.log(error);
    warningToast("Unable to add address");
    setLoading(false);
  }
};

export const addNewAddress = async ({ setLoading, body, dispatch }) => {
  setLoading(true);
  try {
    const {
      data: { data },
    } = await axios.post(`${APP_URL}/api/addresses`, body);
    dispatch({
      type: "ADD_USER_ADDRESSES",
      payload: [...data],
    });
    successToast("Address added");
    setLoading(false);
  } catch (error) {
    console.log(error);
    warningToast("Unable to add address");
    setLoading(false);
  }
};

export const deleteAddress = async ({ addressId, setLoading, dispatch }) => {
  setLoading(true);
  try {
    const {
      data: { data },
    } = await axios.delete(`${APP_URL}/api/addresses/${addressId}`);
    dispatch({
      type: "ADD_USER_ADDRESSES",
      payload: [...data],
    });
    setLoading(false);
    successToast("Address deleted");
  } catch (error) {
    console.log(error);
    setLoading(false);
    warningToast("unable to delete address");
  }
};

export const addNewPayment = async ({ body, setLoading, dispatch }) => {
  setLoading(true);
  try {
    const {
      data: { data },
    } = await axios.post(`${APP_URL}/api/payments`, body);
    dispatch({
      type: "ADD_USER_PAYMENTS",
      payload: [...data],
    });
    setLoading(false);
    successToast("Payment detail added");
  } catch (error) {
    console.log(error);
    setLoading(false);
    warningToast("Unable to add Payment detail");
  }
};

export const deletePaymentDetails = async ({
  paymentId,
  setLoading,
  token,
  dispatch,
}) => {
  setLoading(true);
  try {
    const {
      data: { data },
    } = await axios.delete(`${APP_URL}/api/payments/${paymentId}`);
    dispatch({
      type: "ADD_USER_PAYMENTS",
      payload: [...data],
    });
    setLoading(false);
    successToast("Payment detail deleted");
  } catch (error) {
    console.log(error);
    setLoading(false);
    warningToast("Unable to delete Payment detail");
  }
};

export const placeOrder = async ({ body, setLoading, dispatch, token }) => {
  setLoading(true);
  try {
    await axios.post(`${APP_URL}/api/orders`, body);
    dispatch({ type: "PLACE_ORDER" });
    setLoading(false);
    successToast("Order placed successfully");
  } catch (error) {
    console.log(error);
    setLoading(false);
    warningToast("Unable to delete Payment detail");
  }
};
