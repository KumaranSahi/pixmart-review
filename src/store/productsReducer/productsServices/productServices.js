import axios from "axios";
import { APP_URL } from "../../../axiosUtils";

export const addItemToCartService = async (productId) => {
  try {
    const { data } = await axios.post(`${APP_URL}/api/carts`, {
      productId: productId,
      quantity: 1,
    });
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

export const removeItemFromCartService = async (productId) => {
  try {
    const { data } = await axios.delete(`${APP_URL}/api/carts/${productId}`);
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

export const changeQuantityService = async (productId, quantity) => {
  try {
    const { data } = await axios.put(`${APP_URL}/api/carts/${productId}`, {
      quantity: quantity,
    });
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

export const addWishlistService = async (productId) => {
  try {
    const { data } = await axios.post(`${APP_URL}/api/wishlists`, {
      productId: productId,
    });
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

export const removeItemFromWishlistService = async (productId) => {
  try {
    const { data } = await axios.delete(
      `${APP_URL}/api/wishlists/${productId}`
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

export const loadCartService = async () => {
  try {
    const { data } = await axios.get(`${APP_URL}/api/carts`);
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

export const loadWishlistService = async () => {
  try {
    const { data } = await axios.get(`${APP_URL}/api/wishlists`);
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

export const loadProductService = async () => {
  try {
    const { data } = await axios.get(`${APP_URL}/api/products`);
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
