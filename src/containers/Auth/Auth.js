import React, { Component } from "react";
import Input from "../../components/ui/input";
import classes from "./Auth.module.css";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elType: "input",
        elConfig: {
          type: "email",
          placeholder: "Email address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
          valid: false,
        },
        touched: false,
      },
      password: {
        elType: "input",
        elConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
          valid: false,
        },
        touched: false,
      },
    },
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

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        validation: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({
      controls: updatedControls,
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    const form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elType={formElement.config.elType}
        label={formElement.id}
        value={formElement.config.value}
        elConfig={formElement.config.elConfig}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
        validation={formElement.config.validation}
        touched={formElement.config.touched}
      />
    ));
    return (
      <div className={classes.Auth}>
        <form>
          {form}
          <button
            type="submit"
            className="button success"
            disabled={!this.state.formIsValid}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Auth;
