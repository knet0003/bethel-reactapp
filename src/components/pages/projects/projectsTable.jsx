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
    { path: "environment", label: "Environment" },
    { path: "nodeCount", label: "Node Count" },
    { path: "owner", label: "Owner" },
    { path: "createDate", label: "Created" },
  ];

  render() {
    const { projects } = this.props;

    return (
      <Table
        columns={this.columns}
        data={projects}
      />
    );
  }
}

export default ProjectTable;
