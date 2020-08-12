import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary";
import { withRouter } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";
import ContactData from "../checkout/contact-data";
import { connect } from "react-redux";

class Checkout extends Component {
  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingridients) {
      summary = (
        <div>
          <CheckoutSummary ingridients={this.props.ingridients} />
          <Route
            path={this.props.match.path + "/contact-data"}
            render={() => <ContactData />}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ingridients: state.burgerBuilder.ingridients,
    totalPrice: state.burgerBuilder.totalPrice,
  };
};

export default withRouter(connect(mapStateToProps)(Checkout));
