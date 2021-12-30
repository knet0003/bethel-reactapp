import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../../common/table";

class NodeTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: (node) => <Link to={`/nodes/${node._id}`}>{node.name}</Link>,
    },
    { path: "ip", label: "IP" },
    { path: "resource_group", label: "Project Name" },
    { path: "created", label: "Created" },
    {
      key: "delete",
      content: (node) => (
        <button
          onClick={() => this.props.onDelete(node)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { nodes } = this.props;

    return <Table columns={this.columns} data={nodes} />;
  }
}

export default NodeTable;
