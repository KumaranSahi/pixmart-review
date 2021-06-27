import classes from "./Avatar.module.css";
import { useState } from "react";
import { useAuth } from "../../../store";
import profileImage from "../../../assets/profileimage.jpg";
import { Link, useLocation } from "react-router-dom";
import { setupAuthHeaderForServiceCalls } from "../../../axiosUtils";

export const Avatar = () => {
  const { userName, signOutUser, authDispatch } = useAuth();

  const [openDropdown, setOpenDropdown] = useState(false);

  let { pathname } = useLocation();

  let avatar = pathname !== "/signin" && (
    <div className={classes["name-avatar-container"]}>
      <Link to="/signin" style={{ marginTop: "1.5rem" }}>
        Login
      </Link>
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
                  signOutUser({ dispatch: authDispatch });
                  setupAuthHeaderForServiceCalls(null);
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
