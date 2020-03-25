import React from "react";
import classes from "./build-control.module.css";

const BuildControl = ({ label, type, onIngridientChange, disabled }) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{label}</div>
      <button
        className={classes.Less}
        onClick={() => onIngridientChange(type, -1)}
        disabled={disabled}
      >
        Less
      </button>
      <button
        className={classes.More}
        onClick={() => onIngridientChange(type, 1)}
      >
        More
      </button>
    </div>
  );
};

export default BuildControl;
