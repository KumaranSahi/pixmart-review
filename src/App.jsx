import "./App.css";
import MainPage from "./Containers/Mainpage/Mainpage";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./Store";
import { ToastContainer } from "react-toastify";

import { ProductsContextProvider } from "./Store";
import { CheckoutContextProvider } from "./Store";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <ProductsContextProvider>
          <CheckoutContextProvider>
            <div>
              <MainPage />
              <ToastContainer />
            </div>
          </CheckoutContextProvider>
        </ProductsContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
