import classes from "./PaymentPage.module.css";
import {
  Radio,
  FormControlLabel,
  FormControl,
  RadioGroup,
} from "@material-ui/core";
import { useCheckout, useProducts, useAuth } from "../../../store";
import { useState } from "react";
import CardDetails from "./CardDetails/CardDetails";

export const PaymentPage = () => {
  const [paymentMode, setPaymentMode] = useState("CREDITCARD");

  const {
    userPaymentDetails,
    paymentDetails,
    deletePaymentDetails,
    checkoutDispatch,
    setCheckoutLoading,
    checkoutLoading
  } = useCheckout();
  const { totalCost } = useProducts();
  const { token } = useAuth();

  const [addPayment, setAddpayment] = useState(false);

  const paymentSelected = (event) => {
    checkoutDispatch({
      type: "ADD_PAYMENT_DETAILS",
      payload: event.target.value,
    });
  };

  return (
    <div className={classes["payment-container"]}>
      <h1>Select Payment Option</h1>
      <hr />
      <h2>Total Cost: Rs. {totalCost}</h2>
      <div className={classes["form-container"]}>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="Payment mode"
            name="payment mode"
            value={paymentMode}
            onChange={(event) => {
              setPaymentMode(event.target.value);
              if (event.target.value === "COD")
                checkoutDispatch({
                  type: "ADD_PAYMENT_DETAILS",
                  payload: "COD",
                });
              else
                checkoutDispatch({
                  type: "ADD_PAYMENT_DETAILS",
                  payload: null,
                });
            }}
          >
            <FormControlLabel
              value="CREDITCARD"
              control={<Radio color="primary" />}
              label="Credit Card"
            />
            {paymentMode === "CREDITCARD" && (
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="select payment"
                  name="selectPayment"
                  value={
                    paymentDetails &&
                    paymentDetails !== "COD" &&
                    paymentDetails._id
                  }
                  onChange={paymentSelected}
                >
                  {userPaymentDetails.map((payment) =>
                    payment.paymentType === "CREDITCARD" ? (
                      <FormControlLabel
                        key={payment._id}
                        value={payment._id}
                        control={<Radio color="primary" />}
                        label={
                          <div className={classes["payment"]}>
                            <p>{payment.nameOnCard}</p>
                            <p>{payment.cardNumber}</p>
                            <p>{payment.expirationDate}</p>
                            <p>{payment.cvv}</p>
                            <button
                              className={`${classes["button-solid"]} ${classes["button-secondary"]}`}
                              disabled={checkoutLoading}
                              onClick={() =>
                                deletePaymentDetails({
                                  paymentId: payment._id,
                                  setLoading: setCheckoutLoading,
                                  token: token,
                                  dispatch: checkoutDispatch,
                                })
                              }
                            >
                              Delete Payment detail
                            </button>
                          </div>
                        }
                      />
                    ) : null
                  )}
                </RadioGroup>
              </FormControl>
            )}
            {paymentMode === "CREDITCARD" && (
              <button
                onClick={() => setAddpayment((flag) => !flag)}
                disabled={checkoutLoading}
                className={`${classes["button-solid"]} ${classes["button-primary"]} ${classes["button-add-new-payment"]}`}
              >
                Add new payment
              </button>
            )}
            {addPayment && paymentMode === "CREDITCARD" && (
              <CardDetails
                setAddpayment={() => setAddpayment(false)}
                paymentMode={paymentMode}
              />
            )}
            <FormControlLabel
              value="DEBITCARD"
              control={<Radio color="primary" />}
              label="Debit Card"
            />
            {paymentMode === "DEBITCARD" && (
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="select payment"
                  name="selectPayment"
                  value={
                    paymentDetails &&
                    paymentDetails !== "COD" &&
                    paymentDetails._id
                  }
                  onChange={paymentSelected}
                >
                  {userPaymentDetails.map((payment) =>
                    payment.paymentType === "DEBITCARD" ? (
                      <FormControlLabel
                        key={payment._id}
                        value={payment._id}
                        control={<Radio color="primary" />}
                        label={
                          <div className={classes["payment"]}>
                            <p>{payment.nameOnCard}</p>
                            <p>{payment.cardNumber}</p>
                            <p>{payment.expirationDate}</p>
                            <p>{payment.cvv}</p>
                            <button
                              className={`${classes["button-solid"]} ${classes["button-secondary"]}`}
                              disabled={checkoutLoading}
                              onClick={() =>
                                deletePaymentDetails({
                                  paymentId: payment._id,
                                  setLoading: setCheckoutLoading,
                                  token: token,
                                  dispatch: checkoutDispatch,
                                })
                              }
                            >
                              Delete Payment detail
                            </button>
                          </div>
                        }
                      />
                    ) : null
                  )}
                </RadioGroup>
              </FormControl>
            )}
            {paymentMode === "DEBITCARD" && (
              <button
                onClick={() => setAddpayment((flag) => !flag)}
                disabled={checkoutLoading}
                className={`${classes["button-solid"]} ${classes["button-primary"]} ${classes["button-add-new-payment"]}`}
              >
                Add new payment
              </button>
            )}
            {addPayment && paymentMode === "DEBITCARD" && (
              <CardDetails
                setAddpayment={() => setAddpayment(false)}
                paymentMode={paymentMode}
              />
            )}
            <FormControlLabel
              value="COD"
              control={<Radio color="primary" />}
              label="Cash on Delivery"
            />
          </RadioGroup>
        </FormControl>
      </div>
      {paymentDetails && (
        <button
          className={`${classes["button-solid"]} ${classes["button-primary"]} ${classes["button-continue"]}`}
          disabled={checkoutLoading}
          onClick={() => checkoutDispatch({ type: "MOVE_TO_ORDER_SUMMARY" })}
        >
          Continue
        </button>
      )}
    </div>
  );
};