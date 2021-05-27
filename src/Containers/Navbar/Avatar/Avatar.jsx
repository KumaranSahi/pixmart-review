import classes from "./Avatar.module.css";
import { useState } from "react";
import { useAuth } from "../../../Store/AuthReducer/AuthContext";
import profileImage from "../../../Assets/profileimage.jpg";
import { Link, useLocation } from "react-router-dom";

export const Avatar = () => {
  const { userName, signOutUser, authDispatch } = useAuth();

  const [openDropdown, setOpenDropdown] = useState(false);

  let { pathname } = useLocation();

  
  let avatar = pathname !== "/signin" && (
    <div className={classes["name-avatar-container"]}>
      <Link to="/signin" style={{marginTop:"1.5rem"}}>Login</Link>
    </div>
  );

  if (userName) {
    avatar = (
      <div className={classes["name-avatar-container"]}>
        <p onClick={() => setOpenDropdown((open) => !open)}>
          Hello, {userName}
        </p>
        <div className={classes["avatar-container"]}>
          <img
            src={profileImage}
            className={classes["avatar"]}
            alt="Active avatar"
            onClick={() => setOpenDropdown((open) => !open)}
          />
          <div
            className={`${classes["avatar-bubble"]} ${classes["bubble-active"]}`}
          ></div>
          {openDropdown && (
            <ul className={classes["signout-dropdown"]}>
              <li
                onClick={() => {
                  signOutUser(authDispatch);
                  setOpenDropdown(false);
                }}
              >
                Sign out
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  }

  return <div>{avatar}</div>;
};