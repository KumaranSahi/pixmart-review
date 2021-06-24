import {
  addNewAddressService,
  addNewPaymentService,
  deleteAddressService,
  deletePaymentDetailsService,
  loadAddressesService,
  loadPaymentService,
  placeOrderService,
} from "./checkoutServices";
import axios from "axios";

jest.mock("axios");

describe("Tests for adding new address", () => {
  it("Should return an object with the address added to the list", async () => {
    axios.post.mockResolvedValue({
      ok: true,
      data: ["Address1", "Address2", "Address3"],
      message: "Address added to user",
    });
    const addNewAddressOutput = await addNewAddressService("Address3");
    expect(addNewAddressOutput).toEqual(["Address1", "Address2", "Address3"]);
  });

  it("Should return object for when error is API error", async () => {
    axios.post.mockRejectedValue({
      response: {
        ok: false,
        message: "Unable to add address please try again later",
      },
    });
    axios.isAxiosError.mockImplementation((payload) => true);
    const addNewAddressErrorOutput = await addNewAddressService("Address3");
    expect(addNewAddressErrorOutput).toEqual({
      ok: false,
      message: "Unable to add address please try again later",
    });
  });

  it("Should return object for errors other than API error", async () => {
    axios.post.mockRejectedValue({
      response: {
        ok: false,
        message: "Unable to add address please try again later",
      },
    });
    const addNewAddressErrorOutput = await addNewAddressService("Address3");
    expect(addNewAddressErrorOutput).toEqual({
      errorMessage: "Something went wrong",
      ok: false,
    });
  });
});

describe("Tests for adding new payment", () => {
  it("Should return an object with the payment added to the list", async () => {
    axios.post.mockResolvedValue({
      ok: true,
      data: ["Payment1", "Payment2", "Payment3"],
      message: "Payment added to user",
    });
    const addNewPaymentOutput = await addNewPaymentService("Payment3");
    expect(addNewPaymentOutput).toEqual(["Payment1", "Payment2", "Payment3"]);
  });

  it("Should return object for when error is API error", async () => {
    axios.post.mockRejectedValue({
      response: {
        ok: false,
        message: "Unable to add payment please try again later",
      },
    });
    axios.isAxiosError.mockImplementation((payload) => true);
    const addNewPaymentErrorOutput = await addNewPaymentService("Payment3");
    expect(addNewPaymentErrorOutput).toEqual({
      ok: false,
      message: "Unable to add payment please try again later",
    });
  });

  it("Should return object for errors other than API error", async () => {
    axios.post.mockRejectedValue({
      response: {
        ok: false,
        message: "Unable to add payment please try again later",
      },
    });
    const addNewPaymentErrorOutput = await addNewPaymentService("Payment3");
    expect(addNewPaymentErrorOutput).toEqual({
      errorMessage: "Something went wrong",
      ok: false,
    });
  });
});

describe("Tests for deleting address", () => {
  it("Should return an object with the address removed from the list", async () => {
    axios.delete.mockResolvedValue({
      ok: true,
      data: ["Address1", "Address2"],
      message: "address deleted from user",
    });
    const deleteAddressOutput = await deleteAddressService("Address3");
    expect(deleteAddressOutput).toEqual(["Address1", "Address2"]);
  });

  it("Should return object for when error is API error", async () => {
    axios.delete.mockRejectedValue({
      response: {
        ok: false,
        message: "Unable to delete address please try again later",
      },
    });
    axios.isAxiosError.mockImplementation((payload) => true);
    const deleteAddressErrorOutput = await deleteAddressService("Address3");
    expect(deleteAddressErrorOutput).toEqual({
      ok: false,
      message: "Unable to delete address please try again later",
    });
  });

  it("Should return object for errors other than API error", async () => {
    axios.delete.mockRejectedValue({
      response: {
        ok: false,
        message: "Unable to delete address please try again later",
      },
    });
    const deleteAddressErrorOutput = await deleteAddressService("Address3");
    expect(deleteAddressErrorOutput).toEqual({
      errorMessage: "Something went wrong",
      ok: false,
    });
  });
});

