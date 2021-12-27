import { Switch } from "@mui/material";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../../common/table";
import "./status.css";

class StatusTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: (project) => (
        <Link to={`/projects/${project._id}`}>{project.name}</Link>
      ),
    },
    { path: "environment", label: "Environment" },
    { path: "nodeCount", label: "Node Count" },
    { path: "createDate", label: "Created" },
    {
      path: "deployed",
      label: "Deployed",
      content: (project) => (project.deployed ? "True" : "False"),
    },
    {
      key: "switch",
      content: (project) => (
        <Switch 
        className="switchButton"
          checked={project.switch}
          onChange={() => this.props.onSwitch(project)}
        />
      ),
      label: "ON/OFF",
    },
  ];

  render() {
    const { projects } = this.props;

    return <Table columns={this.columns} data={projects} />;
  }
}

export default StatusTable;
