import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { routes } from "./sideNavbarData";
import "./sideBar.css";
import CreateProject from "./../pages/projects/createProject";
import CreateNode from "./../pages/projects/createNode";
import Account from "../pages/account/account";
import Deployment from "../pages/deployment/deployment";
import "../topBar/topBar.css";
import profile from "../../avatar.png";
import logo from "../../bethelblock.png";
import authService, {
  getProfile,
  getProfPicture,
} from "../../services/authService";
import RegisterForm from "../pages/authentication/registerForm";
import TopBar from "../topBar/topBar";

class Sidebar extends React.Component {
  state = {
    image: "",
    name: "",
  };

  logout = () => {
    authService.logout();
    window.location.reload(false);
  };

  async componentDidMount() {
    const { data } = await getProfile();
    console.log(data);
    const { first_name, last_name } = data;
    this.setState({ name: first_name + " " + last_name });
    console.log(this.state.name);
    const { data: data2 } = await getProfPicture();
    const { message, image_stream } = data2;
    if (message === "") this.setState({ image: image_stream });
  }

  render() {
    return (
      <div>
        <div className="topBar">
          <div className="topBarWrapper">
            <div className="topLeft">
              <Link to="/account">
                <span className="logo">
                  {" "}
                  <img src={logo} alt="logo" className="logo" />
                </span>
              </Link>
            </div>
            <div className="topRight">
              <button className="btn btn-primary" onClick={this.logout}>
                logout
              </button>
              <p>{this.state.name}</p>
              <div className="topBarIconContainer">
                <Link to="/account">
                  {this.state.image ? (
                    <img
                      src={`data: image/png;base64,${this.state.image}`}
                      alt="avatar"
                      className="topAvatar"
                    />
                  ) : (
                    <img src={profile} alt="avatar" className="topAvatar" />
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* <TopBar /> */}
        <div className="page">
          <div className="sidebar">
            <div className="sidebarWrapper">
              <div className="sidebarMenu">
                <ul className="sidebarList">
                  {routes.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                        {" "}
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>{" "}
                      </li>
                    );
                  })}
                </ul>
                <Routes>
                  {routes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      element={<route.sidebar />}
                    />
                  ))}
                </Routes>
              </div>
            </div>
          </div>

          <div className="contentpage">
            <Routes>
              <Route path="/register" component={RegisterForm} />
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={<route.main />} />
              ))}
              {/* <Route path="/projects/:id" element={ViewProject} /> */}
              <Route path="/projects/:id" element={<CreateProject />} />
              <Route path="/nodes/:id" element={<CreateNode />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
