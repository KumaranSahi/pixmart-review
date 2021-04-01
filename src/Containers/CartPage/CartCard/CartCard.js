import classes from './CartCard.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar,faCheckCircle,faHeart} from '@fortawesome/free-solid-svg-icons';
import {ProductsContext} from '../../../store/ProductsContext'
import { useContext,useEffect } from 'react';

const CartCard=({id,name,image,hasDiscount,price,discount,rating,pixmartChoice,inCart,inWishlist,quantity})=>{

    const {dispatch}=useContext(ProductsContext);
    useEffect(()=>{
        dispatch({type:"CALCULATE_TOTAL_COST"})
    },[quantity,dispatch])
    
    const calculateDiscount=(price,discount)=>{
        let discountedAmount=price-Math.round((price*(discount/100)));
        return(
            <>
                <span>Rs. {discountedAmount}{"  "}<small className={classes["original-price"]}>Rs. {price}</small></span>
                <p className={classes["discount-rate"]}>{discount}% OFF!</p>
            </>
        )
    }
    
    return(
        <div className={classes["card-container"]}>
            <div className={classes["image-container"]}>
                <img src={image} alt={name} className={classes["card-image"]}/>
                {pixmartChoice?<div className={`${classes["badge-solid"]} ${classes["badge-primary"]} ${classes["pixsmart-badge"]}`}>
                    <FontAwesomeIcon icon={faCheckCircle}/>Pixmart Choice
                </div>:null}
                {inWishlist?<div className={`${classes["badge-solid"]} ${classes["badge-failure"]} ${classes["wishlist-badge"]}`}>
                    <FontAwesomeIcon icon={faHeart}/>
                </div>:null}
            </div>
            <div className={classes["typography"]}>
                <div className={classes['name-rating-container']}>
                    <h4>{name}</h4>
                    <div className={`${classes['rating-container']}`}>
                        <FontAwesomeIcon icon={faStar}/>
                        <span>
                            {rating}
                        </span>
                    </div>
                </div>
                <div className={classes["pricing"]}>
                    {hasDiscount?
                        calculateDiscount(price,discount):
                        <p>
                            Rs. {price}
                        </p>
                    }
                </div>
                <hr/>
                <div className={classes['action-buttons']}>
                    <div className={classes['quantity-buttons']}>
                        <button 
                            className={`${classes["button-solid"]} ${classes["button-primary"]}`}
                            onClick={()=>dispatch({type:"DECREMENT_QUANTITY",payload:id})}
                        >
                            -
                        </button>
                        <p>
                            {quantity}
                        </p>
                        <button 
                            className={`${classes["button-solid"]} ${classes["button-primary"]}`}
                            onClick={()=>dispatch({type:"INCREMENT_QUANTITY",payload:id})}
                        >
                            +
                        </button>
                    </div>
                    <button 
                        className={`${classes["button-solid"]} ${classes["button-solid-secondary"]}`}
                        onClick={()=>dispatch({type:"REMOVE_FROM_CART",payload:id})}
                    >
                    Remove from cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartCard;