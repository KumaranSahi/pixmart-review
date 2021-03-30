import { useContext } from 'react';
import classes from './ProductPage.module.css';
import {ProductsContext} from '../../store/ProductsContext';
import ProductCard from './ProductCard/ProductCard';
import Preferences from '../Preferences/Preferences';

const ProductPage=()=>{
    const {products}=useContext(ProductsContext);
    
    return(
        <div className={classes["main-section"]}>
            <div className={classes["side-bar"]}>
                <Preferences/>
            </div>
            <div className={classes["product-section"]}>
                <ul>
                    {
                        products&&products.map(({id,name,image,price,rating,hasDiscount,discount
                            ,fastDelivery,inStock,pixmartChoice,inCart,inWishlist})=>(
                            <li key={id}>
                                <ProductCard
                                    id={id}
                                    name={name}
                                    image={image}
                                    price= {price}
                                    rating={rating}
                                    hasDiscount={hasDiscount}
                                    discount={discount}
                                    fastDelivery={fastDelivery}
                                    inStock={inStock}
                                    pixmartChoice={pixmartChoice}
                                    inCart={inCart}
                                    inWishlist={inWishlist}
                                />
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default ProductPage;