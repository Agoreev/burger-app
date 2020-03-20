import React from "react";
import classes from "./layout.module.css";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div>Toolbar</div>
      <main className={classes.content}>{children}</main>
    </React.Fragment>
  );
};

export default Layout;
