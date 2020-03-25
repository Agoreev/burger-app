import React, { Fragment } from "react";

const OrderSummary = ({ ingridients, cancel, makeOrder, price }) => {
  const ingridientSummary = Object.keys(ingridients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {ingridients[igKey]}
      </li>
    );
  });
  return (
    <Fragment>
      <h3>Your order</h3>
      <p>A delicious burger withe the following ingridients:</p>
      <ul>{ingridientSummary}</ul>
      <p>Total price: {price}$</p>
      <p>Continue to checkout?</p>
      <button className="button danger" onClick={cancel}>
        CANCEL
      </button>
      <button className="button success" onClick={makeOrder}>
        CONTINUE
      </button>
    </Fragment>
  );
};

export default OrderSummary;
