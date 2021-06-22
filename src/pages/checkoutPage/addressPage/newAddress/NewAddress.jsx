import { useRef, useEffect } from "react";
import classes from "./NewAddress.module.css";
import { useAuth, useCheckout } from "../../../../store";
import { useNewAddressReducer } from "./NewAddressReducer";

const NewAddress = ({ addressAdded }) => {
  const nameRef = useRef();

  const {
    addNewAddress,
    setCheckoutLoading,
    checkoutDispatch,
    checkoutLoading,
  } = useCheckout();
  const { token } = useAuth();

  const {
    name,
    nameValid,
    number,
    numberValid,
    pin,
    pinValid,
    address,
    addressValid,
    landmark,
    landmarkValid,
    newAddressDispatch,
  } = useNewAddressReducer();

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const validateName = (value) => {
    if (value.length > 0) {
      newAddressDispatch({
        type: "SET_NAME_VALID",
        payload: true,
      });
      return true;
    }
    newAddressDispatch({
      type: "SET_NAME_VALID",
      payload: false,
    });
    return false;
  };

  const validateNumber = (value) => {
    if (value.length === 10) {
      newAddressDispatch({
        type: "SET_NUMBER_VALID",
        payload: true,
      });
      return true;
    }
    newAddressDispatch({
      type: "SET_NUMBER_VALID",
      payload: false,
    });
    return false;
  };

  const validatePin = (value) => {
    if (value.length === 6) {
      newAddressDispatch({
        type: "SET_PIN_VALID",
        payload: true,
      });
      return true;
    }
    newAddressDispatch({
      type: "SET_PIN_VALID",
      payload: false,
    });
    return false;
  };

  const validateAddress = (value) => {
    if (value.length >= 20) {
      newAddressDispatch({
        type: "SET_ADDRESS_VALID",
        payload: true,
      });
      return true;
    }
    newAddressDispatch({
      type: "SET_ADDRESS_VALID",
      payload: false,
    });
    return false;
  };

  const validateLandmark = (value) => {
    if (value.length >= 5) {
      newAddressDispatch({
        type: "SET_LANDMARK_VALID",
        payload: true,
      });
      return true;
    }
    newAddressDispatch({
      type: "SET_LANDMARK_VALID",
      payload: false,
    });
    return false;
  };

  const submitClicked = (event) => {
    event.preventDefault();
    setTimeout(() => {
      if (
        validateName(name) &&
        validateNumber(number) &&
        validatePin(pin) &&
        validateAddress(address) &&
        validateLandmark(landmark)
      ) {
        addNewAddress({
          body: {
            name: name,
            number: number,
            pin: pin,
            address: address,
            landmark: landmark,
          },
          setLoading: setCheckoutLoading,
          dispatch: checkoutDispatch,
          token: token,
        });
        addressAdded();
      }
    });
  };

  return (
    <form onSubmit={submitClicked} className={classes["add-new-address"]}>
      <label className={classes["form-field"]}>
        <span>Full Name:</span>
        <input
          type="text"
          className={classes["textbox"]}
          placeholder="Full Name"
          ref={nameRef}
          value={name}
          required
          onChange={(event) =>
            newAddressDispatch({
              type: "ADD_NAME",
              payload: event.target.value,
            })
          }
        />
        {!nameValid && (
          <p className={classes["error-text"]}>Please enter a valid name</p>
        )}
      </label>
      <label className={classes["form-field"]}>
        <span>Mobile Number:</span>
        <input
          type="number"
          className={classes["textbox"]}
          placeholder="Mobile Number"
          value={number}
          required
          onChange={(event) =>
            newAddressDispatch({
              type: "ADD_NUMBER",
              payload: event.target.value,
            })
          }
        />
        {!numberValid && (
          <p className={classes["error-text"]}>
            Please enter a valid mobile number
          </p>
        )}
      </label>
      <label className={classes["form-field"]}>
        <span>PIN code:</span>
        <input
          type="number"
          className={classes["textbox"]}
          placeholder="PIN code"
          value={pin}
          required
          onChange={(event) =>
            newAddressDispatch({
              type: "ADD_PIN",
              payload: event.target.value,
            })
          }
        />
        {!pinValid && (
          <p className={classes["error-text"]}>
            Please enter a valid pin number
          </p>
        )}
      </label>
      <label className={classes["form-field"]}>
        <span>Address:</span>
        <textarea
          className={classes["textarea"]}
          placeholder="Address"
          value={address}
          required
          onChange={(event) =>
            newAddressDispatch({
              type: "ADD_ADDRESS",
              payload: event.target.value,
            })
          }
        ></textarea>
        {!addressValid && (
          <p className={classes["error-text"]}>
            Please enter a valid address with atleast 20 characters
          </p>
        )}
      </label>
      <label className={classes["form-field"]}>
        <span>Landmark:</span>
        <input
          type="text"
          className={classes["textbox"]}
          placeholder="Landmark"
          value={landmark}
          required
          onChange={(event) =>
            newAddressDispatch({
              type: "ADD_LANDMARK",
              payload: event.target.value,
            })
          }
        />
        {!landmarkValid && (
          <p className={classes["error-text"]}>
            Please enter a valid landmark with atleast 5 characters
          </p>
        )}
      </label>
      <button
        className={`${classes["button-solid"]} ${classes["button-primary"]}`}
        disabled={checkoutLoading}
        type="submit"
      >
        Add Address
      </button>
    </form>
  );
};

export default NewAddress;
