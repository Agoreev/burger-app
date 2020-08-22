import React, { Component } from "react";
import Order from "../../components/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler";
import { getOrders } from "../../store/actions";
import { connect } from "react-redux";
import Spinner from "../../components/ui/spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.onGetOrders();
  }
  render() {
    if (this.props.loading) {
      return <Spinner />;
    }
    return (
      <div>
        {this.props.orders.map((order) => (
          <Order
            key={order.id}
            ingridients={order.ingridients}
            price={+order.price}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loadingOrders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetOrders: () => dispatch(getOrders()),
  };
};

export default withErrorHandler(
  connect(mapStateToProps, mapDispatchToProps)(Orders),
  axios
);
