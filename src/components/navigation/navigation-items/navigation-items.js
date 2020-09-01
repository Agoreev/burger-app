import React from "react";
import classes from "./navigation-items.module.css";
import NavigationItem from "./navigation-item";

const NavigationItems = ({ isAuthenticated }) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Burger builder</NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
      {!isAuthenticated ? (
        <NavigationItem link="/auth">Authenticate</NavigationItem>
      ) : (
        <NavigationItem link="/logout">Logout</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
