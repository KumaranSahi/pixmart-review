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
    case "FILTER_BY_CATAGORY":
      return {
        ...state,
        filterByCatagory: state.filterByCatagory.some(
          (item) => item === action.payload
        )
          ? state.filterByCatagory.filter((item) => item !== action.payload)
          : [...state.filterByCatagory, action.payload],
      };
    case "CLEAR_FILTERS":
      return {
        ...state,
        hasDiscount: false,
        fastDelivery: false,
        includeOutOfStock: false,
        pixmartChoice: false,
        sortby: "SORT_LOW_TO_HIGH",
        filterByCatagory: [],
      };
    default:
      return state;
  }
};

export const calculateTotalCost = (
  acc,
  { product: { hasDiscount, price, discount }, quantity }
) => {
  let actualPrice;
  hasDiscount
    ? (actualPrice = +price - Math.round(+price * (discount / 100)))
    : (actualPrice = +price);
  return acc + actualPrice * quantity;
};
