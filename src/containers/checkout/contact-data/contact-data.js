import React, { Component } from "react";
import "./contact-data.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/ui/spinner";
import { withRouter } from "react-router-dom";
import Input from "../../../components/ui/input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elType: "input",
        elConfig: {
          type: "text",
          placeholder: "Your name",
        },
        value: "",
      },
      house: {
        elType: "input",
        elConfig: {
          type: "text",
          placeholder: "House",
        },
        value: "",
      },
      street: {
        elType: "input",
        elConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
      },
      city: {
        elType: "input",
        elConfig: {
          type: "text",
          placeholder: "City",
        },
        value: "",
      },
      country: {
        elType: "input",
        elConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
      },
      email: {
        elType: "input",
        elConfig: {
          type: "email",
          placeholder: "E-mail",
        },
        value: "",
      },
      deliveryMethod: {
        elType: "select",
        elConfig: {
          options: [
            { value: "fastest", displayName: "Fastest" },
            { value: "cheapest", displayName: "Cheapest" },
          ],
        },
        value: "",
      },
    },
    loading: false,
  };

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingridients: this.props.ingridients,
      price: this.props.totalPrice,
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
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({ id: key, config: this.state.orderForm[key] });
    }
    let form = (
      <form>
        {formElementsArray.map((el) => {
          return (
            <Input
              key={el.id}
              elType={el.config.elType}
              label={el.id}
              value={el.config.value}
              elConfig={el.config.elConfig}
            />
          );
        })}
        {/* <Input
          type="email"
          name="email"
          placeholder="Your email"
          inputtype="input"
        />
        <Input
          type="text"
          name="street"
          placeholder="Street"
          inputtype="input"
        />
        <Input type="text" name="hose" placeholder="House" inputtype="input" /> */}
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