describe("Tests for deleting payment", () => {
  it("Should return an object with the payment removed from the list", async () => {
    axios.delete.mockResolvedValue({
      ok: true,
      data: ["Payment1", "Payment2"],
      message: "Payment deleted from user",
    });
    const deletePaymenOutput = await deletePaymentDetailsService("Payment3");
    expect(deletePaymenOutput).toEqual(["Payment1", "Payment2"]);
  });

  it("Should return object for when error is API error", async () => {
    axios.delete.mockRejectedValue({
      response: {
        ok: false,
        message: "Unable to delete payment please try again later",
      },
    });
    axios.isAxiosError.mockImplementation((payload) => true);
    const deletePaymentErrorOutput = await deletePaymentDetailsService(
      "Payment3"
    );
    expect(deletePaymentErrorOutput).toEqual({
      ok: false,
      message: "Unable to delete payment please try again later",
    });
  });

  it("Should return object for errors other than API error", async () => {
    axios.delete.mockRejectedValue({
      response: {
        ok: false,
        message: "Unable to delete payment please try again later",
      },
    });
    const deletePaymentErrorOutput = await deletePaymentDetailsService(
      "Payment3"
    );
    expect(deletePaymentErrorOutput).toEqual({
      errorMessage: "Something went wrong",
      ok: false,
    });
  });
});

describe("Tests for loading address list", () => {
  it("Should return an object with the address list", async () => {
    axios.get.mockResolvedValue({
      ok: true,
      data: ["Address1", "Address2", "Address3"],
      message: "Have some stored addresses",
    });
    const loadAddressesOutput = await loadAddressesService();
    expect(loadAddressesOutput).toEqual(["Address1", "Address2", "Address3"]);
  });

  it("Should return object for when error is API error", async () => {
    axios.get.mockRejectedValue({
      response: {
        ok: false,
        message: "Unable to load addresses please try again later",
      },
    });
    axios.isAxiosError.mockImplementation((payload) => true);
    const loadAddressesErrorOutput = await loadAddressesService();
    expect(loadAddressesErrorOutput).toEqual({
      ok: false,
      message: "Unable to load addresses please try again later",
    });
  });

  it("Should return object for errors other than API error", async () => {
    axios.post.mockRejectedValue({
      response: {
        ok: false,
        message: "Unable to add address please try again later",
      },
    });
    const loadAddressesErrorOutput = await loadAddressesService();
    expect(loadAddressesErrorOutput).toEqual({
      errorMessage: "Something went wrong",
      ok: false,
    });
  });
});

describe("Tests for loading payment list", () => {
  it("Should return an object with the payment list", async () => {
    axios.get.mockResolvedValue({
      ok: true,
      data: ["Payment1", "Payment2", "Payment3"],
      message: "Have some stored addresses",
    });
    const loadPaymentsOutput = await loadPaymentService();
    expect(loadPaymentsOutput).toEqual(["Payment1", "Payment2", "Payment3"]);
  });

  it("Should return object for when error is API error", async () => {
    axios.get.mockRejectedValue({
      response: {
        ok: false,
        message: "Unable to load payments please try again later",
      },
    });
    axios.isAxiosError.mockImplementation((payload) => true);
    const loadPaymentsErrorOutput = await loadPaymentService();
    expect(loadPaymentsErrorOutput).toEqual({
      ok: false,
      message: "Unable to load payments please try again later",
    });
  });

  it("Should return object for errors other than API error", async () => {
    axios.post.mockRejectedValue({
      response: {
        ok: false,
        message: "Unable to load payments please try again later",
      },
    });
    const loadPaymentsErrorOutput = await loadPaymentService();
    expect(loadPaymentsErrorOutput).toEqual({
      errorMessage: "Something went wrong",
      ok: false,
    });
  });
});

describe("Tests for placing order", () => {
  it("Should return an object with confirmation for order placed", async () => {
    axios.post.mockResolvedValue({
      data: {
        ok: true,
        message: "Order placed successfully",
      },
    });
    const placeOrderOutput = await placeOrderService({
      products: ["product1", "product2"],
      totalCost: 20000,
    });
    expect(placeOrderOutput).toEqual({
      ok: true,
      message: "Order placed successfully",
    });
  });

  it("Should return object for when error is API error", async () => {
    axios.post.mockRejectedValue({
      response: {
        ok: false,
        message: "Unable to place order please try again later",
      },
    });
    axios.isAxiosError.mockImplementation((payload) => true);
    const placeOrderErrorOutput = await placeOrderService({
      products: ["product1", "product2"],
      totalCost: 20000,
    });
    expect(placeOrderErrorOutput).toEqual({
      ok: false,
      message: "Unable to place order please try again later",
    });
  });

  it("Should return object for errors other than API error", async () => {
    axios.post.mockRejectedValue({
      response: {
        ok: false,
        message: "Unable to add address please try again later",
      },
    });
    const placeOrderErrorOutput = await placeOrderService({
      products: ["product1", "product2"],
      totalCost: 20000,
    });
    expect(placeOrderErrorOutput).toEqual({
      errorMessage: "Something went wrong",
      ok: false,
    });
  });
});
