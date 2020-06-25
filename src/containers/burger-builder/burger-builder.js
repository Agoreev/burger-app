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

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: null,
    };

    componentDidMount() {
        axios
            .get("https://burger-app-67311.firebaseio.com/ingridients.json")
            .then((response) => {
                this.props.onGetIngridients(response.data);
            })
            .catch((error) => {
                this.setState({ error: true });
            });
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
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
                    price={this.props.totalPrice}
                />
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        let burger = this.state.error ? (
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
        ingridients: state.ingridients,
        totalPrice: state.totalPrice,
        purchaseable: state.purchaseable,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetIngridients: (ingridients) =>
            dispatch({ type: "GET_INGRIDIENTS", payload: ingridients }),
        onIngridientsChange: (type, mod) =>
            dispatch({
                type: "CHANGE_INGRIDIENTS",
                payload: { type: type, mod: mod },
            }),
    };
};

export default withErrorHandler(
    withRouter(connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder)),
    axios
);
