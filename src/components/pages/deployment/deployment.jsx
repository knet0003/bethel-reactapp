import React from "react";
import "./deployment.css";
import Form from "../../common/form";
import { getDeployedProjects } from "../../../services/projectService";
import { Dropdown, DropdownButton, FloatingLabel } from "react-bootstrap";
import Joi from "joi-browser";

class Deployment extends Form {
  state = {
    data: {
      name: "",
      language: "",
      code: "",
      port: "",
      deployment_name: "",
    },
    projects: [],
    language: [
      { label: "Python", value: "python" },
      { label: "Go Lang", value: "go" },
    ],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Name"),
    language: Joi.string().required().label("Language"),
    code: Joi.string().required().label("Code"),
    port: Joi.number().port().required().label("Port"),
  };

  async componentDidMount() {
    const projResponse = await getDeployedProjects();
    const { data: projData } = projResponse;
    const { projects } = projData;
    const newProj = projects.map((project) => {
      return { ...project, label: project.name, value: project.name };
    });
    projects
      ? this.setState({ projects: newProj })
      : this.setState({ projects: [] });
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
      <form onSubmit={this.handleSubmit}>
        <div className="cards">
          <div className="cardContainer">
            <div className="chartTop">
              <h2 className="chartTitle">Quick Smart Deployment (Test)</h2>
            </div>
            <br />

            {this.renderSelect("name", "Project name", this.state.projects)}
            {this.renderSelect("language", "SDK Language", this.state.language)}
            {this.renderInput("port", "Application Port")}
            {this.renderInput("file", "Executable File name")}
            {this.renderInput("code", "Sample Code")}

            {/* <FloatingLabel controlId="floatingTextarea2" label="Sample Code">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "300px" }}
              />
            </FloatingLabel> */}
            <button className="button-primary">Deploy</button>
          </div>
        </div>
      </form>
    );
  }
}

export default Deployment;
