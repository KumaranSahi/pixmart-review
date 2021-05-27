import "./App.css";
import MainPage from "./Containers/Mainpage/Mainpage";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Store/AuthReducer/AuthContext";
import { ToastContainer } from "react-toastify";

import { ProductsContextProvider } from "./Store/ProductsContext";
import { CheckoutContextProvider } from "./Store/CheckoutContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductsContextProvider>
          <CheckoutContextProvider>
            <div>
              <MainPage />
              <ToastContainer />
            </div>
          </CheckoutContextProvider>
        </ProductsContextProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
