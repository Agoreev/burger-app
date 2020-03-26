import React, { Fragment } from "react";
import Logo from "../../logo";
import NavigationItems from "../navigation-items";
import classes from "./side-drawer.module.css";
import Backdrop from "../../ui/backdrop";

const SideDrawer = ({ closed, open }) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Fragment>
      <Backdrop show={open} clicked={closed} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>

        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Fragment>
  );
};

export default SideDrawer;
