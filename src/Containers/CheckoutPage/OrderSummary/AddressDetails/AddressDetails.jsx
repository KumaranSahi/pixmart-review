import classes from "./AddressDetails.module.css";

export const AddressDetails = ({ name, number, pin, address, landmark }) => {
  return (
    <div className={classes["address-details"]}>
      <p>{name}</p>
      <p>{number}</p>
      <p>{landmark}</p>
      <p>{address}</p>
      <p>{pin}</p>
    </div>
  );
};