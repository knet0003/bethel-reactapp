import React, { Component } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import "../projects/projects.css";

class CreateNode extends Component {
  render() {
    return (
      <div className="createNode">
        <div className="cardContainer">
          <h3 className="title"> Create Node </h3>
          <FloatingLabel controlId="floatingTextarea2" label="Node name">
            <Form.Control
              as="textarea"
              placeholder="name"
              style={{ height: "60px" }}
            />
          </FloatingLabel>
          <br />

          <FloatingLabel controlId="floatingTextarea2" label="Image">
            <Form.Control
              as="textarea"
              placeholder="image"
              style={{ height: "60px" }}
            />
          </FloatingLabel>

          <br />
          <FloatingLabel controlId="floatingTextarea2" label="Volume">
            <Form.Control
              as="textarea"
              placeholder="volume"
              style={{ height: "60px" }}
            />
          </FloatingLabel>

          <button className="button-primary">Create Node</button>
        </div>
      </div>
    );
  }
}

export default CreateNode;
