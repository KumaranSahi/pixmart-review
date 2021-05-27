import axios from "../../useAxios";
import { infoToast, successToast, warningToast } from "../../UI/Toast/Toast";

export const productsReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_PRODUCT_LIST":
      return {
        ...state,
        products: action.payload.map((item) => ({
          ...item,
          inCart: false,
          inWishlist: false,
          quantity: 0,
        })),
      };
    case "SORT_LOW_TO_HIGH":
      return {
        ...state,
        sortby: "SORT_LOW_TO_HIGH",
      };
    case "SORT_HIGH_TO_LOW":
      return {
        ...state,
        sortby: "SORT_HIGH_TO_LOW",
      };
    case "FILTER_BY_FAST_DELIVERY":
      return {
        ...state,
        fastDelivery: !state.fastDelivery,
      };
    case "FILTER_BY_IN_STOCK":
      return {
        ...state,
        includeOutOfStock: !state.includeOutOfStock,
      };
    case "FILTER_BY_PIXMART_CHOICE":
      return {
        ...state,
        pixmartChoice: !state.pixmartChoice,
      };
    case "FILTER_BY_HAS_DISCOUNT":
      return {
        ...state,
        hasDiscount: !state.hasDiscount,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: [...action.payload],
      };
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        wishListItems: [...action.payload],
      };
    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
      };
    case "CALCULATE_TOTAL_COST":
      return {
        ...state,
        totalCost: state.cartItems.reduce(calculateTotalCost, 0),
      };
    case "FILTER_ONLY_DSLR":
      return {
        ...state,
        filterByCatagory: "FILTER_ONLY_DSLR",
      };
    case "FILTER_ONLY_MIRRORLESS":
      return {
        ...state,
        filterByCatagory: "FILTER_ONLY_MIRRORLESS",
      };
    case "FILTER_ONLY_POINT_AND_SHOOT":
      return {
        ...state,
        filterByCatagory: "FILTER_ONLY_POINT_AND_SHOOT",
      };
    case "FILTER_ONLY_ACCESSORIES":
      return {
        ...state,
        filterByCatagory: "FILTER_ONLY_ACCESSORIES",
      };
    case "CLEAR_FILTERS":
      return {
        ...state,
        hasDiscount: false,
        fastDelivery: false,
        includeOutOfStock: false,
        pixmartChoice: false,
        sortby: "SORT_LOW_TO_HIGH",
        filterByCatagory: null,
      };
    default:
      return state;
  }
};

const calculateTotalCost = (
  acc,
  { product: { hasDiscount, price, discount }, quantity }
) => {
  let actualPrice;
  hasDiscount
    ? (actualPrice = +price - Math.round(+price * (discount / 100)))
    : (actualPrice = +price);
  return acc + actualPrice * quantity;
};

export const addItemToCart = async ({ productId, token, dispatch, setLoading }) => {
  setLoading(true);
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const {
      data: { data, ok },
    } = await axios.post(
      `/api/carts`,
      {
        productId: productId,
        quantity: 1,
      },
      config
    );
    if (ok) {
      dispatch({ type: "ADD_TO_CART", payload: [...data] });
      successToast("Item added to cart");
    }
    setLoading(false);
  } catch (error) {
    console.log(error);
    warningToast("cannot add item to cart");
    setLoading(false);
  }
};

export const removeItemFromCart = async ({
  productId,
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
      data: { data, ok },
    } = await axios.delete(`/api/carts/${productId}`, config);
    if (ok) {
      dispatch({ type: "ADD_TO_CART", payload: [...data] });
      successToast("Item removed from cart");
    }
    setLoading(false);
  } catch (error) {
    console.log(error);
    warningToast("Cannot remove item from cart");
    setLoading(false);
  }
};

export const changeQuantity = async ({
  productId,
  quantity,
  setLoading,
  token,
  dispatch,
}) => {
  setLoading(true);
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const {
      data: { data, ok },
    } = await axios.put(
      `/api/carts/${productId}`,
      { quantity: quantity },
      config
    );
    if (ok) {
      dispatch({ type: "ADD_TO_CART", payload: [...data] });
      successToast("Cart item updated");
    }
    setLoading(false);
  } catch (error) {
    console.log(error);
    warningToast("Cannot update cart item");
    setLoading(false);
  }
};

export const addWishlist = async ({
  productId,
  token,
  setLoading,
  dispatch,
}) => {
  setLoading(true);
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const {
      data: { data, ok },
    } = await axios.post(`/api/wishlists`, { productId: productId }, config);
    if (ok) {
      dispatch({ type: "ADD_TO_WISHLIST", payload: [...data] });
      successToast("Item added to Wishlist");
    }
    setLoading(false);
  } catch (error) {
    console.log(error);
    warningToast("Cannot add item to wishlist");
    setLoading(false);
  }
};

export const removeItemFromWishlist = async ({
  productId,
  token,
  setLoading,
  dispatch,
}) => {
  setLoading(true);
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const {
      data: { data, ok },
    } = await axios.delete(`/api/wishlists/${productId}`, config);
    if (ok) {
      dispatch({ type: "ADD_TO_WISHLIST", payload: [...data] });
      successToast("Item removed from cart");
    }
    setLoading(false);
  } catch (error) {
    console.log(error);
    warningToast("Cannot add item to wishlist");
    setLoading(false);
  }
};

export const loadCart = async ({ token, dispatch }) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const {
      data: { data, ok },
    } = await axios.get(`/api/carts`, config);
    if (ok) {
      dispatch({
        type: "ADD_TO_CART",
        payload: [...data],
      });
    }
  } catch (error) {
    console.log(error);
    warningToast("Failed to load cart");
  }
};

export const loadWishlist = async ({ token, dispatch }) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const {
      data: { data, ok },
    } = await axios.get(`/api/wishlists`, config);
    if (ok) {
      dispatch({
        type: "ADD_TO_WISHLIST",
        payload: [...data],
      });
    }
  } catch (error) {
    console.log(error);
    warningToast("Failed to load wishlist");
  }
};

export const loadProduct = async ({ dispatch }) => {
  try {
    const {
      data: { data, ok },
    } = await axios.get("/api/products");
    if (ok)
      dispatch({
        type: "LOAD_PRODUCT_LIST",
        payload: [...data],
      });
  } catch (error) {
    console.log(error);
    warningToast("Failed to load products");
  }
};

export const getCatagoricallyFilteredData = (products, filterby) => {
  if (filterby) {
    if (filterby === "FILTER_ONLY_DSLR")
      return products.filter((item) => item.catagory === "DSLR");
    if (filterby === "FILTER_ONLY_MIRRORLESS")
      return products.filter((item) => item.catagory === "MIRRORLESS");
    if (filterby === "FILTER_ONLY_POINT_AND_SHOOT")
      return products.filter((item) => item.catagory === "POINTANDSHOOT");
    if (filterby === "FILTER_ONLY_ACCESSORIES")
      return products.filter((item) => item.catagory === "ACCESSORIES");
  } else {
    return products;
  }
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
