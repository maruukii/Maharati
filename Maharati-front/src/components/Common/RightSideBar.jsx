import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import {
  changeLayout,
  changeLayoutMode,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarType,
  changeTopbarTheme,
  showRightSidebarAction,
} from "../../store/actions";

//SimpleBar
import SimpleBar from "simplebar-react";

import { Link } from "react-router-dom";

//constants
import {
  layoutTypes,
  layoutWidthTypes,
  topBarThemeTypes,
  leftSidebarTypes,
  leftSideBarThemeTypes,
  layoutModeTypes,
} from "../../constants/layout";

const RightSidebar = (props) => {
  return (
    <React.Fragment>
      <div className="right-bar" id="right-bar">
        <SimpleBar style={{ height: "900px" }}>
          <div data-simplebar className="h-100">
            <div className="rightbar-title px-3 py-4">
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  props.showRightSidebarAction(false);
                }}
                className="right-bar-toggle float-end"
              >
                <i className="mdi mdi-close noti-icon" />
              </Link>
              <h5 className="m-0">Settings</h5>
            </div>

            <hr className="my-0" />

            <div className="p-4">
              <div className="radio-toolbar">
                <span className="mb-2 d-block">Layouts</span>
                <input
                  type="radio"
                  id="radioVertical"
                  name="radioFruit"
                  value={layoutTypes.VERTICAL}
                  checked={
                    localStorage.getItem("layoutType") === layoutTypes.VERTICAL
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      localStorage.setItem("layoutType", e.target.value);
                      props.changeLayout(e.target.value);
                      props.setLayoutType(e.target.value);
                    }
                  }}
                />
                <label className="me-1" htmlFor="radioVertical">
                  Vertical
                </label>
                <input
                  type="radio"
                  id="radioHorizontal"
                  name="radioFruit"
                  value={layoutTypes.HORIZONTAL}
                  checked={
                    localStorage.getItem("layoutType") ===
                    layoutTypes.HORIZONTAL
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      localStorage.setItem("layoutType", e.target.value);
                      props.changeLayout(e.target.value);
                      props.setLayoutType(e.target.value);
                    }
                  }}
                />
                <label htmlFor="radioHorizontal">Horizontal</label>
              </div>

              <hr className="mt-1" />

              {/* Layout Mode */}
              <div className="radio-toolbar">
                <span className="mb-2 d-block">Layout Mode</span>
                <input
                  type="radio"
                  id="radioLightmode"
                  name="radioMode"
                  value={layoutModeTypes.LIGHTMODE}
                  checked={
                    localStorage.getItem("layoutModeType") ===
                    layoutModeTypes.LIGHTMODE
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      localStorage.setItem("layoutModeType", e.target.value);

                      props.changeLayoutMode(e.target.value);
                    }
                  }}
                />
                <label className="me-1" htmlFor="radioLightmode">
                  Light
                </label>

                <input
                  type="radio"
                  id="radioDarkMode"
                  name="radioMode"
                  value={layoutModeTypes.DARKMODE}
                  checked={
                    localStorage.getItem("layoutModeType") ===
                    layoutModeTypes.DARKMODE
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      localStorage.setItem("layoutModeType", e.target.value);
                      props.changeLayoutMode(e.target.value);
                    }
                  }}
                />
                <label htmlFor="radioDarkMode">Dark</label>
              </div>

              <hr className="mt-1" />

              <div className="radio-toolbar">
                <span className="mb-2 d-block" id="radio-title">
                  Layout Width
                </span>
                <input
                  type="radio"
                  id="radioFluid"
                  name="radioWidth"
                  value={layoutWidthTypes.FLUID}
                  checked={
                    localStorage.getItem("layoutWidthType") ===
                    layoutWidthTypes.FLUID
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      localStorage.setItem("layoutWidthType", e.target.value);

                      props.changeLayoutWidth(e.target.value);
                    }
                  }}
                />
                <label className="me-1" htmlFor="radioFluid">
                  Fluid
                </label>
                <input
                  type="radio"
                  id="radioBoxed"
                  name="radioWidth"
                  value={layoutWidthTypes.BOXED}
                  checked={
                    localStorage.getItem("layoutWidthType") ===
                    layoutWidthTypes.BOXED
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      localStorage.setItem("layoutWidthType", e.target.value);

                      props.changeLayoutWidth(e.target.value);
                    }
                  }}
                />
                <label htmlFor="radioBoxed" className="me-2">
                  Boxed
                </label>
              </div>
              <hr className="mt-1" />

              <div className="radio-toolbar">
                <span className="mb-2 d-block" id="radio-title">
                  Topbar Theme
                </span>
                <input
                  type="radio"
                  id="radioThemeLight"
                  name="radioTheme"
                  value={topBarThemeTypes.LIGHT}
                  checked={
                    localStorage.getItem("topBarThemeType") ===
                    topBarThemeTypes.LIGHT
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      localStorage.setItem("topBarThemeType", e.target.value);

                      props.changeTopbarTheme(e.target.value);
                    }
                  }}
                />
                <label className="me-1" htmlFor="radioThemeLight">
                  Light
                </label>
                <input
                  type="radio"
                  id="radioThemeDark"
                  name="radioTheme"
                  value={topBarThemeTypes.DARK}
                  checked={
                    localStorage.getItem("topBarThemeType") ===
                    topBarThemeTypes.DARK
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      localStorage.setItem("topBarThemeType", e.target.value);

                      props.changeTopbarTheme(e.target.value);
                    }
                  }}
                />
                <label className="me-1" htmlFor="radioThemeDark">
                  Dark
                </label>
              </div>

              {localStorage.getItem("layoutType") === layoutTypes.VERTICAL ? (
                <React.Fragment>
                  <hr className="mt-1" />
                  <div className="radio-toolbar">
                    <span className="mb-2 d-block" id="radio-title">
                      Left Sidebar Type{" "}
                    </span>
                    <input
                      type="radio"
                      id="sidebarDefault"
                      name="sidebarType"
                      value={leftSidebarTypes.DEFAULT}
                      checked={
                        localStorage.getItem("leftSidebarType") ===
                        leftSidebarTypes.DEFAULT
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          localStorage.setItem(
                            "leftSidebarType",
                            e.target.value
                          );

                          props.changeSidebarType(e.target.value);
                        }
                      }}
                    />
                    <label className="me-1" htmlFor="sidebarDefault">
                      Default
                    </label>
                    <input
                      type="radio"
                      id="sidebarCompact"
                      name="sidebarType"
                      value={leftSidebarTypes.COMPACT}
                      checked={
                        localStorage.getItem("leftSidebarType") ===
                        leftSidebarTypes.COMPACT
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          localStorage.setItem(
                            "leftSidebarType",
                            e.target.value
                          );

                          props.changeSidebarType(e.target.value);
                        }
                      }}
                    />
                    <label className="me-1" htmlFor="sidebarCompact">
                      Compact
                    </label>
                    <input
                      type="radio"
                      id="sidebarIcon"
                      name="sidebarType"
                      value={leftSidebarTypes.ICON}
                      checked={
                        localStorage.getItem("leftSidebarType") ===
                        leftSidebarTypes.ICON
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          localStorage.setItem(
                            "leftSidebarType",
                            e.target.value
                          );

                          props.changeSidebarType(e.target.value);
                        }
                      }}
                    />
                    <label className="me-1" htmlFor="sidebarIcon">
                      Icon
                    </label>
                  </div>

                  <hr className="mt-1" />

                  <div className="radio-toolbar">
                    <span className="mb-2 d-block" id="radio-title">
                      Left Sidebar Color Options
                    </span>
                    <input
                      type="radio"
                      id="leftsidebarThemelight"
                      name="leftsidebarTheme"
                      value={leftSideBarThemeTypes.LIGHT}
                      checked={
                        localStorage.getItem("leftSideBarThemeType") ===
                        leftSideBarThemeTypes.LIGHT
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          localStorage.setItem(
                            "leftSideBarThemeType",
                            e.target.value
                          );

                          props.changeSidebarTheme(e.target.value);
                        }
                      }}
                    />
                    <label className="me-1" htmlFor="leftsidebarThemelight">
                      Light
                    </label>
                    <input
                      type="radio"
                      id="leftsidebarThemedark"
                      name="leftsidebarTheme"
                      value={leftSideBarThemeTypes.DARK}
                      checked={
                        localStorage.getItem("leftSideBarThemeType") ===
                        leftSideBarThemeTypes.DARK
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          localStorage.setItem(
                            "leftSideBarThemeType",
                            e.target.value
                          );

                          props.changeSidebarTheme(e.target.value);
                        }
                      }}
                    />
                    <label className="me-1" htmlFor="leftsidebarThemedark">
                      Dark
                    </label>
                  </div>
                  <hr className="mt-1" />
                </React.Fragment>
              ) : null}
            </div>
          </div>
        </SimpleBar>
      </div>
      <div className="rightbar-overlay"></div>
    </React.Fragment>
  );
};

RightSidebar.propTypes = {
  changeLayout: PropTypes.func,
  changeLayoutMode: PropTypes.func,
  changeLayoutWidth: PropTypes.func,
  changeSidebarTheme: PropTypes.func,
  changeSidebarType: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  layoutType: PropTypes.any,
  layoutModeTypes: PropTypes.any,
  layoutWidth: PropTypes.any,
  leftSideBarTheme: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  topbarTheme: PropTypes.any,
  onClose: PropTypes.func,
};

const mapStateToProps = (state) => {
  return { ...state.Layout };
};

export default connect(mapStateToProps, {
  changeLayout,
  changeLayoutMode,
  changeSidebarTheme,
  changeSidebarType,
  changeLayoutWidth,
  changeTopbarTheme,
  showRightSidebarAction,
})(RightSidebar);
