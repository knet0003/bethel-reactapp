import Joi from "joi-browser";
import React from "react";
import { saveProject } from "../../../services/projectService";

import Form from "../../common/form";
import "../projects/projects.css";
import { getProject } from "./../../../services/projectService";
import { Modal } from "react-bootstrap";

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
    message: "",
    isShown: false,
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
      const { data } = await getProject(projectId);
      const { project } = data;
      this.setState({ data: this.mapToViewModel(project) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  doSubmit = async () => {
    await saveProject(this.state.data)
      .then((response) => {
        // Handle response
        console.log(response);
        const { data } = response;
        const { response: res } = data;
        const { message } = res;
        this.setState({ message: message });
        this.setState({ isShown: true });
        // return response;
      })
      .catch((error) => {
        // Error
        if (error.response) {
          const { response } = error.response.data;
          const { message } = response;
          this.setState({ message: message });
          this.setState({ isShown: true });
        } else if (error.request) {
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
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
  handleClose = async () => this.setState({ isShown: false });

  render() {
    console.log(this.state.data);
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="cardContainer">
          <h3 className="title"> Project </h3>
          <Modal
            show={this.state.isShown}
            onHide={this.handleClose}
            backdrop="static"
          >
            <Modal.Header closeButton>
              <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.state.message}
              <br />
            </Modal.Body>
          </Modal>
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
