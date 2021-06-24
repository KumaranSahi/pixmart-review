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
    case "SELECT_ADDRESS":
      return {
        ...state,
        address: state.userAddresses.find(({ _id }) => _id === action.payload),
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
    case "SELECT_PAYMENT_DETAILS":
      return {
        ...state,
        paymentDetails:
          action.payload === "COD"
            ? "COD"
            : state.userPaymentDetails.find(
                ({ _id }) => _id === action.payload
              ),
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
