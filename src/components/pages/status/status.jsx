import React from "react";
import "./status.css";
import { getDeployedProjects } from "../../../services/projectService";
import StatusTable from "./statusTable";
import { Dropdown, DropdownButton, FloatingLabel, Form } from "react-bootstrap";

class Status extends React.Component {
  state = {
    projects: [],
  };

  async componentDidMount() {
    const projResponse = await getDeployedProjects();
    const { data: projData } = projResponse;
    const { projects } = projData;

    projects ? this.setState({ projects }) : this.setState({ projects: [] });
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
              <h2 className="chartTitle">Status</h2>
            </div>
            <StatusTable
              projects={this.state.projects}
              onSwitch={this.handleSwitch}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Status;
