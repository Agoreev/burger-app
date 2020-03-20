import React from "react";
import BurgerIngridient from "./burger-ingridient";
import classes from "./burger.module.css";

const Burger = ({ ingridients }) => {
  let transformedIngridients = Object.keys(ingridients)
    .map(igKey => {
      return [...Array(ingridients[igKey])].map((_, i) => {
        return <BurgerIngridient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transformedIngridients.length === 0) {
    transformedIngridients = <p>Please start adding ingridients</p>;
  }
  return (
    <div className={classes.burger}>
      <BurgerIngridient type="bread-top"></BurgerIngridient>
      {transformedIngridients}
      <BurgerIngridient type="bread-bottom"></BurgerIngridient>
    </div>
  );
};

export default Burger;
