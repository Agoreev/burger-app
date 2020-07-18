import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary";
import { withRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import ContactData from "../checkout/contact-data";
import { connect } from "react-redux";

class Checkout extends Component {
  render() {
    return (
      <div>
        <CheckoutSummary ingridients={this.props.ingridients} />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={() => <ContactData />}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingridients: state.order.ingridients,
    totalPrice: state.order.totalPrice,
  };
};

export default withRouter(connect(mapStateToProps)(Checkout));
