import { successToast, warningToast } from "../../components";
import {
  loadAddressesService,
  loadPaymentService,
  addNewAddressService,
  deleteAddressService,
  addNewPaymentService,
  deletePaymentDetailsService,
  placeOrderService,
} from "./checkoutServices/checkoutServices";

export const loadAddresses = async ({ dispatch, setLoading }) => {
  setLoading(true);
  const data = await loadAddressesService();
  if (data.ok) {
    dispatch({
      type: "ADD_USER_ADDRESSES",
      payload: [...data.data],
    });
    setLoading(false);
  } else {
    console.log(data);
    warningToast("Unable to load address");
    setLoading(false);
  }
};

export const loadPayment = async ({ dispatch, setLoading }) => {
  setLoading(true);
  const data = await loadPaymentService();
  if (data.ok) {
    dispatch({
      type: "ADD_USER_PAYMENTS",
      payload: [...data.data],
    });
    setLoading(false);
  } else {
    console.log(data);
    warningToast("Unable to load user payments");
    setLoading(false);
  }
};

export const addNewAddress = async ({ setLoading, body, dispatch }) => {
  setLoading(true);
  const data = await addNewAddressService(body);
  if (data.ok) {
    dispatch({
      type: "ADD_USER_ADDRESSES",
      payload: [...data.data],
    });
    successToast("Address added");
    setLoading(false);
  } else {
    console.log(data);
    warningToast("Unable to add address");
    setLoading(false);
  }
};

export const deleteAddress = async ({ addressId, setLoading, dispatch }) => {
  setLoading(true);
  const data = await deleteAddressService(addressId);
  if (data.ok) {
    dispatch({
      type: "ADD_USER_ADDRESSES",
      payload: [...data.data],
    });
    setLoading(false);
    successToast("Address deleted");
  } else {
    console.log(data);
    setLoading(false);
    warningToast("Unable to delete address");
  }
};

export const addNewPayment = async ({ body, setLoading, dispatch }) => {
  setLoading(true);
  const data = await addNewPaymentService(body);
  if (data.ok) {
    dispatch({
      type: "ADD_USER_PAYMENTS",
      payload: [...data.data],
    });
    setLoading(false);
    successToast("Payment detail added");
  } else {
    console.log(data);
    setLoading(false);
    warningToast("Unable to add Payment detail");
  }
};

export const deletePaymentDetails = async ({
  paymentId,
  setLoading,
  dispatch,
}) => {
  setLoading(true);
  const data = await deletePaymentDetailsService(paymentId);
  if (data.ok) {
    dispatch({
      type: "ADD_USER_PAYMENTS",
      payload: [...data],
    });
    setLoading(false);
    successToast("Payment detail deleted");
  } else {
    console.log(data);
    setLoading(false);
    warningToast("Unable to delete Payment detail");
  }
};

export const placeOrder = async ({ body, setLoading, dispatch }) => {
  setLoading(true);
  const data = await placeOrderService(body);
  if (data.ok) {
    dispatch({ type: "PLACE_ORDER" });
    setLoading(false);
    successToast("Order placed successfully");
  } else {
    console.log(data);
    setLoading(false);
    warningToast("Unable place order");
  }
};
