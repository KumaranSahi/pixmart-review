import {
  createContext,
  useEffect,
  useReducer,
  useContext,
  useState,
} from "react";
import { useAuth } from "../AuthReducer/AuthContext";
import {
  productsReducer,
  loadCart,
  loadWishlist,
  loadProduct,
  addWishlist,
  changeQuantity,
  getCatagoricallyFilteredData,
  getFilteredData,
  removeItemFromCart,
  removeItemFromWishlist,
  addItemToCart,
} from "./ProductsReducer";

export const ProductsContext = createContext();

export const useProducts = () => useContext(ProductsContext);

export const ProductsContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    if (token)
      loadCart({
        dispatch: dispatch,
        token: token,
      });
  }, [token]);

  useEffect(() => {
    if (token)
      loadWishlist({
        token: token,
        dispatch: dispatch,
      });
  }, [token]);

  useEffect(() => {
    loadProduct({
      dispatch: dispatch,
    });
  }, []);

  const [state, dispatch] = useReducer(productsReducer, {
    products: [],
    cartItems: [],
    wishListItems: [],
    hasDiscount: false,
    fastDelivery: false,
    includeOutOfStock: false,
    pixmartChoice: false,
    sortby: "SORT_LOW_TO_HIGH",
    filterByCatagory: null,
    totalCost: 0,
  });

  const getSortedData = (products, sortby) => {
    if (products && sortby === "SORT_LOW_TO_HIGH")
      return products.sort((a, b) => a.price - b.price);
    if (products && sortby === "SORT_HIGH_TO_LOW")
      return products.sort((a, b) => b.price - a.price);
    return products;
  };

  const catagoricallyFilteredData = getCatagoricallyFilteredData(
    state.products,
    state.filterByCatagory
  );
  const sortedData = getSortedData(catagoricallyFilteredData, state.sortby);
  const filteredData = getFilteredData(
    sortedData,
    state.hasDiscount,
    state.fastDelivery,
    state.includeOutOfStock,
    state.pixmartChoice
  );

  return (
    <ProductsContext.Provider
      value={{
        products: filteredData,
        cartItems: [...state.cartItems],
        wishListItems: [...state.wishListItems],
        productDispatch: dispatch,
        hasDiscount: state.hasDiscount,
        fastDelivery: state.fastDelivery,
        includeOutOfStock: state.includeOutOfStock,
        pixmartChoice: state.pixmartChoice,
        sortby: state.sortby,
        totalCost: state.totalCost,
        filterByCatagory: state.filterByCatagory,
        addItemToCart: addItemToCart,
        removeItemFromCart: removeItemFromCart,
        changeQuantity: changeQuantity,
        addWishlist: addWishlist,
        removeItemFromWishlist: removeItemFromWishlist,
        productLoading: loading,
        setProductsLoading: setLoading,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
