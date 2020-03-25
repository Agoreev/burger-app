import React from "react";
import classes from "./toolbar.module.css";
import Logo from "../../logo";
import NavigationItems from "../navigation-items";
import NavigationItem from "../navigation-items/navigation-item";

const Toolbar = () => {
  return (
    <header className={classes.Toolbar}>
      <div>Menu</div>
      <div className={classes.Logo}>
        <Logo />
      </div>

      <nav>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default Toolbar;
