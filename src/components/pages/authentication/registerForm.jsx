import React from "react";
import Joi from "joi-browser";
import Form from "../../common/form";
import authService from "../../../services/authService";
import "./loginForm.css";
import Button from "react-bootstrap/Button";
import logo from "../../../bethelblock.png";
import countryList from "react-select-country-list";

class RegisterForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
      confirm_password: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      country: "",
      country_code: "",
    },
    errors: {},
    phoneNumber: "",
    phoneInput: "",
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
    confirm_password: Joi.string().required().valid(Joi.ref("password")),
    first_name: Joi.string().required().label("First name"),
    last_name: Joi.string().required().label("Last name"),
    phone_number: Joi.number().required().label("Phone number"),
    country: Joi.string().required().label("Country"),
    country_code: Joi.number().required().label("Country code"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const token = await authService.register(this.state.data);
      this.props.token(token);

      console.log(token);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const options = countryList().getData();
    return (
      <div className="loginbox">
        <form onSubmit={this.handleSubmit}>
          <div className="logincardContainer">
            <img src={logo} alt="logo" className="logo" />
            <h3>Register</h3>
            <br />
            {this.renderInput("first_name", "First name")}
            <br />
            {this.renderInput("last_name", "Last name")}
            <br />
            {this.renderInput("email", "Email")}
            <br />
            {this.renderInput("password", "Password", "password")}
            <br />
            {this.renderInput("confirm_password", "Confirm password")}
            <br />
            {this.renderSelect("country", "Country", options)}
            <br />
            <div className="grid-container">
              <div className="grid-item">
                {" "}
                {this.renderInput("country_code", "Country code")}
              </div>
              <div className="grid-item">
                {this.renderInput("phone_number", "Phone number", "phone")}
              </div>
            </div>
            <br />
            <div className="d-grid">
              {this.renderButton("Register", "btn btn-primary btn-block")}
            </div>
            <br />
            Already have an account?
            <Button variant="link" onClick={() => this.props.onSignup()}>
              Sign in
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
