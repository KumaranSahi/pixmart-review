import classes from './DesktopNavMenu.module.css'
import {NavLink} from 'react-router-dom'
import {useContext} from 'react';
import {ProductsContext} from '../../../store/ProductsContext'

const DesktopNavMenu=()=>{
    const {cartItems,wishListItems,dispatch}= useContext(ProductsContext)
    return(
        <div className={classes["navigation-items-desktop"]}>
                <p className={classes["nav-button"]}>
                    <NavLink to="/" exact activeClassName={classes["active-desktop"]}>
                        Home
                    </NavLink>
                </p>
                <p className={classes["nav-button"]} onClick={()=>dispatch({type:"CLEAR_FILTERS"})}>
                    <NavLink to="/product" exact activeClassName={classes["active-desktop"]}>
                        Products
                    </NavLink>
                </p>
                <p className={classes["nav-button"]}>
                    <NavLink to="/cart" activeClassName={classes["active-desktop"]}>
                        Cart
                    </NavLink>
                    {cartItems.length>0?<small>{cartItems.length}</small>:null}
                </p>
                <p className={classes["nav-button"]}>
                    <NavLink to="/wishlist" activeClassName={classes["active-desktop"]}>
                        Wishlist
                    </NavLink>
                    {wishListItems.length>0?<small>{wishListItems.length}</small>:null}
                </p>
            </div>
    )
}

export default DesktopNavMenu