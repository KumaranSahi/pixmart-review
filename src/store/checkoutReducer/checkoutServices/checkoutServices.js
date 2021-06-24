import axios from "axios";
import { APP_URL } from "../../../axiosUtils";

export const loadAddressesService = async () => {
  try {
    const { data } = await axios.get(`${APP_URL}/api/addresses`);
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

export const loadPaymentService = async () => {
  try {
    const { data } = await axios.get(`${APP_URL}/api/payments`);
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

export const addNewAddressService = async (address) => {
  try {
    const { data } = await axios.post(`${APP_URL}/api/addresses`, address);
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

export const deleteAddressService = async (addressId) => {
  try {
    const { data } = await axios.delete(
      `${APP_URL}/api/addresses/${addressId}`
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

export const addNewPaymentService = async (payment) => {
  try {
    const { data } = await axios.post(`${APP_URL}/api/payments`, payment);
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

export const deletePaymentDetailsService = async (paymentId) => {
  try {
    const { data } = await axios.delete(`${APP_URL}/api/payments/${paymentId}`);
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

export const placeOrderService = async (order) => {
  try {
    const { data } = await axios.post(`${APP_URL}/api/orders`, order);
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
