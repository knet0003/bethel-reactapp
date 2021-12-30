import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { routes } from "./sideNavbarData";
import "./sideBar.css";
import CreateProject from "./../pages/projects/createProject";
import CreateNode from "./../pages/projects/createNode";
import LoginForm from "../pages/authentication/loginForm";
// import Logout from "../log";
import Account from "../pages/account/account";
import "../topBar/topBar.css";
import profile from "../../profile.png";
import logo from "../../bethelblock.png";
import authService from "../../services/authService";
import RegisterForm from "../pages/authentication/registerForm";

export default function Sidebar() {
  const logout = () => {
    authService.logout();
    window.location.reload(false);
  };

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
            <div className="topBarIconContainer">
              <button onClick={logout}>logout</button>
              <span>{localStorage.getItem("name")}</span>
              <Link to="/account">
                <img src={profile} alt="avatar" className="topAvatar" />
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
            <Route path="/projects/:id" element={<CreateProject />} />
            <Route path="/nodes/:id" element={<CreateNode />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
