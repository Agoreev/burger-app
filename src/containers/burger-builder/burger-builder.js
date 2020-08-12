import React, { Component, Fragment } from "react";
import Burger from "../../components/burger";
import BuildControls from "../../components/burger/build-controls";
import Modal from "../../components/ui/modal";
import OrderSummary from "../../components/burger/order-summary";
import axios from "../../axios-orders";
import Spinner from "../../components/ui/spinner";
import withErrorHandler from "../../hoc/withErrorHandler";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
    getIngridients,
    changeIngridients,
    purchaseInit,
} from "../../store/actions";

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    };

    componentDidMount() {
        this.props.onGetIngridients();
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push("/checkout");
    };

    onIngridientChange = (type, mod) => {
        this.props.onIngridientsChange(type, mod);
    };

    render() {
        const disabledInfo = {
            ...this.props.ingridients,
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        if (this.props.ingridients) {
            orderSummary = (
                <OrderSummary
                    ingridients={this.props.ingridients}
                    cancel={this.purchaseCancelHandler}
                    continueHandler={this.purchaseContinueHandler}
                    price={this.props.totalPrice}
                />
            );
        }

        let burger = this.props.error ? (
            <p>Ingridients can't be loaded</p>
        ) : (
            <Spinner />
        );
        if (this.props.ingridients) {
            burger = (
                <Fragment>
                    <Burger ingridients={this.props.ingridients}></Burger>
                    <BuildControls
                        onIngridientChange={this.props.onIngridientsChange}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchaseable={this.props.purchaseable}
                        ordered={this.purchaseHandler}
                    />
                </Fragment>
            );
        }

        return (
            <Fragment>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingridients: state.burgerBuilder.ingridients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchaseable: state.burgerBuilder.purchaseable,
        error: state.burgerBuilder.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetIngridients: () => dispatch(getIngridients()),
        onIngridientsChange: (type, mod) =>
            dispatch(changeIngridients(type, mod)),
        onPurchaseInit: () => dispatch(purchaseInit()),
    };
};

export default withErrorHandler(
    withRouter(connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder)),
    axios
);
