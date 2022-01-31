import { Switch } from "@mui/material";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../../common/table";
import "./status.css";

class NodeStatusTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: (project) => (
        <Link to={`/projects/${project._id}`}>{project.name}</Link>
      ),
    },
    { path: "provider", label: "Provider" },
    { path: "nodes_count", label: "Node Count" },
    { path: "created_at", label: "Created" },
    {
      path: "network_deployed",
      label: "Deployed",
      content: (project) => (project.network_deployed ? "Yes" : "No"),
    },
    // { path: "nodes", label: "Nodes" },
    {
      key: "status",
      content: (project) => (
        <Switch
          className="switchButton"
          checked={project.status}
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

export default NodeStatusTable;
