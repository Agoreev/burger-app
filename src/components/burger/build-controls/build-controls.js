import React from "react";
import classes from "./build-controls.module.css";
import BuildControl from "./build-control";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const BuildControls = ({ onIngridientChange }) => {
  return (
    <div className={classes.BuildControls}>
      {controls.map(ctrl => {
        return (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            type={ctrl.type}
            onIngridientChange={onIngridientChange}
          />
        );
      })}
    </div>
  );
};

export default BuildControls;
