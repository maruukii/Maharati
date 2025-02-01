import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

//i18n
import { withTranslation } from "react-i18next";
// Redux
import { connect } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useLogout from "../../../hooks/useLogout";
import withRouter from "../withRouter";

// users
import girlAvatar from "../../../assets/images/users/female.jpg";
import guyAvatar from "../../../assets/images/users/male.jpg";

import useAuth from "../../../hooks/useAuth";
const ProfileMenu = (props) => {
  const { auth } = useAuth();
  const [menu, setMenu] = useState(false);
  const logout = useLogout();
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    const from = location.state?.from?.pathname || "/";
    navigate(from, { replace: true });
  };

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={auth?.user?.Gender === "Female" ? girlAvatar : guyAvatar}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ms-2 me-2">
            {auth?.user?.FirstName}
          </span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/user-profile">
            {" "}
            <i className="ri-user-line align-middle me-2" />
            {props.t("Profile")}{" "}
          </DropdownItem>
          <DropdownItem tag="a" href="#">
            <i className="ri-wallet-2-line align-middle me-2" />
            {props.t("My Wallet")}
          </DropdownItem>
          <DropdownItem tag="a" href="#">
            <span className="badge bg-success float-end mt-1">11</span>
            <i className="ri-settings-2-line align-middle me-2" />
            {props.t("Settings")}
          </DropdownItem>
          <DropdownItem tag="a" href="auth-lock-screen">
            <i className="ri-lock-unlock-line align-middle me-2" />
            {props.t("Lock screen")}
          </DropdownItem>
          <div className="dropdown-divider" />
          <Link to="/" className="dropdown-item" onClick={handleLogout}>
            <i className="ri-shut-down-line align-middle me-2 text-danger" />
            <span>{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
};

const mapStatetoProps = (state) => {
  const { error, success } = state.profile;
  return { error, success };
};

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
);
