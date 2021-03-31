import classes from './WishlistPage.module.css'
import {useContext} from 'react'
import {ProductsContext} from '../../store/ProductsContext'
import WishlistCard from './WishlistCard/WishlistCard'

const WishlistPage=()=>{
    const {wishListItems}=useContext(ProductsContext)
    return(
        <div className={classes["wishlist-section"]}>
            {wishListItems.length>0?<ul>
                {
                    wishListItems.map(({id,name,image,price,rating,hasDiscount,discount
                            ,pixmartChoice,inWishlist,quantity,inCart,inStock})=>
                        (<li key={id}>
                            <WishlistCard
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
                                inCart={inCart}
                                inStock={inStock}
                            />  
                        </li>)
                        
                    )
                }
            </ul>:<h1 className={classes["wishlist-empty"]}>
                    Wishlist is empty
                </h1>}
        </div>
    )
}

export default WishlistPage;