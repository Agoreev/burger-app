import React, { Component } from "react";
import "./contact-data.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/ui/spinner";
import { withRouter } from "react-router-dom";
import Input from "../../../components/ui/input";
import withErrorHandler from "../../../hoc/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

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
        validation: {
          required: true,
          valid: false,
        },
        touched: false,
      },
      house: {
        elType: "input",
        elConfig: {
          type: "text",
          placeholder: "House",
        },
        value: "",
        validation: {
          required: true,
          valid: false,
        },

        touched: false,
      },
      street: {
        elType: "input",
        elConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
          valid: false,
        },
        touched: false,
      },
      city: {
        elType: "input",
        elConfig: {
          type: "text",
          placeholder: "City",
        },
        value: "",
        validation: {
          required: true,
          valid: false,
        },
        touched: false,
      },
      country: {
        elType: "input",
        elConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
          valid: false,
        },
        touched: false,
      },
      email: {
        elType: "input",
        elConfig: {
          type: "email",
          placeholder: "E-mail",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          valid: false,
        },
        touched: false,
      },
      deliveryMethod: {
        elType: "select",
        elConfig: {
          options: [
            { value: "fastest", displayName: "Fastest" },
            { value: "cheapest", displayName: "Cheapest" },
          ],
        },
        validation: {
          required: true,
          valid: true,
        },
        value: "fastest",
      },
    },
    formIsValid: false,
  };

  orderHandler = (e) => {
    e.preventDefault();

    const formData = {};
    for (let elId in this.state.orderForm) {
      formData[elId] = this.state.orderForm[elId].value;
    }
    const order = {
      ingridients: this.props.ingridients,
      price: this.props.totalPrice,
      orderData: formData,
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  checkValidity = (value, validation) => {
    let { valid, validationErrors, ...rules } = { ...validation };
    valid = true;
    validationErrors = [];

    if (rules.required && value.trim() === "") {
      valid = false;
      validationErrors.push("Field is required");
    }

    if (rules.minLength && value.length < rules.minLength) {
      valid = false;
      validationErrors.push(`Minimum length is ${rules.minLength}`);
    }

    if (rules.maxLength && value.length <= rules.maxLength) {
      valid = false;
      validationErrors.push(`Maximum length is ${rules.maxLength}`);
    }

    if (rules.isEmail) {
      const pattern = /^\S+@\S+\.\S+$/;
      if (!pattern.test(value)) {
        valid = false;
        validationErrors.push("Email is not valid");
      }
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      if (!pattern.test(value)) {
        valid = false;
        validationErrors.push("Enter numeric value");
      }
    }
    const newValidation = {
      ...validation,
      valid,
      validationErrors,
    };
    return newValidation;
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    if (updatedFormElement.validation) {
      updatedFormElement.validation = this.checkValidity(
        updatedFormElement.value,
        updatedFormElement.validation
      );
    }
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputId in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputId].validation.valid && formIsValid;
    }
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid,
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((el) => {
          return (
            <Input
              key={el.id}
              elType={el.config.elType}
              label={el.id}
              value={el.config.value}
              elConfig={el.config.elConfig}
              changed={(event) => this.inputChangedHandler(event, el.id)}
              validation={el.config.validation}
              touched={el.config.touched}
            />
          );
        })}
        <button
          type="submit"
          className="button success"
          disabled={!this.state.formIsValid}
        >
          ORDER
        </button>
      </form>
    );
    if (this.props.loadingOrder) {
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

const mapStateToProps = (state) => {
  return {
    ingridients: state.burgerBuilder.ingridients,
    totalPrice: state.burgerBuilder.totalPrice,
    loadinOrder: state.orders.loadingOrder,
    token: state.auth.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(withRouter(ContactData), axios));
