import "./App.css";
import { MainPage } from "./pages/mainpage/Mainpage";
import { BrowserRouter } from "react-router-dom";
import {
  AuthContextProvider,
  ProductsContextProvider,
  CheckoutContextProvider,
} from "./store";
import { ToastContainer } from "react-toastify";

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
