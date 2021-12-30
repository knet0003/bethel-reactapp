import React from "react";
import Joi from "joi-browser";
import Form from "../../common/form";
import authService from "../../../services/authService";
import "./loginForm.css";
import logo from "../../../bethelblock.png";
import Button from "react-bootstrap/Button";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const token = await authService.login(data.email, data.password);
      this.props.token(token);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="box">
        <form onSubmit={this.handleSubmit}>
          <div className="cardContainer">
            <img src={logo} alt="logo" className="logo" />
            <h3>Login</h3>
            <br />
            {this.renderInput("email", "Email")}
            <br />
            {this.renderInput("password", "Password", "password")}
            <br />
            {this.renderButton("Login")}
            <br />
            New to out platform?
            <Button variant="link" onClick={() => this.props.onSignup()}>
              Sign up
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
