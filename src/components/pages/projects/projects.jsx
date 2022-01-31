import React from "react";
import "./projects.css";
import ProjectTable from "./projectsTable";
import NodeTable from "./nodeTable";
import {
  deleteNode,
  getNodes,
  sendDeleteNode,
} from "../../../services/nodeService";
import "../../../charts/charts.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import {
  deleteProject,
  sendDeleteProject,
  getProjects,
} from "./../../../services/projectService";

class Projects extends React.Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      nodes: [],
      isShown: false,
      toBeDeleted: {},
      selected: "",
    };

    this.onInputchange = this.onInputchange.bind(this);
  }

  async componentDidMount() {
    const projResponse = await getProjects();
    const { data: projData } = projResponse;
    const { projects } = projData;

    projects ? this.setState({ projects }) : this.setState({ projects: [] });
    const nodeResponse = await getNodes();
    const { data: nodeData } = nodeResponse;
    const { droplets } = nodeData;
    droplets
      ? this.setState({ nodes: droplets })
      : this.setState({ nodes: [] });
  }

  handleDelete = (toDelete) => {
    console.log(toDelete);
    if (toDelete.hasOwnProperty("project_id")) {
      this.setState({ selected: "project", toBeDeleted: toDelete });
      console.log(this.state.selectedProject);
      if (this.sendDelete(toDelete, "project") === true) {
        const originalProjects = this.state.projects;
        const projects = originalProjects.filter(
          (p) => p.project_id !== toDelete.project_id
        );
        this.setState({ projects });
      }
    } else if (toDelete.hasOwnProperty("vm_id")) {
      this.setState({ selected: "node", toBeDeleted: toDelete });
      if (this.sendDelete(toDelete, "node") === true) {
        const originalNodes = this.state.nodes;
        const nodes = originalNodes.filter((p) => p.vm_id !== toDelete.vm_id);
        this.setState({ nodes });
      }
    }
  };

  handleClose = async () => this.setState({ isShown: false });

  sendDelete = async (deleteItem) => {
    try {
      const type = this.state.selected;
      console.log(type);
      if (type === "project") {
        await sendDeleteProject(deleteItem.project_id);
        this.setState({ isShown: true });
      }
      this.setState({ isShown: true });
      if (type === "node") {
        const projectId = this.state.projects.find(
          (p) => p.name === deleteItem.resource_group
        ).project_id;
        console.log(projectId);
        await sendDeleteNode(deleteItem.vm_id, projectId);
        this.setState({ isShown: true });
      }
      return true;
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted.");
    }
  };

  onInputchange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  confirmDelete = async () => {
    console.log(this.state.selected);
    const {
      toBeDeleted: toDelete,
      selected: type,
      confirmation_number,
    } = this.state;
    try {
      if (type === "project")
        await deleteProject(toDelete.project_id, confirmation_number);
      if (type === "node") {
        const projectId = this.state.projects.find(
          (p) => p.name === toDelete.resource_group
        ).project_id;
        await deleteNode(projectId, toDelete.vm_id, confirmation_number);
      }
      this.handleClose();
      window.location.reload(false);
    } catch (ex) {
      console.error(ex);
    }
  };

  render() {
    return (
      <div className="projects">
        <div className="cards">
          <div className="cardContainer">
            <div className="chartTop">
              <h2 className="chartTitle">Projects</h2>
              <Link to="/projects/new" className="button-outlined">
                Create new
              </Link>
            </div>
            {this.state.projects ? (
              <ProjectTable
                projects={this.state.projects}
                onDelete={this.handleDelete}
              />
            ) : null}
          </div>
        </div>
        <Modal
          show={this.state.isShown}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Deletion code has been sent to your email and phone. Please, confirm
            below
            <br />
            <input
              type="text"
              name="confirmation_number"
              id="confirmation_number"
              value={this.state.confirm}
              onChange={this.onInputchange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.confirmDelete}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="cards">
          <div className="cardContainer">
            <div className="chartTop">
              <h2 className="chartTitle">Deployed Nodes</h2>
              <Link to="/nodes/new" className="button-outlined">
                Create new
              </Link>
            </div>
            <NodeTable nodes={this.state.nodes} onDelete={this.handleDelete} />
          </div>
        </div>
      </div>
    );
  }
}

export default Projects;
