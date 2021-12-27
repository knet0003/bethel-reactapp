import Joi from "joi-browser";
import React from "react";
import { saveProject } from "../../../services/projectService";
import Form from "../../common/form";
import "../projects/projects.css";
import { getProject } from "./../../../services/projectService";

class CreateProject extends Form {
  state = {
    data: {
      name: "",
      description: "",
      environment: "",
      purpose: "",
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Name"),
    description: Joi.string().required().label("Description"),
    environment: Joi.string().required().label("Environment"),
    purpose: Joi.string().required().label("Purpose"),
  };

  async populateProject() {
    try {
      const projectId = window.location.href.split("/").pop();
      if (projectId === "new") return;
      const { data: project } = await getProject(projectId);
      this.setState({ data: this.mapToViewModel(project) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  doSubmit = async () => {
    await saveProject(this.state.data);
    console.log("save");
    this.props.history.push("/projects");
  };

  async componentDidMount() {
    await this.populateProject();
    console.log("mounted");
  }

  mapToViewModel(project) {
    return {
      _id: project._id,
      name: project.name,
      description: project.description,
      environment: project.environment,
      purpose: project.purpose,
    };
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="cardContainer">
          <h3 className="title"> Create Project </h3>
          {this.renderInput("name", "Project name", "60px")}
          <br />
          {this.renderInput("description", "Project Description", "120px")}
          <br />
          {this.renderInput("environment", "Project Environment", "60px")}
          <br />
          {this.renderInput("purpose", "Project Purpose", "120px")}
          <br />
          {this.renderButton("Save")}
        </div>
      </form>
    );
  }
}

export default CreateProject;
