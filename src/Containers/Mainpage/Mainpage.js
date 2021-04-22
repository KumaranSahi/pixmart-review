import Navbar from '../navbar/navbar'
import ProductPage from '../ProductsPage/ProductPage';
import CartPage from '../CartPage/CartPage';
import WishlistPage from '../WishlistPage/WishlistPage'
import LandingPage from '../LandingPage/LandingPage'
import CheckoutPage from '../CheckoutPage/CheckoutPage'
import LoginPage from '../LoginPage/LoginPage'
import {useContext} from 'react'

import {ProductsContextProvider} from '../../store/ProductsContext';
import {Route,Switch,Redirect} from 'react-router-dom'
import MobileNavBar from './MobileNavBar/MobileNavBar'
import {CheckoutContextProvider} from '../../store/CheckoutContext'
import {AuthContext} from '../../store/AuthContext'

const PrivateLink=({...props})=>{
    const {token}=useContext(AuthContext)
    return(
        token?<Route {...props}/>:<Redirect to="/login"/>
    )
}

const LockLogin=({...props})=>{
    const {token}=useContext(AuthContext)
    return(
        token?<Redirect to="/"/>:<Route {...props}/>
    )
}

const Mainpage=()=>{
    return(
        <div>
            <ProductsContextProvider>
                <Navbar/>
                <CheckoutContextProvider>
                    <Switch>
                        <PrivateLink path="/cart" exact component={CartPage}/>
                        <PrivateLink path="/wishlist" exact component={WishlistPage}/>
                        <PrivateLink path="/checkout" exact component={CheckoutPage}/>
                        <LockLogin path="/login" exact component={LoginPage}/>
                        <Route path="/product" exact component={ProductPage}/>
                        <Route path="/" exact component={LandingPage}/>
                    </Switch>
                </CheckoutContextProvider>
                <MobileNavBar/>
            </ProductsContextProvider>
        </div>
    )
}

export default Mainpage;