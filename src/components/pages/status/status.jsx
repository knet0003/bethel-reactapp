import React from "react";
import "./status.css";
import { getProjects } from "../../../services/fakeProjectService";
import StatusTable from "./statusTable";
import { Dropdown, DropdownButton, FloatingLabel, Form } from "react-bootstrap";

class Status extends React.Component {
  state = {
    projects: [],
  };

  componentDidMount() {
    this.setState({ projects: getProjects() });
  }

  handleSwitch = (project) => {
    const projects = [...this.state.projects];
    const index = projects.indexOf(project);
    projects[index] = { ...projects[index] };
    projects[index].switch = !projects[index].switch;
    this.setState({ projects });
  };

  render() {
    return (
      <div className="status">
        <div className="cards">
          <div className="cardContainer">
            <div className="chartTop">
              <h2 className="chartTitle">Projects Status</h2>
            </div>
            <StatusTable
              projects={this.state.projects}
              onSwitch={this.handleSwitch}
            />
          </div>
        </div>
        <div className="cards">
          <div className="cardContainer">
            <div className="chartTop">
              <h2 className="chartTitle">Quick Smart Deployment (Test)</h2>
            </div>
            <DropdownButton
              id="dropdown-variants-Secondary"
              title="Select project"
            >
              {this.state.projects.map((project, index) => {
                return (
                  <Dropdown.Item key={index}>{project.name}</Dropdown.Item>
                );
              })}
            </DropdownButton>

            <FloatingLabel controlId="floatingTextarea2" label="Sample Code">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "300px" }}
              />
            </FloatingLabel>
            <button className="button-primary">Deploy</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Status;
