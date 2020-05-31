import React from "react";
import Burger from "../../burger";
import classes from "./checkoutSummary.module.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

const checkoutSummary = ({ ingridients, match }) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingridients={ingridients}></Burger>
      </div>
      <Link className="button danger" to="/">
        CANCEL
      </Link>
      <Link className="button success" to={match.path + "/contact-data"}>
        CONTINUE
      </Link>
    </div>
  );
};

export default withRouter(checkoutSummary);
