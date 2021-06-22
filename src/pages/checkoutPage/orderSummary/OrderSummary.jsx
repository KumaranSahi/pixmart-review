import classes from "./OrderSummary.module.css";
import { useCheckout, useProducts } from "../../../store";
import { OrderSummaryCard } from "./orderSummaryCard/OrderSummaryCard";
import { AddressDetails } from "./addressDetails/AddressDetails";
import { PaymentDetails } from "./paymentDetails/PaymentDetails";

export const OrderSummary = () => {
  const { cartItems, totalCost, productDispatch } = useProducts();
  const {
    paymentDetails,
    address,
    placeOrder,
    setCheckoutLoading,
    checkoutDispatch,
    checkoutLoading,
  } = useCheckout();
  return (
    <div className={classes["order-summary-container"]}>
      <h1>Order Summary</h1>
      <hr />
      <h2>Total Cost: Rs. {totalCost}</h2>
      <ul>
        {cartItems &&
          cartItems.map(({ product: { _id: id, name, image }, quantity }) => (
            <li key={id}>
              <OrderSummaryCard name={name} quantity={quantity} image={image} />
            </li>
          ))}
      </ul>
      <hr />
      <h2>Address</h2>
      <AddressDetails
        name={address.name}
        number={address.number}
        pin={address.pin}
        address={address.address}
        landmark={address.landmark}
      />
      <hr />
      <h2>Payment Details</h2>
      {paymentDetails === "COD" ? (
        <PaymentDetails paymentMode={paymentDetails} />
      ) : (
        <PaymentDetails
          paymentMode={paymentDetails.paymentMode}
          nameOnCard={paymentDetails.nameOnCard}
          cardNumber={paymentDetails.cardNumber}
          expirationDate={paymentDetails.expirationDate}
          cvv={paymentDetails.cvv}
        />
      )}
      <button
        className={`${classes["button-solid"]} ${classes["button-primary"]}`}
        type="submit"
        disabled={checkoutLoading}
        onClick={() => {
          const products = cartItems.map(({ product: { _id }, quantity }) => ({
            product: _id,
            quantity: quantity,
          }));
          placeOrder({
            body: { products: products, totalCost: totalCost },
            setLoading: setCheckoutLoading,
            dispatch: checkoutDispatch,
          });
          productDispatch({ type: "CLEAR_CART" });
        }}
      >
        Checkout
      </button>
    </div>
  );
};
