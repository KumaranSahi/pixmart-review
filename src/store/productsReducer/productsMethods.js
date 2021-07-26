import { successToast, warningToast } from "../../components";
import {
  addItemToCartService,
  removeItemFromCartService,
  changeQuantityService,
  addWishlistService,
  removeItemFromWishlistService,
  loadCartService,
  loadWishlistService,
  loadProductService,
} from "./productsServices/productServices";

export const addItemToCart = async ({ productId, dispatch, setLoading }) => {
  setLoading(true);
  const data = await addItemToCartService(productId);
  if (data.ok) {
    dispatch({ type: "ADD_TO_CART", payload: [...data.data] });
    successToast("Item added to cart");
    setLoading(false);
  } else {
    console.log(data);
    warningToast("cannot add item to cart");
    setLoading(false);
  }
};

export const removeItemFromCart = async ({
  productId,
  setLoading,
  dispatch,
}) => {
  setLoading(true);
  const data = await removeItemFromCartService(productId);
  if (data.ok) {
    dispatch({ type: "ADD_TO_CART", payload: [...data.data] });
    successToast("Item removed from cart");
    setLoading(false);
  } else {
    console.log(data);
    warningToast("Cannot remove item from cart");
    setLoading(false);
  }
};

export const changeQuantity = async ({
  productId,
  quantity,
  setLoading,
  dispatch,
}) => {
  setLoading(true);
  const data = await changeQuantityService(productId, quantity);
  if (data.ok) {
    dispatch({ type: "ADD_TO_CART", payload: [...data.data] });
    successToast("Cart item updated");
    setLoading(false);
  } else {
    console.log(data);
    warningToast("Cannot update cart item");
    setLoading(false);
  }
};

export const addWishlist = async ({ productId, setLoading, dispatch }) => {
  setLoading(true);
  const data = await addWishlistService(productId);
  if (data.ok) {
    dispatch({ type: "ADD_TO_WISHLIST", payload: [...data.data] });
    successToast("Item added to Wishlist");
    setLoading(false);
  } else {
    console.log(data);
    warningToast("Cannot add item to wishlist");
    setLoading(false);
  }
};

export const removeItemFromWishlist = async ({
  productId,
  setLoading,
  dispatch,
}) => {
  setLoading(true);
  const data = await removeItemFromWishlistService(productId);
  if (data.ok) {
    dispatch({ type: "ADD_TO_WISHLIST", payload: [...data.data] });
    successToast("Item removed from wishlist");
    setLoading(false);
  } else {
    console.log(data);
    warningToast("Cannot add item to wishlist");
    setLoading(false);
  }
};

export const loadCart = async ({ dispatch }) => {
  const data = await loadCartService();
  if (data.ok) {
    dispatch({
      type: "ADD_TO_CART",
      payload: [...data.data],
    });
  } else {
    console.log(data);
    warningToast("Failed to load cart");
  }
};

export const loadWishlist = async ({ dispatch }) => {
  const data = await loadWishlistService();

  if (data.ok) {
    dispatch({
      type: "ADD_TO_WISHLIST",
      payload: [...data.data],
    });
  } else {
    console.log(data);
    warningToast("Failed to load wishlist");
  }
};

export const loadProduct = async ({ dispatch }) => {
  const data = await loadProductService();
  if (data.ok) {
    dispatch({
      type: "LOAD_PRODUCT_LIST",
      payload: [...data.data],
    });
  } else {
    console.log(data);
    warningToast("Failed to load products");
  }
};

export const getCatagoricallyFilteredData = (products, filterBy) => {
  if (filterBy.length > 0) {
    return products.filter((item) => filterBy.includes(item.catagory));
  }
  return products;
};

export const getFilteredData = (
  sortedData,
  hasDiscount,
  fastDelivery,
  includeOutOfStock,
  pixmartChoice
) => {
  if (sortedData)
    return sortedData
      .filter((item) => (hasDiscount ? item.hasDiscount : true))
      .filter((item) => (fastDelivery ? item.fastDelivery : true))
      .filter((item) => (includeOutOfStock ? true : item.inStock))
      .filter((item) => (pixmartChoice ? item.pixmartChoice : true));
  return sortedData;
};
