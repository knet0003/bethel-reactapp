import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import authService from "../services/authService";
import "./loginForm.css";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const token = await authService.login(data.username, data.password);
      this.props.setToken(token);
      console.log(this.props);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    // if (auth.getCurrentUser()) return <Navigate to="/" />;
    return (
      <div className="box">
        <form onSubmit={this.handleSubmit}>
          <div className="cardContainer">
            <h2>Login</h2>
            {this.renderInput("username", "Username")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Login")}
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
