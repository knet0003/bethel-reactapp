import React from "react";
import Joi from "joi-browser";
import Form from "../../common/form";
import authService from "../../../services/authService";
import "./loginForm.css";
import Button from "react-bootstrap/Button";
import logo from "../../../bethelblock.png";
import countryList from "react-select-country-list";
import { Modal } from "react-bootstrap";

class RegisterForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
      confirm_password: "",
      first_name: "",
      last_name: "",
      phone: "",
      country: "",
      country_code: "",
    },
    message: "",
    isShown: false,
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
    phone: Joi.number().required().label("Phone number"),
    country: Joi.string().required().label("Country"),
    country_code: Joi.number().required().label("Country code"),
  };

  doSubmit = async () => {
    const { data } = this.state;
    await authService
      .register(data)
      .then((response) => {
        // Handle response
        console.log(response);
        const { data } = response;
        const { response: res } = data;
        const { message } = res;
        this.setState({ message: message });
        this.setState({ isShown: true });
        // return response;
      })
      .catch((error) => {
        // Error
        if (error.response) {
          const { message } = error.response.data;
          // const { message } = response;
          this.setState({ message });
          this.setState({ isShown: true });
        } else if (error.request) {
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  handleClose = async () => this.setState({ isShown: false });

  render() {
    const options = countryList().getData();
    return (
      <div className="loginbox">
        <form onSubmit={this.handleSubmit}>
          <div className="logincardContainer">
            <img src={logo} alt="logo" className="logo" />
            <h3>Register</h3>
            <Modal
              show={this.state.isShown}
              onHide={this.handleClose}
              backdrop="static"
            >
              <Modal.Header closeButton>
                <Modal.Title>Message</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {this.state.message}
                <br />
              </Modal.Body>
            </Modal>
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
                {this.renderInput("phone", "Phone number", "phone")}
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
