import Navbar from '../navbar/navbar'
import ProductPage from '../ProductsPage/ProductPage';
import CartPage from '../CartPage/CartPage';
import WishlistPage from '../WishlistPage/WishlistPage'
import LandingPage from '../LandingPage/LandingPage'
import CheckoutPage from '../CheckoutPage/CheckoutPage'

import {ProductsContextProvider} from '../../store/ProductsContext';
import {Route,Switch} from 'react-router-dom'
import MobileNavBar from './MobileNavBar/MobileNavBar'
import {CheckoutContextProvider} from '../../store/CheckoutContext'

const Mainpage=()=>{
    return(
        <div>
            <ProductsContextProvider>
                <Navbar/>
                <CheckoutContextProvider>
                    <Switch>
                        <Route path="/cart" exact component={CartPage}/>
                        <Route path="/wishlist" exact component={WishlistPage}/>
                        <Route path="/product" exact component={ProductPage}/>
                        <Route path="/checkout" exact component={CheckoutPage}/>
                        <Route path="/" exact component={LandingPage}/>
                    </Switch>
                </CheckoutContextProvider>
                <MobileNavBar/>
            </ProductsContextProvider>
        </div>
    )
}

export default Mainpage;