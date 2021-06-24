import { checkoutReducer } from "./checkoutReducer";
import { checkoutInitialState } from "../CheckoutContext";

describe("Tests for checkout reducer", () => {
  it("Should add a new address to the list of addresses", () => {
    const addAddressValues = {
      type: "ADD_USER_ADDRESSES",
      payload: ["address1", "address2"],
    };
    expect(checkoutReducer(checkoutInitialState, addAddressValues)).toEqual({
      ...checkoutInitialState,
      userAddresses: ["address1", "address2"],
    });
  });
  it("Should add a new payment to the list of payments", () => {
    const addPaymentValues = {
      type: "ADD_USER_PAYMENTS",
      payload: ["Payment1", "Payment2"],
    };
    expect(checkoutReducer(checkoutInitialState, addPaymentValues)).toEqual({
      ...checkoutInitialState,
      userPaymentDetails: ["Payment1", "Payment2"],
    });
  });

  it("Should select an address to place order in", () => {
    const selectAddressValues = {
      type: "SELECT_ADDRESS",
      payload: "Address1",
    };
    expect(
      checkoutReducer(
        {
          ...checkoutInitialState,
          userAddresses: [
            {
              _id: "Address1",
            },
          ],
        },
        selectAddressValues
      )
    ).toEqual({
      ...checkoutInitialState,
      address: { _id: "Address1" },
      userAddresses: [{ _id: "Address1" }],
    });
  });

  it("Should set address as current state", () => {
    const moveToAddressValues = {
      type: "MOVE_TO_ADDRESS",
    };
    expect(checkoutReducer(checkoutInitialState, moveToAddressValues)).toEqual({
      ...checkoutInitialState,
      currentState: "ADDRESSPAGE",
    });
  });

  it("Should set payment as current state", () => {
    const moveToPaymentValues = {
      type: "MOVE_TO_PAYMENT",
    };
    expect(checkoutReducer(checkoutInitialState, moveToPaymentValues)).toEqual({
      ...checkoutInitialState,
      currentState: "PAYMENTPAGE",
    });
  });

  it("Should set order summary as current state", () => {
    const moveToOrderSummaryValues = {
      type: "MOVE_TO_ORDER_SUMMARY",
    };
    expect(
      checkoutReducer(checkoutInitialState, moveToOrderSummaryValues)
    ).toEqual({
      ...checkoutInitialState,
      currentState: "ORDERSUMMARY",
    });
  });

  it("Should set COD as the payment detail", () => {
    const moveToOrderSummaryValues = {
      type: "SELECT_PAYMENT_DETAILS",
      payload: "COD",
    };
    expect(
      checkoutReducer(checkoutInitialState, moveToOrderSummaryValues)
    ).toEqual({
      ...checkoutInitialState,
      paymentDetails: "COD",
    });
  });

  it("Should set an item from payment list as the payment detail", () => {
    const selectPaymentValues = {
      type: "SELECT_PAYMENT_DETAILS",
      payload: "Payment1",
    };
    expect(
      checkoutReducer(
        {
          ...checkoutInitialState,
          userPaymentDetails: [{ _id: "Payment1" }, { _id: "Payment2" }],
        },
        selectPaymentValues
      )
    ).toEqual({
      ...checkoutInitialState,
      paymentDetails: { _id: "Payment1" },
      userPaymentDetails: [{ _id: "Payment1" }, { _id: "Payment2" }],
    });
  });

  it("Should set order placed as current state", () => {
    const moveToOrderPlacedValues = {
      type: "PLACE_ORDER",
    };
    expect(
      checkoutReducer(checkoutInitialState, moveToOrderPlacedValues)
    ).toEqual({
      ...checkoutInitialState,
      currentState: "ORDERPLACED",
    });
  });
});
