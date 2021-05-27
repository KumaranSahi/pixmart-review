import Navbar from "../navbar/navbar";
import ProductPage from "../ProductsPage/ProductPage";
import CartPage from "../CartPage/CartPage";
import WishlistPage from "../WishlistPage/WishlistPage";
import LandingPage from "../LandingPage/LandingPage";
import CheckoutPage from "../CheckoutPage/CheckoutPage";
import LoginPage from "../LoginPage/LoginPage";

import { Route, Switch, Redirect } from "react-router-dom";
import MobileNavBar from "./MobileNavBar/MobileNavBar";
import { useAuth } from "../../Store/AuthReducer/AuthContext";
import { useCheckout } from "../../Store/CheckoutContext";
import { useProducts } from "../../Store/ProductsContext";

import Spinner from "../../UI/Spinner/Spinner";

const PrivateLink = ({ ...props }) => {
  const { token } = useAuth();
  return token ? <Route {...props} /> : <Redirect to="/login" />;
};

const LockLogin = ({ ...props }) => {
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
      <Switch>
        <PrivateLink path="/cart" exact component={CartPage} />
        <PrivateLink path="/wishlist" exact component={WishlistPage} />
        <PrivateLink path="/checkout" exact component={CheckoutPage} />
        <LockLogin path="/login" exact component={LoginPage} />
        <Route path="/product" exact component={ProductPage} />
        <Route path="/" exact component={LandingPage} />
      </Switch>
      <MobileNavBar />
    </div>
  );
};

export default Mainpage;
