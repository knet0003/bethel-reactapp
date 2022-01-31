import { Switch } from "@mui/material";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../../common/table";
import "./status.css";

class ExpandTable extends Component {
  columns = [
    {
      path: "node_name",
      label: "Name",
    },
    { path: "ip_address", label: "IP address" },
    { path: "node_status", label: "Node Status" },
  ];

  render() {
    const { nodes } = this.props;

    return <Table columns={this.columns} data={nodes} />;
  }
}

export default ExpandTable;
