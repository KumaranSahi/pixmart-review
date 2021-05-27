import { Navbar } from "../Navbar/Navbar";
import ProductPage from "../ProductsPage/ProductPage";
import { CartPage } from "../CartPage/CartPage";
import WishlistPage from "../WishlistPage/WishlistPage";
import { LandingPage } from "../LandingPage/LandingPage";
import CheckoutPage from "../CheckoutPage/CheckoutPage";
import { SigninPage } from "../SigninPage/SigninPage";

import { Route, Switch, Redirect } from "react-router-dom";
import MobileNavBar from "./MobileNavBar/MobileNavBar";
import { useAuth } from "../../Store";
import { useCheckout } from "../../Store";
import { useProducts } from "../../Store";

import Spinner from "../../UI/Spinner/Spinner";
import classes from "./Mainpage.module.css";

const PrivateLink = ({ ...props }) => {
  const { token } = useAuth();
  return token ? <Route {...props} /> : <Redirect to="/signin" />;
};

const LockSignin = ({ ...props }) => {
  const { token } = useAuth();
  return token ? <Redirect to="/" /> : <Route {...props} />;
};

const Mainpage = () => {
  const { authLoading } = useAuth();
  const { checkoutLoading } = useCheckout();
  const { productLoading } = useProducts();
  return (
    <div>
      {(authLoading || checkoutLoading || productLoading) && <Spinner />}
      <Navbar />
      <div className={classes["main-container"]}>
        <Switch>
          <PrivateLink path="/cart" exact component={CartPage} />
          <PrivateLink path="/wishlist" exact component={WishlistPage} />
          <PrivateLink path="/checkout" exact component={CheckoutPage} />
          <LockSignin path="/signin" exact component={SigninPage} />
          <Route path="/product" exact component={ProductPage} />
          <Route path="/" exact component={LandingPage} />
        </Switch>
        <MobileNavBar />
      </div>
    </div>
  );
};

export default Mainpage;
