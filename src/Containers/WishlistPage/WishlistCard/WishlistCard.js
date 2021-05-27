import classes from "./WishlistCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCheckCircle,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useProducts } from "../../../Store";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Store";

const WishlistCard = ({
  id,
  name,
  image,
  hasDiscount,
  price,
  discount,
  rating,
  pixmartChoice,
  inCart,
  inWishlist,
  inStock,
}) => {
  const {
    addItemToCart,
    removeItemFromWishlist,
    cartItems,
    productDispatch,
    setProductsLoading,
  } = useProducts();
  const { token } = useAuth();

  const calculateDiscount = (price, discount) => {
    let discountedAmount = price - Math.round(price * (discount / 100));
    return (
      <>
        <span>
          Rs. {discountedAmount}
          {"  "}
          <small className={classes["original-price"]}>Rs. {price}</small>
        </span>
        <p className={classes["discount-rate"]}>{discount}% OFF!</p>
      </>
    );
  };

  return (
    <div className={classes["card-container"]}>
      <div className={classes["image-container"]}>
        <img src={image} alt={name} className={classes["card-image"]} />
        {pixmartChoice ? (
          <div
            className={`${classes["badge-solid"]} ${classes["badge-primary"]} ${classes["pixsmart-badge"]}`}
          >
            <FontAwesomeIcon icon={faCheckCircle} />
            Pixmart Choice
          </div>
        ) : null}
        {inWishlist ? (
          <div
            className={`${classes["badge-solid"]} ${classes["badge-failure"]} ${classes["wishlist-badge"]}`}
          >
            <FontAwesomeIcon icon={faHeart} />
          </div>
        ) : null}
      </div>
      <div className={classes["typography"]}>
        <div className={classes["name-rating-container"]}>
          <h4>{name}</h4>
          <div className={`${classes["rating-container"]}`}>
            <FontAwesomeIcon icon={faStar} />
            <span>{rating}</span>
          </div>
        </div>
        <div className={classes["pricing"]}>
          {hasDiscount ? (
            calculateDiscount(price, discount)
          ) : (
            <p>Rs. {price}</p>
          )}
        </div>
        <hr />
        <div className={classes["action-buttons"]}>
          {inStock ? (
            cartItems.some(({ product: { _id } }) => _id === id) ? (
              <button
                className={`${classes["button-solid"]} ${classes["button-solid-secondary"]}`}
              >
                <Link to="/cart">Go to cart</Link>
              </button>
            ) : (
              <button
                className={`${classes["button-solid"]} ${classes["button-primary"]}`}
                onClick={() => {
                  addItemToCart({
                    productId: id,
                    token: token,
                    dispatch: productDispatch,
                    setLoading: setProductsLoading,
                  });
                }}
              >
                Add to cart
              </button>
            )
          ) : (
            <div
              className={`${classes["badge-solid"]} ${classes["badge-not-instock"]}`}
            >
              Not in stock
            </div>
          )}

          <button
            className={`${classes["button-outline"]} ${classes["button-secondary"]}`}
            onClick={() => {
              removeItemFromWishlist({
                productId: id,
                token: token,
                setLoading: setProductsLoading,
                dispatch: productDispatch,
              });
            }}
          >
            Remove from wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
