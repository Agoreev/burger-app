import React from "react";
import Logo from "../../logo";
import NavigationItems from "../navigation-items";
import classes from "./side-drawer.module.css";

const SideDrawer = () => {
  return (
    <div className={classes.SideDrawer}>
      <div className={classes.Logo}>
        <Logo />
      </div>

      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default SideDrawer;
