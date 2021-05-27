import classes from "./CheckoutPage.module.css";
import { useCheckout } from "../../Store";
import { AddressPage } from "./AddressPage/AddressPage";
import { PaymentPage } from "./PaymentPage/PaymentPage";
import { OrderPlacedModal } from "./OrderPlacedModal/OrderPlacedModal";
import { OrderSummary } from "./OrderSummary/OrderSummary";

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
