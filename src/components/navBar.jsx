import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { withRouter } from "react-router";

const NavBar = () => {
  return (
    <>
      <Nav
        className="col-md-12 d-none d-md-block bg-light sidebar"
        activeKey="/"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <div className="sidebar-sticky"></div>
        <Nav.Item>
          <Nav.Link href="/">Dashboard</Nav.Link>
        </Nav.Item>
          <Nav.Link eventKey="/project">Project</Nav.Link>
        <Nav.Item>
          <Nav.Link eventKey="/status">Status</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/Support">Support</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/login">Login</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/register">Register</Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default NavBar;
