import React from "react";
import Joi from "joi-browser";
import Form from "../../common/form";
import authService from "../../../services/authService";
import "./loginForm.css";
import logo from "../../../bethelblock.png";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";

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
      const token = await authService
        .login(data.email, data.password)
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
      this.props.token(token);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  handleClose = async () => this.setState({ isShown: false });

  render() {
    return (
      <div className="loginbox">
        <form onSubmit={this.handleSubmit}>
          <div className="logincardContainer">
            <img src={logo} alt="logo" className="logo" />
            <h3>Login</h3>
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
            {this.renderInput("email", "Email")}
            <br />
            {this.renderInput("password", "Password", "password")}
            <br />{" "}
            <div className="d-grid">
              {this.renderButton("Login", "btn btn-primary btn-block")}
            </div>
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
