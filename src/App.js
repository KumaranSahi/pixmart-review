import './App.css';
import MainPage from './Containers/Mainpage/Mainpage'
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from './store/AuthContext'
import {ToastContainer} from 'react-toastify'

import {ProductsContextProvider} from './store/ProductsContext'
import {CheckoutContextProvider} from './store/CheckoutContext'

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
        <ProductsContextProvider>
          <CheckoutContextProvider>
            <div>
              <MainPage/>
              <ToastContainer/>
            </div>
          </CheckoutContextProvider>
        </ProductsContextProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
