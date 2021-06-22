import classes from "./CardDetails.module.css";
import { useCheckout, useAuth } from "../../../../store";
import { useCardDetailsReducer } from "./CardDetailsReducer";

const CardDetails = ({ paymentMode, setAddpayment }) => {
  const {
    nameOnCard,
    cardNumber,
    expirationDate,
    cvv,
    nameValid,
    cardNumberValid,
    expirationDateValid,
    cvvValid,
    cardDetailsDispatch,
  } = useCardDetailsReducer();

  const {
    addNewPayment,
    checkoutDispatch,
    setCheckoutLoading,
    checkoutLoading,
  } = useCheckout();
  const { token } = useAuth();

  const cardNumberEntered = (event) => {
    if (!isNaN(event))
      cardDetailsDispatch({ type: "ADD_CARD_NUMBER", payload: event });
    if (cardNumber.length === 16)
      cardDetailsDispatch({
        type: "ADD_CARD_NUMBER",
        payload: cardNumber.replace(
          /^(\d{4})(\d{4})(\d{4})(\d{4})$/,
          "$1 $2 $3 $4"
        ),
      });
  };

  const expirationDateAdded = (event) => {
    if (!isNaN(event))
      cardDetailsDispatch({ type: "ADD_EXPIRATION_DATE", payload: event });
    if (expirationDate.length === 4)
      cardDetailsDispatch({
        type: "ADD_EXPIRATION_DATE",
        payload: expirationDate.replace(/^(\d{2})(\d{2})$/, "$1/$2"),
      });
  };

  const cvvEntered = (event) => {
    if (cvv.length < 3)
      cardDetailsDispatch({ type: "ADD_CVV", payload: event });
  };

  const checkName = (value) => {
    if (value && value.length > 0) {
      cardDetailsDispatch({ type: "SET_NAME_ON_CARD_VALID", payload: true });
      return true;
    }
    cardDetailsDispatch({ type: "SET_NAME_ON_CARD_VALID", payload: false });
    return false;
  };

  const checkNumber = (value) => {
    if (value && value.length === 19) {
      cardDetailsDispatch({ type: "SET_CARD_NUMBER_VALID", payload: true });
      return true;
    }
    cardDetailsDispatch({ type: "SET_CARD_NUMBER_VALID", payload: false });
    return false;
  };

  const checkExpirationDate = (value) => {
    if (value && value.length === 5) {
      cardDetailsDispatch({ type: "SET_EXPIRATION_DATE_VALID", payload: true });
      return true;
    }
    cardDetailsDispatch({ type: "SET_EXPIRATION_DATE_VALID", payload: false });
    return false;
  };

  const checkCvv = (value) => {
    if (value && value.length === 3) {
      cardDetailsDispatch({ type: "SET_CVV_VALID", payload: true });
      return true;
    }
    cardDetailsDispatch({ type: "SET_CVV_VALID", payload: true });
    return false;
  };

  const addClicked = (event) => {
    event.preventDefault();
    if (
      checkName(nameOnCard) &&
      checkNumber(cardNumber) &&
      checkExpirationDate(expirationDate) &&
      checkCvv(cvv)
    ) {
      addNewPayment({
        body: {
          paymentType: paymentMode,
          nameOnCard: nameOnCard,
          cardNumber: cardNumber,
          expirationDate: expirationDate,
          cvv: cvv,
        },
        setLoading: setCheckoutLoading,
        dispatch: checkoutDispatch,
        token: token,
      });
      setAddpayment();
    }
  };

  return (
    <form className={classes["card-details"]} onSubmit={addClicked}>
      <input
        type="text"
        className={classes["textbox"]}
        required
        placeholder="Name on card"
        value={nameOnCard}
        onChange={(event) =>
          cardDetailsDispatch({
            type: "ADD_NAME_ON_CARD",
            payload: event.target.value,
          })
        }
      />
      {!nameValid && (
        <p className={classes["error-text"]}>Please enter a valid name</p>
      )}
      <input
        type="text"
        className={classes["textbox"]}
        placeholder="Card number"
        value={cardNumber}
        onChange={(event) => cardNumberEntered(event.target.value)}
      />
      {!cardNumberValid && (
        <p className={classes["error-text"]}>
          Please enter a valid card 16 digit card number
        </p>
      )}
      <div className={classes["expiry-cvv"]}>
        <input
          type="text"
          className={classes["textbox"]}
          placeholder="MMYY"
          value={expirationDate}
          onChange={(event) => expirationDateAdded(event.target.value)}
        />
        <input
          type="number"
          className={classes["textbox"]}
          placeholder="CVV"
          value={cvv}
          onChange={(event) => cvvEntered(event.target.value)}
        />
      </div>
      {!(cvvValid && expirationDateValid) && (
        <p className={classes["error-text"]}>
          Please verify your cvv and expiration date
        </p>
      )}
      <button
        type="submit"
        disabled={checkoutLoading}
        className={`${classes["button-solid"]} ${classes["button-secondary"]}`}
      >
        Add
      </button>
    </form>
  );
};

export default CardDetails;
