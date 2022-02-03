import React, { useState } from "react";
import "./topBar.css";
import profile from "../../avatar.png";
import logo from "../../bethelblock.png";
import { Link } from "react-router-dom";
import authService from "../../services/authService";
import { getProfPicture } from "./../../services/authService";

function TopBar() {
  const [name, setName, picture, setPicture] = useState(0);
  setName(authService);
  const { data } = getProfPicture();
  const { message, image_stream } = data;
  if (message === "") setPicture(image_stream);
  else setPicture("");
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

              {/* {picture ? (
                <img
                  src={`data: image/png;base64,${picture}`}
                  alt="avatar"
                  className="topAvatar"
                />
              ) : (
                <img src={profile} alt="avatar" className="topAvatar" />
              )} */}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
