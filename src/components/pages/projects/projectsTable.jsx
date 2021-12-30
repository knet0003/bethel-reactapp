import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../../common/table";

class ProjectTable extends Component {
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
    { path: "user_id", label: "Owner" },
    { path: "created_at", label: "Created" },
    {
      key: "delete",
      content: (project) => (
        <button
          onClick={() => this.props.onDelete(project)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { projects } = this.props;

    return <Table columns={this.columns} data={projects} />;
  }
}

export default ProjectTable;
