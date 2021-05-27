import classes from "./CartPage.module.css";
import { useProducts } from "../../Store";
import { useEffect } from "react";
import CartCard from "./CartCard/CartCard";
import { Link } from "react-router-dom";
import { useCheckout } from "../../Store/CheckoutContext";

const CartPage = () => {
  const { cartItems, totalCost, productsDispatch } = useProducts();
  const { dispatch: checkoutDispatch } = useCheckout();

  useEffect(() => {
    productsDispatch({ type: "CALCULATE_TOTAL_COST" });
  }, [productsDispatch, cartItems.length]);
  return (
    <div className={classes["cart-section"]}>
      {cartItems.length > 0 ? (
        <>
          <div className={classes["checkout-container"]}>
            <h1 className={classes["cart-empty"]}>
              Total-cost:Rs. {totalCost}
            </h1>
            <button
              className={`${classes["button-solid"]} ${classes["button-primary"]}`}
              onClick={() =>
                checkoutDispatch({
                  type: "MOVE_TO_ADDRESS",
                })
              }
            >
              <Link to="/checkout">Proceed to checkout</Link>
            </button>
          </div>
          <ul>
            {cartItems.map(
              ({
                product: {
                  _id: id,
                  name,
                  image,
                  price,
                  rating,
                  hasDiscount,
                  discount,
                  pixmartChoice,
                  inWishlist,
                },
                quantity,
              }) => (
                <li key={id}>
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
                </li>
              )
            )}
          </ul>
        </>
      ) : (
        <h1 className={classes["cart-empty"]}>The Cart is empty</h1>
      )}
    </div>
  );
};

export default CartPage;
