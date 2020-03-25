import React, { Component, Fragment } from "react";
import Burger from "../../components/burger";
import BuildControls from "../../components/burger/build-controls";
import Modal from "../../components/ui/modal";
import OrderSummary from "../../components/burger/order-summary";

const INGRIDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingridients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert("CONGRATULATIONS!");
  };

  updatePurchaseState = ingridients => {
    const sum = Object.keys(ingridients)
      .map(igKey => {
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
      [type]: this.state.ingridients[type] + mod
    };
    this.setState(state => {
      return {
        ingridients: updatedIngridients,
        totalPrice: +(state.totalPrice + mod * INGRIDIENT_PRICES[type]).toFixed(
          2
        )
      };
    });
    this.updatePurchaseState(updatedIngridients);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingridients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingridients={this.state.ingridients}
            cancel={this.purchaseCancelHandler}
            makeOrder={this.purchaseContinueHandler}
            price={this.state.totalPrice}
          />
        </Modal>
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
}

export default BurgerBuilder;
