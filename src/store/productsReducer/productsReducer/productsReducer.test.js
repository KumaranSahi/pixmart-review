import { productsReducer } from "./productsReducer";
import { productsInitialState } from "../ProductsContext";

describe("Tests for products reducer", () => {
  it("Should load products into the products list", () => {
    const loadProductListValues = {
      type: "LOAD_PRODUCT_LIST",
      payload: [{ name: "product1" }],
    };
    expect(
      productsReducer(productsInitialState, loadProductListValues)
    ).toEqual({
      ...productsInitialState,
      products: [
        { name: "product1", inCart: false, inWishlist: false, quantity: 0 },
      ],
    });
  });

  it("Should set sort by to low to high", () => {
    const sortLowToHighValues = {
      type: "SORT_LOW_TO_HIGH",
    };
    expect(productsReducer(productsInitialState, sortLowToHighValues)).toEqual({
      ...productsInitialState,
      sortby: "SORT_LOW_TO_HIGH",
    });
  });

  it("Should set sort by to high to low", () => {
    const sortHighToLowValues = {
      type: "SORT_HIGH_TO_LOW",
    };
    expect(productsReducer(productsInitialState, sortHighToLowValues)).toEqual({
      ...productsInitialState,
      sortby: "SORT_HIGH_TO_LOW",
    });
  });

  it("Should toggle fast delivery", () => {
    const filterByFastDeliveryValues = {
      type: "FILTER_BY_FAST_DELIVERY",
    };
    expect(
      productsReducer(productsInitialState, filterByFastDeliveryValues)
    ).toEqual({
      ...productsInitialState,
      fastDelivery: true,
    });
  });

  it("Should toggle include out of stock", () => {
    const filterByInStockValues = {
      type: "FILTER_BY_IN_STOCK",
    };
    expect(
      productsReducer(productsInitialState, filterByInStockValues)
    ).toEqual({
      ...productsInitialState,
      includeOutOfStock: true,
    });
  });

  it("Should toggle pixmart choice", () => {
    const filterByPixmartChoiceValues = {
      type: "FILTER_BY_PIXMART_CHOICE",
    };
    expect(
      productsReducer(productsInitialState, filterByPixmartChoiceValues)
    ).toEqual({
      ...productsInitialState,
      pixmartChoice: true,
    });
  });

  it("Should toggle has discount", () => {
    const filterByHasDiscountValues = {
      type: "FILTER_BY_HAS_DISCOUNT",
    };
    expect(
      productsReducer(productsInitialState, filterByHasDiscountValues)
    ).toEqual({
      ...productsInitialState,
      hasDiscount: true,
    });
  });

  it("Should add item to cart", () => {
    const addToCartValues = {
      type: "ADD_TO_CART",
      payload: ["Product1", "Product2", "Product3"],
    };
    expect(productsReducer(productsInitialState, addToCartValues)).toEqual({
      ...productsInitialState,
      cartItems: ["Product1", "Product2", "Product3"],
    });
  });

  it("Should add item to wishlist", () => {
    const addToWishlistValues = {
      type: "ADD_TO_WISHLIST",
      payload: ["Product1", "Product2", "Product3"],
    };
    expect(productsReducer(productsInitialState, addToWishlistValues)).toEqual({
      ...productsInitialState,
      wishListItems: ["Product1", "Product2", "Product3"],
    });
  });

  it("Should clear the cart", () => {
    const addToCartValues = {
      type: "CLEAR_CART",
    };
    expect(productsReducer(productsInitialState, addToCartValues)).toEqual({
      ...productsInitialState,
      cartItems: [],
    });
  });

  it("Should add cost to the totalCost", () => {
    const addToCartValues = {
      type: "CALCULATE_TOTAL_COST",
    };
    expect(
      productsReducer(
        {
          ...productsInitialState,
          cartItems: [
            {
              product: {
                hasDiscount: false,
                price: 2000,
                discount: 10,
              },
              quantity: 1,
            },
          ],
        },
        addToCartValues
      )
    ).toEqual({
      ...productsInitialState,
      cartItems: [
        {
          product: {
            hasDiscount: false,
            price: 2000,
            discount: 10,
          },
          quantity: 1,
        },
      ],
      totalCost: 2000,
    });
  });

  it("Should add an entry in filter catagory", () => {
    const filterByOnlyDslrValues = {
      type: "FILTER_BY_CATAGORY",
      payload: "DSLR",
    };
    expect(
      productsReducer(productsInitialState, filterByOnlyDslrValues)
    ).toEqual({
      ...productsInitialState,
      filterByCatagory: ["DSLR"],
    });
  });

  it("Should clear filters", () => {
    const clearFilterValues = {
      type: "CLEAR_FILTERS",
    };
    expect(productsReducer(productsInitialState, clearFilterValues)).toEqual(
      productsInitialState
    );
  });
});
