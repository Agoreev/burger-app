import React from "react";
import burgerLogo from "../../assets/images/original.png";
import classes from "./logo.module.css";

const Logo = () => {
  return (
    <div className={classes.Logo}>
      <img src={burgerLogo} alt="Logo" />
    </div>
  );
};

export default Logo;
