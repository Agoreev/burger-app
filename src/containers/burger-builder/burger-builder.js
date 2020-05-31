import React, { Component, Fragment } from "react";
import Burger from "../../components/burger";
import BuildControls from "../../components/burger/build-controls";
import Modal from "../../components/ui/modal";
import OrderSummary from "../../components/burger/order-summary";
import axios from "../../axios-orders";
import Spinner from "../../components/ui/spinner";
import withErrorHandler from "../../hoc/withErrorHandler";
import { withRouter } from "react-router-dom";

const INGRIDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingridients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: null,
  };

  componentDidMount() {
    axios
      .get("https://burger-app-67311.firebaseio.com/ingridients.json")
      .then((response) => {
        console.log(response);
        this.setState({ ingridients: response.data });
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

  purchaseContinueHandler = () => {
    this.props.history.push({
      pathname: "/checkout",
      state: {
        ingridients: this.state.ingridients,
        totalPrice: this.state.totalPrice,
      },
    });
  };

  updatePurchaseState = (ingridients) => {
    const sum = Object.keys(ingridients)
      .map((igKey) => {
        return ingridients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchaseable: sum > 0 });
  };

  onIngridientChange = (type, mod) => {
    if (this.state.ingridients[type] + mod < 0) {
      return;
    }
    const updatedIngridients = {
      ...this.state.ingridients,
      [type]: this.state.ingridients[type] + mod,
    };
    this.setState((state) => {
      return {
        ingridients: updatedIngridients,
        totalPrice: +(state.totalPrice + mod * INGRIDIENT_PRICES[type]).toFixed(
          2
        ),
      };
    });
    this.updatePurchaseState(updatedIngridients);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingridients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    if (this.state.ingridients) {
      orderSummary = (
        <OrderSummary
          ingridients={this.state.ingridients}
          cancel={this.purchaseCancelHandler}
          makeOrder={this.purchaseContinueHandler}
          price={this.state.totalPrice}
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
    if (this.state.ingridients) {
      burger = (
        <Fragment>
          <Burger ingridients={this.state.ingridients}></Burger>
          <BuildControls
            onIngridientChange={this.onIngridientChange}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
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

export default withErrorHandler(withRouter(BurgerBuilder), axios);
