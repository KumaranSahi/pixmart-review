import classes from "./AddressPage.module.css";
import { useState } from "react";
import { useCheckout } from "../../../store";
import NewAddress from "./newAddress/NewAddress";
import {
  Radio,
  FormControlLabel,
  FormControl,
  RadioGroup,
} from "@material-ui/core";

export const AddressPage = () => {
  const {
    checkoutDispatch,
    userAddresses,
    address,
    deleteAddress,
    setCheckoutLoading,
    checkoutLoading,
  } = useCheckout();
  const [addNewAddress, setAddNewAddress] = useState(false);
  const addressSelected = (event) => {
    checkoutDispatch({
      type: "SELECT_ADDRESS",
      payload: event.target.value,
    });
  };

  return (
    <div className={classes["address-container"]}>
      <h1>Select Address</h1>
      <hr />

      <FormControl component="fieldset">
        <RadioGroup
          aria-label="select address"
          name="selectAddress"
          value={address && address._id}
          onChange={addressSelected}
        >
          {userAddresses.map((address) => (
            <FormControlLabel
              key={address._id}
              value={address._id}
              control={<Radio color="primary" />}
              label={
                <div className={classes["address"]}>
                  <p>{address.name}</p>
                  <p>{address.number}</p>
                  <p>{address.address}</p>
                  <p>{address.landmark}</p>
                  <button
                    disabled={checkoutLoading}
                    className={`${classes["button-solid"]} ${classes["button-secondary"]}`}
                    onClick={() =>
                      deleteAddress({
                        addressId: address._id,
                        setLoading: setCheckoutLoading,
                        dispatch: checkoutDispatch,
                      })
                    }
                  >
                    Delete Address
                  </button>
                </div>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>
      <button
        disabled={checkoutLoading}
        className={`${classes["button-solid"]} ${classes["button-primary"]}`}
        onClick={() => setAddNewAddress((status) => !status)}
      >
        Add new address
      </button>
      {addNewAddress && (
        <NewAddress addressAdded={() => setAddNewAddress(false)} />
      )}
      {address && (
        <button
          disabled={checkoutLoading}
          className={`${classes["button-solid"]} ${classes["button-primary"]} ${classes["proceed-further-button"]}`}
          onClick={() => {
            checkoutDispatch({
              type: "MOVE_TO_PAYMENT",
            });
          }}
        >
          Proceed to payment
        </button>
      )}
    </div>
  );
};
