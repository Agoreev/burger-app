import React, { Fragment } from "react";
import classes from "./modal.module.css";
import Backdrop from "../backdrop";

const Modal = ({ show, modalClosed, children }) => {
  return (
    <Fragment>
      <Backdrop show={show} clicked={modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: show ? "translateY(0)" : "translateY(-100vh)",
          opacity: show ? 1 : 0
        }}
      >
        {children}
      </div>
    </Fragment>
  );
};

export default Modal;
