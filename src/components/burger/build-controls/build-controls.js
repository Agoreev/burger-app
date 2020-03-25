import React from "react";
import classes from "./build-controls.module.css";
import BuildControl from "./build-control";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const BuildControls = ({
  onIngridientChange,
  disabled,
  price,
  purchaseable,
  ordered
}) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Total price: <strong>{price}$</strong>
      </p>
      {controls.map(ctrl => {
        return (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            type={ctrl.type}
            onIngridientChange={onIngridientChange}
            disabled={disabled[ctrl.type]}
          />
        );
      })}
      <button
        className={classes.OrderButton}
        disabled={!purchaseable}
        onClick={ordered}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default BuildControls;
