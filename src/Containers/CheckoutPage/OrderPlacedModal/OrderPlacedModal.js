import classes from "./OrderPlacedModal.module.css";
import { Link } from "react-router-dom";
import { useProducts } from "../../../Store";
import { successToast } from "../../../UI/Toast/Toast";

const OrderPlacedModal = () => {
  const { dispatch } = useProducts();

  return (
    <div className={classes["modal-page-container"]}>
      <div className={classes["modal-container"]}>
        <h3>Order Placed</h3>
        <hr />
        <p>
          Thanks for choosing Pixmart! Your order will be delivered to you
          eventually.
        </p>
        <hr />
        <div className={classes["modal-buttons-container"]}>
          <Link
            to="/"
            onClick={() => {
              dispatch({ type: "CLEAR_CART" });
              successToast("Order Placed Successfully!!");
            }}
          >
            <button
              className={`${classes["btn-solid"]} ${classes["btn-primary"]}`}
            >
              Ok
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderPlacedModal;
