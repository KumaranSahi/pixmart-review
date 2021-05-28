import { Link } from "react-router-dom";
import classes from "./Logo.module.css";
import logo from "../../../Assets/mk logo finD.png";

export const Logo = () => {
  return (
    <Link to="/">
      <img src={logo} className={classes["logo"]} alt="logo" />
    </Link>
  );
};
