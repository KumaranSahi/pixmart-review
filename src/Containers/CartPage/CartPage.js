import classes from './CartPage.module.css';
import {ProductsContext} from '../../store/ProductsContext'
import { useContext, useEffect } from 'react';
import CartCard from './CartCard/CartCard';
import {Link} from 'react-router-dom'
import {CheckoutContext} from '../../store/CheckoutContext'

const CartPage=()=>{
    const {cartItems,totalCost,dispatch}=useContext(ProductsContext)
    const {dispatch:checkoutDispatch}=useContext(CheckoutContext)

    useEffect(()=>{
        dispatch({type:"CALCULATE_TOTAL_COST"})
    },[dispatch,cartItems.length])
    return(
        <div className={classes["cart-section"]}>
            {cartItems.length>0?
            <>
            <div className={classes["checkout-container"]}>
                <h1 className={classes["cart-empty"]}>
                    Total-cost:Rs. {totalCost} 
                </h1>
                <button 
                    className={`${classes["button-solid"]} ${classes["button-primary"]}`}
                    onClick={()=>checkoutDispatch({
                        type:"MOVE_TO_ADDRESS"
                    })}
                >
                    <Link to="/checkout">
                        Proceed to checkout
                    </Link>
                </button>
            </div>
            <ul>
                {
                    cartItems.map(({id,name,image,price,rating,hasDiscount,discount
                            ,pixmartChoice,inWishlist,quantity})=>
                        (<li key={id}>
                            <CartCard
                                id={id}
                                name={name}
                                image={image}
                                price={price}
                                rating={rating}
                                hasDiscount={hasDiscount}
                                discount={discount}
                                pixmartChoice={pixmartChoice}
                                inWishlist={inWishlist}
                                quantity={quantity}
                            />  
                        </li>)
                        
                    )
                }
            </ul></>:
                <h1 className={classes["cart-empty"]}>
                    The Cart is empty 
                </h1>}
        </div>
    )
}

export default CartPage;