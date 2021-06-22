import classes from "./Navbar.module.css";
import { Logo } from "./logo/Logo";
import { Hamburger } from "./hamburger/Hamburger";
import { DesktopNavMenu } from "./desktopNavMenu/DesktopNavMenu";
import { useLocation } from "react-router-dom";
import { Avatar } from "./avatar/Avatar";

export const Navbar = () => {
  let { pathname } = useLocation();
  return (
    <nav className={classes["navbar"]}>
      {pathname === "/product" ? (
        <div className={classes["desktop-spacer"]}></div>
      ) : (
        <Logo />
      )}
      <DesktopNavMenu />
      {pathname === "/product" ? <Hamburger /> : null}
      <Avatar />
    </nav>
  );
};
