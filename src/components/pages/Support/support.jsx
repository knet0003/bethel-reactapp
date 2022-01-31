import React from "react";
import Crouton from "react-crouton";
import "./support.css";
import "../projects/projects.css";
import {
  PlayArrow,
  Dns,
  IntegrationInstructions,
  ShoppingBasket,
  ReportTwoTone,
} from "@mui/icons-material";
import { FloatingLabel, Form } from "react-bootstrap";
import { submitTicket } from "../../../services/authService";

class Support extends React.Component {
  state = {
    issue: "",
  };

  handleChange = (event) => {
    this.setState({ issue: event.target.value });
  };

  handleSubmit = async () => {
    const submission = await submitTicket(this.state);
    console.log(submission);
    const { data } = submission;
    const { message } = data;
    console.log(message);
  };

  render() {
    return (
      <div className="support">
        <div className="cardContainer">
          <h3 className="title"> Support </h3>
          <div className="contain">
            <div className="supportCard">
              <PlayArrow className="icon" />
              <h4>Getting started</h4>
              <p>Introduction to site functionalities and ajrgjt</p>
            </div>
            <div className="supportCard">
              <Dns className="icon" />
              <h4>SDK Support</h4>
              <p>Need help with setting up skdajfrgn</p>
            </div>
            <div className="supportCard">
              <IntegrationInstructions className="icon" />
              <h4>User Guides</h4>
              <p>For users when in need with how to use the website.</p>
            </div>
            <div className="supportCard">
              <ShoppingBasket className="icon" />
              <h4>Sales Support</h4>
              <p>Need help with setting up skdajfrgn</p>
            </div>
          </div>
          <hr align="center" size="4" width="100%" color="grey" />
          <h4 className="title">Couldn't find help for your issue? </h4>
          <h5 className="title">
            Send us a message with your issue and we will be back with you.
          </h5>
          <FloatingLabel
            controlId="floatingTextarea2"
            label="Type your issue here"
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              value={this.state.issue}
              onChange={this.handleChange}
            />
          </FloatingLabel>
          <button className="button-primary" onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default Support;
