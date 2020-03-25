import React from "react";
import classes from "./layout.module.css";
import Toolbar from "../navigation/toolbar";
import SideDrawer from "../navigation/side-drawer";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Toolbar />
      <SideDrawer />
      <main className={classes.content}>{children}</main>
    </React.Fragment>
  );
};

export default Layout;
