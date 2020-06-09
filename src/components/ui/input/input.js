import React from "react";
import classes from "./input.module.css";

const input = ({ elType, elConfig, value, label }) => {
  let inputElement = null;
  switch (elType) {
    case "input":
      inputElement = (
        <input className={classes.InputElement} {...elConfig} value={value} />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={classes.InputElement}
          {...elConfig}
          value={value}
        />
      );
      break;
    case "select":
      inputElement = (
        <select className={classes.InputElement} value={value}>
          {elConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayName}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input className={classes.InputElement} {...elConfig} value={value} />
      );
      break;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{label}</label>
      {inputElement}
    </div>
  );
};

export default input;
