import React, { Component, Fragment } from "react";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";

class Authentication extends Component {
  constructor(props) {
    super(props);

    // Set state of the component
    this.state = {
      // Show sign in page by default
      show: "signin",
    };
  }

  showSignup = () => {
    // Show sign up page by changing the show variable
    this.setState({
      show: "signup",
    });

    console.log("Showing Signup Page");
  };

  showSignin = () => {
    // Show sign in page by changing the show variable
    this.setState({
      show: "signin",
    });

    console.log("Showing Signin Page");
  };

  render() {
    // Render the component as per show state variable
    if (this.state.show === "signin") {
      return (
        <LoginForm
          authState={this.props.authState}
          onStateChange={this.props.onStateChange}
          onSignup={this.showSignup}
        />
      );
    } else {
      return (
        <RegisterForm
          authState={this.props.authState}
          onSignup={this.showSignin}
        />
      );
    }
  }
}

export default Authentication;
