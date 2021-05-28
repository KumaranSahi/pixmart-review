import classes from "./WishlistPage.module.css";
import { useProducts } from "../../Store";
import {WishlistCard} from "./WishlistCard/WishlistCard";

export const WishlistPage = () => {
  const { wishListItems } = useProducts();
  return (
    <div className={classes["wishlist-section"]}>
      {wishListItems.length > 0 ? (
        <ul>
          {wishListItems.map(
            ({
              _id,
              name,
              image,
              price,
              rating,
              hasDiscount,
              discount,
              pixmartChoice,
              inWishlist,
              quantity,
              inCart,
              inStock,
            }) => (
              <li key={_id}>
                <WishlistCard
                  id={_id}
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
              </li>
            )
          )}
        </ul>
      ) : (
        <h1 className={classes["wishlist-empty"]}>Wishlist is empty</h1>
      )}
    </div>
  );
};
