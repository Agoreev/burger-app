import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary";
import { withRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import ContactData from "../checkout/contact-data";

class Checkout extends Component {
  state = {
    ingridients: {},
    totalPrice: 0,
  };

  componentDidMount() {
    const stateFromPath = this.props.location.state;
    this.setState({
      ingridients: stateFromPath.ingridients,
      totalPrice: stateFromPath.totalPrice,
    });
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <CheckoutSummary ingridients={this.state.ingridients} />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={() => (
            <ContactData
              ingridients={this.state.ingridients}
              totalPrice={this.state.totalPrice}
            />
          )}
        />
      </div>
    );
  }
}

export default withRouter(Checkout);
