import React, { Component, Fragment } from "react";
import Burger from "../../components/burger";
import BuildControls from "../../components/burger/build-controls";

class BurgerBuilder extends Component {
  state = {
    ingridients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    }
  };

  onIngridientChange = (type, mod) => {
    this.setState(state => {
      return {
        ingridients: {
          ...state.ingridients,
          [type]:
            state.ingridients[type] + mod >= 0
              ? state.ingridients[type] + mod
              : state.ingridients[type]
        }
      };
    });
  };

  render() {
    return (
      <Fragment>
        <Burger ingridients={this.state.ingridients}></Burger>
        <BuildControls onIngridientChange={this.onIngridientChange} />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
