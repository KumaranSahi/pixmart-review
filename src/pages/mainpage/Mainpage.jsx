import { Navbar, Spinner } from "../../components";
import { ProductPage } from "../productsPage/ProductPage";
import { CartPage } from "../cartPage/CartPage";
import { WishlistPage } from "../wishlistPage/WishlistPage";
import { LandingPage } from "../landingPage/LandingPage";
import { CheckoutPage } from "../checkoutPage/CheckoutPage";
import { SigninPage } from "../signinPage/SigninPage";

import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { MobileNavBar } from "./mobileNavBar/MobileNavBar";
import { useCheckout, useAuth, useProducts } from "../../store";

import { setupAuthExceptionHandler } from "../../axiosUtils";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

import classes from "./Mainpage.module.css";

const PrivateLink = ({ ...props }) => {
  const token = localStorage.getItem("token");
  return token ? <Route {...props} /> : <Redirect to="/signin" />;
};

const LockSignin = ({ ...props }) => {
  const token = localStorage.getItem("token");
  return token ? <Redirect to="/" /> : <Route {...props} />;
};

export const MainPage = () => {
  const { authLoading } = useAuth();
  const { checkoutLoading } = useCheckout();
  const { productLoading } = useProducts();

  const { push } = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setupAuthExceptionHandler(push);
  }, [push]);

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
