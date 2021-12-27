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
    { path: "projectName", label: "Project Name" },
    { path: "image", label: "Image" },
    { path: "volume", label: "Volume" },
    { path: "createDate", label: "Created" },
  ];

  render() {
    const { nodes } = this.props;

    return <Table columns={this.columns} data={nodes} />;
  }
}

export default NodeTable;
