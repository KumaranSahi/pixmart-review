import {
  createContext,
  useEffect,
  useReducer,
  useContext,
  useState,
} from "react";
import { useAuth } from "../authReducer/AuthContext";
import {
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
} from "./productsMethods";
import { productsReducer } from "./productsReducer/productsReducer";

export const ProductsContext = createContext();

export const useProducts = () => useContext(ProductsContext);

export const productsInitialState = {
  products: [],
  cartItems: [],
  wishListItems: [],
  hasDiscount: false,
  fastDelivery: false,
  includeOutOfStock: false,
  pixmartChoice: false,
  sortby: "SORT_LOW_TO_HIGH",
  filterByCatagory: [],
  totalCost: 0,
};

export const ProductsContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    if (token)
      loadCart({
        dispatch: dispatch,
      });
  }, [token]);

  useEffect(() => {
    if (token)
      loadWishlist({
        dispatch: dispatch,
      });
  }, [token]);

  useEffect(() => {
    loadProduct({
      dispatch: dispatch,
    });
  }, []);

  const [state, dispatch] = useReducer(productsReducer, productsInitialState);

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
        ...state,
        productDispatch: dispatch,
        products: filteredData,
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
