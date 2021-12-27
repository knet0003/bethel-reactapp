import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import "../projects/projects.css";
import "../Support/support.css";
import "./account.css";
import profile from "../../../profile.png";

class Account extends React.Component {
  render() {
    return (
      <div className="createNode">
        <div className="cardContainer">
          <h3 className="title"> Profile </h3>
          <img src={profile} alt="avatar" className="avatar" />
          <div className="contain">
            <div className="column">
              <FloatingLabel controlId="floatingTextarea1" label="First name">
                <Form.Control
                  as="textarea"
                  placeholder="first name"
                  style={{ height: "60px" }}
                />
              </FloatingLabel>
              <br />
              <FloatingLabel controlId="floatingTextarea2" label="Email">
                <Form.Control
                  as="textarea"
                  placeholder="email"
                  style={{ height: "60px" }}
                />
              </FloatingLabel>
              <br />
              <FloatingLabel controlId="floatingTextarea3" label="Address">
                <Form.Control
                  as="textarea"
                  placeholder="address"
                  style={{ height: "60px" }}
                />
              </FloatingLabel>
              <br />
              <FloatingLabel controlId="floatingTextarea4" label="Phone">
                <Form.Control
                  as="textarea"
                  placeholder="phone"
                  style={{ height: "60px" }}
                />
              </FloatingLabel>
            </div>
            <div className="column">
              <FloatingLabel controlId="floatingTextarea5" label="Last name">
                <Form.Control
                  as="textarea"
                  placeholder="last name"
                  style={{ height: "60px" }}
                />
              </FloatingLabel>
            </div>
          </div>

          <button className="button-primary">Save changes</button>
        </div>
      </div>
    );
  }
}

export default Account;
