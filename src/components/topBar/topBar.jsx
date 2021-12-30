import React, { useState } from "react";
import "./topBar.css";
import profile from "../../profile.png";
import logo from "../../bethelblock.png";
import { Link } from "react-router-dom";
import authService from "../../services/authService";

function TopBar() {
  const [name, setName] = useState(0);
  setName(authService)
  return (
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
            <span>John Snow</span>

            <Link to="/account">
              <img src={profile} alt="avatar" className="topAvatar" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
