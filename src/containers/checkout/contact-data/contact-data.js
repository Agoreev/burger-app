import React, { Component } from "react";
import "./contact-data.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/ui/spinner";
import { withRouter } from "react-router-dom";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      house: "",
    },
    loading: false,
  };

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingridients: this.props.ingridients,
      price: this.props.totalPrice,
      customer: {
        name: "Artem",
        address: {
          house: "25",
          street: "Test street",
          city: "Moscow",
          country: "Russia",
        },
        email: "test@test.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        console.log(response);

        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="Your name" />
        <input type="email" name="email" placeholder="Your email" />
        <input type="text" name="street" placeholder="Street" />
        <input type="text" name="hose" placeholder="House" />
        <button
          type="submit"
          className="button success"
          onClick={(e) => this.orderHandler(e)}
        >
          ORDER
        </button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className="contact-data">
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default withRouter(ContactData);
