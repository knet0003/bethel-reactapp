import React from "react";
import "./support.css";
import "../projects/projects.css";
import {
  PlayArrow,
  Dns,
  IntegrationInstructions,
  ShoppingBasket,
} from "@mui/icons-material";
import { FloatingLabel, Form } from "react-bootstrap";

class Support extends React.Component {
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
            />
          </FloatingLabel>
          <button className="button-primary">Submit</button>
        </div>
      </div>
    );
  }
}

export default Support;
