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
