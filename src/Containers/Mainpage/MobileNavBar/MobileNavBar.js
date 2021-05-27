import classes from "./MobileNavBar.module.css";
import {
  faHome,
  faCartPlus,
  faHeart,
  faCameraRetro,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { useProducts } from "../../../Store";

const MobileNavBar = () => {
  const { cartItems, wishListItems, dispatch } = useProducts();

  return (
    <div className={classes["mobile-nav-bar"]}>
      <p className={classes["nav-button"]}>
        <NavLink to="/" exact activeClassName={classes["active-mobile"]}>
          <FontAwesomeIcon icon={faHome} />
        </NavLink>
      </p>
      <p
        className={classes["nav-button"]}
        onClick={() => dispatch({ type: "CLEAR_FILTERS" })}
      >
        <NavLink to="/product" exact activeClassName={classes["active-mobile"]}>
          <FontAwesomeIcon icon={faCameraRetro} />
        </NavLink>
      </p>
      <p className={classes["nav-button"]}>
        <NavLink to="/cart" activeClassName={classes["active-mobile"]}>
          <FontAwesomeIcon icon={faCartPlus} />
        </NavLink>
        {cartItems.length > 0 ? <small>{cartItems.length}</small> : null}
      </p>
      <p className={classes["nav-button"]}>
        <NavLink to="/wishlist" activeClassName={classes["active-mobile"]}>
          <FontAwesomeIcon icon={faHeart} />
        </NavLink>
        {wishListItems.length > 0 ? (
          <small>{wishListItems.length}</small>
        ) : null}
      </p>
    </div>
  );
};

export default MobileNavBar;
