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
            const purchasedRedirect = this.props.purchased ? (
                <Redirect to="/" />
            ) : null;
            summary = (
                <div>
                    {purchasedRedirect}
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
        purchased: state.orders.purchased,
    };
};

export default withRouter(connect(mapStateToProps)(Checkout));
