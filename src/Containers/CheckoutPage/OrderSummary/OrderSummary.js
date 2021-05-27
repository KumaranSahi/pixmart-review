import classes from "./OrderSummary.module.css";
import { useCheckout } from "../../../Store/CheckoutContext";
import { useProducts } from "../../../Store";
import OrderSummaryCard from "./OrderSummaryCard/OrderSummaryCard";
import AddressDetails from "./AddressDetails/AddressDetails";
import PaymentDetails from "./PaymentDetails/PaymentDetails";

const OrderSummary = () => {
  const { cartItems, totalCost, dispatch } = useProducts();
  const { paymentDetails, address, placeOrder } = useCheckout();
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
        onClick={() => {
          const products = cartItems.map(({ product: { _id }, quantity }) => ({
            product: _id,
            quantity: quantity,
          }));
          placeOrder({ products: products, totalCost: totalCost });
          dispatch({ type: "CLEAR_CART" });
        }}
      >
        Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
