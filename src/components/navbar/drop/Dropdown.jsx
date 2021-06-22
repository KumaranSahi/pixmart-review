import classes from "./Dropdown.module.css";
import { Preferences } from "../../../Containers/Preferences/Preferences";

export const Dropdown = ({ open }) => {
  return open ? (
    <div className={classes["dropdown-menu"]}>
      <Preferences />
    </div>
  ) : null;
};
