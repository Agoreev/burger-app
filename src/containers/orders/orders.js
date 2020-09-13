import React, { Component } from "react";
import Order from "../../components/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler";
import { getOrders } from "../../store/actions";
import { connect } from "react-redux";
import Spinner from "../../components/ui/spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.onGetOrders(this.props.token);
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
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetOrders: (token) => dispatch(getOrders(token)),
  };
};

export default withErrorHandler(
  connect(mapStateToProps, mapDispatchToProps)(Orders),
  axios
);
