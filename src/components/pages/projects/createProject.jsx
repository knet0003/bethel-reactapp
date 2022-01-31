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
      provider: "",
    },
    providers: [
      { label: "Azure", value: "azure" },
      { label: "Digital Ocean", value: "digitalocean" },
    ],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Name"),
    provider: Joi.string().required().label("Provider"),
  };

  async populateProject() {
    try {
      const projectId = window.location.href.split("/").pop();
      if (!projectId) return;
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
    console.log("saved");
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
      provider: project.provider,
    };
  }

  render() {
    console.log(this.state.data);
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="cardContainer">
          <h3 className="title"> Create Project </h3>
          {this.renderInput("name", "Project name", "60px")}
          <br />
          {this.renderSelect("provider", "Provider", this.state.providers)}

          {this.renderButton("Save")}
        </div>
      </form>
    );
  }
}

export default CreateProject;
