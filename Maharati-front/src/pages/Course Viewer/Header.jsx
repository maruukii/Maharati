import React, { useState } from "react";
import Logo from "../../assets/img/LOGO.png";

import { Link, useNavigate } from "react-router-dom";

const Header = ({ title }) => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/courses", { replace: true });
  };
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen(); // Enter fullscreen mode
    } else if (document.exitFullscreen) {
      document.exitFullscreen(); // Exit fullscreen mode
    }
  };
  return (
    <div>
      <div className="header-course">
        <img src={Logo} alt="Logo" className="logo-viewer" />

        <h1 className="title">{title}</h1>
        <button
          type="button"
          className="btn header-item noti-icon waves-effect fullscreen-button"
          onClick={toggleFullScreen}
        >
          <i className="ri-fullscreen-line"></i>
        </button>
        <button className="close-course" onClick={handleClose}>
          <span className="mdi mdi-window-close"></span>
        </button>
      </div>
    </div>
  );
};

export default Header;
