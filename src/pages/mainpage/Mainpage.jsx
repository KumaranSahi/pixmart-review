import { Navbar, Spinner } from "../../components";
import { ProductPage } from "../productsPage/ProductPage";
import { CartPage } from "../cartPage/CartPage";
import { WishlistPage } from "../wishlistPage/WishlistPage";
import { LandingPage } from "../landingPage/LandingPage";
import { CheckoutPage } from "../checkoutPage/CheckoutPage";
import { SigninPage } from "../signinPage/SigninPage";

import { Route, Switch, Redirect } from "react-router-dom";
import { MobileNavBar } from "./mobileNavBar/MobileNavBar";
import { useAuth } from "../../store";
import { useCheckout } from "../../store";
import { useProducts } from "../../store";

import classes from "./Mainpage.module.css";

const PrivateLink = ({ ...props }) => {
  const { token } = useAuth();
  return token ? <Route {...props} /> : <Redirect to="/signin" />;
};

const LockSignin = ({ ...props }) => {
  const { token } = useAuth();
  return token ? <Redirect to="/" /> : <Route {...props} />;
};

export const MainPage = () => {
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
