import classes from "./Dropdown.module.css";
import { Preferences } from "../../../pages/preferences/Preferences";

export const Dropdown = ({ open }) => {
  return open ? (
    <div className={classes["dropdown-menu"]}>
      <Preferences />
    </div>
  ) : null;
};
