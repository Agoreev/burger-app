import React from "react";
import classes from "./order.module.css";

const Order = ({ ingridients, price }) => {
  const arrIngridients = [];
  for (let ingridientName in ingridients) {
    arrIngridients.push({
      name: ingridientName,
      amount: ingridients[ingridientName],
    });
  }
  return (
    <div className={classes.Order}>
      <p>
        Ingridients:
        {arrIngridients.map((ing) => (
          <span
            style={{
              textTransform: "capitalize",
              display: "inline-block",
              margin: "0 8px",
              border: "1px solid #ccc",
              padding: "5px",
            }}
            key={ing.name}
          >
            {ing.name} ({ing.amount})
          </span>
        ))}
      </p>
      <p>
        Price: <strong>USD {price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
