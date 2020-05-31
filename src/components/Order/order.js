import React from "react";
import classes from "./order.module.css";

const order = () => {
  return (
    <div className={classes.Order}>
      <p>Ingridients: Salad (1)</p>
      <p>
        Price: <strong>USD 5.43</strong>
      </p>
    </div>
  );
};

export default order;
