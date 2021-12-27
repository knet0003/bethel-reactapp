import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { routes } from "./sideNavbarData";
import "./sideBar.css";
import CreateProject from "./../pages/projects/createProject";
import CreateNode from "./../pages/projects/createNode";
import LoginForm from "../loginForm";
import Logout from "../logout";
import TopBar from "../topBar/topBar";
import Account from "../pages/account/account";

export default function Sidebar() {
  return (
    <div>
      <TopBar />
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
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={<route.main />} />
            ))}
            <Route path="/projects/:id" element={<CreateProject />} />
            <Route path="/createnode" element={<CreateNode />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
