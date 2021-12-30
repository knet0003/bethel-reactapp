import React from "react";
import { saveNode } from "../../../services/nodeService";
import "../projects/projects.css";
import Joi from "joi-browser";
import Form from "../../common/form";
import { getProjects } from "./../../../services/projectService";

class CreateNode extends Form {
  state = {
    data: {
      project_id: "",
      droplet_count: "",
    },
    projects: [],
    errors: {},
  };
  schema = {
    _id: Joi.string(),
    project_id: Joi.string().required().label("Project"),
    droplet_count: Joi.number().required().label("Droplet Count"),
  };

  async componentDidMount() {
    const datas = await getProjects();
    const { data } = datas;
    const { projects } = data;
    const ids = projects.map((s) => s.project_id);
    console.log(ids);
    ids ? this.setState({ projects: ids }) : this.setState({ projects: [] });
    console.log(this.state.projects);
  }
  doSubmit = async () => {
    await saveNode(this.state.data);
    console.log("save");
    this.props.history.push("/projects");
  };
  render() {
    const labels = this.state.projects.map((p) => {
      let labels = { label: p, value: p };
      return labels;
    });
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="cardContainer">
          <h3 className="title"> Create Node </h3>

          <br />
          {this.renderSelect("project_id", "Project id", labels)}
          <br />
          {this.renderInput("droplet_count", "Droplet count", "number")}
          <br />
          {this.renderButton("Save")}
        </div>
      </form>
    );
  }
}

export default CreateNode;
