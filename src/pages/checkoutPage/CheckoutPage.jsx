import classes from "./CheckoutPage.module.css";
import { useCheckout } from "../../store";
import { AddressPage } from "./addressPage/AddressPage";
import { PaymentPage } from "./paymentPage/PaymentPage";
import { OrderPlacedModal } from "./orderPlacedModal/OrderPlacedModal";
import { OrderSummary } from "./orderSummary/OrderSummary";

export const CheckoutPage = () => {
  const { currentState } = useCheckout();
  const pageToBeRendered = () => {
    switch (currentState) {
      case "ADDRESSPAGE":
        return <AddressPage />;
      case "PAYMENTPAGE":
        return <PaymentPage />;
      case "ORDERSUMMARY":
        return <OrderSummary />;
      case "ORDERPLACED":
        return <OrderPlacedModal />;
      default:
        return <AddressPage />;
    }
  };
  return (
    <div className={classes["checkout-container"]}>{pageToBeRendered()}</div>
  );
};
