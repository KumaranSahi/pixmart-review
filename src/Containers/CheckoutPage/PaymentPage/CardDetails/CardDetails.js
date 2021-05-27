import classes from "./CardDetails.module.css";
import { useState } from "react";
import { useCheckout, useAuth } from "../../../../Store";

const CardDetails = ({ paymentMode, setAddpayment }) => {
  const [nameOnCard, setNameOnCard] = useState("");
  const [nameValid, setNameValid] = useState(true);

  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberValid, setCardNumberValid] = useState(true);

  const [expirationDate, setExpirationDate] = useState("");
  const [expirationDateValid, setExpirationDateValid] = useState(true);

  const [cvv, setCvv] = useState("");
  const [cvvValid, setCvvValid] = useState(true);

  const { addNewPayment, checkoutDispatch, setCheckoutLoading } = useCheckout();
  const { token } = useAuth();

  const cardNumberEntered = (event) => {
    if (!isNaN(event)) setCardNumber(event);
    setCardNumber((number) =>
      number.replace(/^(\d{4})(\d{4})(\d{4})(\d{4})$/, "$1 $2 $3 $4")
    );
  };

  const expirationDateAdded = (event) => {
    if (!isNaN(event)) setExpirationDate(event);
    setExpirationDate((number) => number.replace(/^(\d{2})(\d{2})$/, "$1/$2"));
  };

  const cvvEntered = (event) => {
    if (cvv.length < 3) setCvv(event);
  };

  const checkName = (value) => {
    if (value && value.length > 0) {
      setNameValid(true);
      return true;
    }
    setNameValid(false);
    return false;
  };

  const checkNumber = (value) => {
    if (value && value.length === 19) {
      setCardNumberValid(true);
      return true;
    }
    setCardNumberValid(false);
    return false;
  };

  const checkExpirationDate = (value) => {
    if (value && value.length === 5) {
      setExpirationDateValid(true);
      return true;
    }
    setExpirationDateValid(false);
    return false;
  };

  const checkCvv = (value) => {
    if (value && value.length === 3) {
      setCvvValid(true);
      return true;
    }
    setCvvValid(false);
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
        onChange={(event) => setNameOnCard(event.target.value)}
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
        className={`${classes["button-solid"]} ${classes["button-secondary"]}`}
      >
        Add
      </button>
    </form>
  );
};

export default CardDetails;
