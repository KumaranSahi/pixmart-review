import axios from "../../useAxios";
import { successToast, warningToast } from "../../UI/Toast/Toast";

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

export const loadAddresses = async ({ token, dispatch, setLoading }) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const {
      data: { data },
    } = await axios.get(`/api/addresses`, config);
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

export const loadPayment = async ({ token, dispatch, setLoading }) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const {
      data: { data },
    } = await axios.get(`/api/payments`, config);
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

export const addNewAddress = async ({ setLoading, body, dispatch, token }) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  setLoading(true);
  try {
    const {
      data: { data },
    } = await axios.post(`/api/addresses`, body, config);
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

export const deleteAddress = async ({
  addressId,
  setLoading,
  dispatch,
  token,
}) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  setLoading(true);
  try {
    const {
      data: { data },
    } = await axios.delete(`/api/addresses/${addressId}`, config);
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

export const addNewPayment = async ({ body, setLoading, dispatch, token }) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  setLoading(true);
  try {
    const {
      data: { data },
    } = await axios.post(`/api/payments`, body, config);
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
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  setLoading(true);
  try {
    const {
      data: { data },
    } = await axios.delete(`/api/payments/${paymentId}`, config);
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
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  setLoading(true);
  try {
    await axios.post(`/api/orders`, body, config);
    dispatch({ type: "PLACE_ORDER" });
    setLoading(false);
    successToast("Order placed successfully");
  } catch (error) {
    console.log(error);
    setLoading(false);
    warningToast("Unable to delete Payment detail");
  }
};
