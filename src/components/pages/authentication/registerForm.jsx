import React from "react";
import Joi from "joi-browser";
import Form from "../../common/form";
import authService from "../../../services/authService";
import "./loginForm.css";
import Button from "react-bootstrap/Button";
import logo from "../../../bethelblock.png";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
    cpassword: Joi.string().required().min(5).label("Password"),
    fname: Joi.string().required().label("First name"),
    lname: Joi.string().required().label("Last name"),
  };

  doSubmit = () => {
    // Call the server
    console.log("Submitted");
  };

  render() {
    return (
      <div className="box">
        <form onSubmit={this.handleSubmit}>
          <div className="cardContainer">
            <img src={logo} alt="logo" className="logo" />
            <h3>Register</h3>
            <br />
            {this.renderInput("fname", "First name")}
            <br />
            {this.renderInput("lname", "Last name")}
            <br />
            {this.renderInput("email", "Email")}
            <br />
            {this.renderInput("password", "Password", "password")}
            <br />
            {this.renderInput("cpassword", "Confirm password", "password")}
            <br />
            {this.renderButton("Login")}
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
