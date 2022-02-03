import React from "react";
import { saveNode } from "../../../services/nodeService";
import "../projects/projects.css";
import Joi from "joi-browser";
import Form from "../../common/form";
import { getProjects } from "./../../../services/projectService";
import { Modal } from "react-bootstrap";

class CreateNode extends Form {
  state = {
    data: {
      project_id: "",
      droplet_count: "",
    },
    projects: [],
    errors: {},
    isShown: false,
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
    await saveNode(this.state.data)
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

    console.log("save");
  };

  handleClose = async () => this.setState({ isShown: false });

  render() {
    const labels = this.state.projects.map((p) => {
      let labels = { label: p, value: p };
      return labels;
    });
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="cardContainer">
          <h3 className="title"> Create Node </h3>
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
