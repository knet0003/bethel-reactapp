import React, { useState } from "react";
import "./topBar.css";
import profile from "../../profile.png";
import logo from "../../bethelblock.png";
import { Link } from "react-router-dom";
import authService from "../../services/authService";
import { getProfPicture } from "./../../services/authService";

function TopBar() {
  const [name, setName, picture, setPicture] = useState(0);
  setName(authService);
  const { data } = getProfPicture();
  const { image_stream } = data;
  setPicture(image_stream);
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
              <img
                src={`data: image/png;base64,${picture}`}
                alt="avatar"
                className="avatar"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
