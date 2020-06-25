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
        loading: false,
    };

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let elId in this.state.orderForm) {
            formData[elId] = this.state.orderForm[elId].value;
        }
        const order = {
            ingridients: this.props.ingridients,
            price: this.props.totalPrice,
            orderData: formData,
        };
        axios
            .post("/orders.json", order)
            .then((response) => {
                this.setState({ loading: false });
                this.props.history.push("/");
            })
            .catch((error) => {
                console.log(error);
                this.setState({ loading: false });
            });
    };

    checkValidity = (value, validation) => {
        const updatedValidation = { ...validation };
        updatedValidation.valid = true;
        updatedValidation.validationErrors = [];
        if (validation.required) {
            updatedValidation.valid =
                value.trim() !== "" && updatedValidation.valid;
            if (!updatedValidation.valid) {
                updatedValidation.validationErrors.push(
                    "This field is required"
                );
            }
        }
        if (validation.minLength) {
            updatedValidation.valid =
                value.length >= validation.minLength && updatedValidation.valid;
            if (!updatedValidation.valid) {
                updatedValidation.validationErrors.push(
                    `The minimum length is ${validation.minLength}`
                );
            }
        }
        if (validation.maxLength) {
            updatedValidation.valid =
                value.length <= validation.maxLength && updatedValidation.valid;
            if (!updatedValidation.valid) {
                updatedValidation.validationErrors.push(
                    `The maximum length is ${validation.maxLength}`
                );
            }
        }
        return updatedValidation;
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
            formIsValid =
                updatedOrderForm[inputId].validation.valid && formIsValid;
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
                            changed={(event) =>
                                this.inputChangedHandler(event, el.id)
                            }
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
