import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import SimpleBar from "simplebar-react";

//Import images
import avatar3 from "../../../assets/images/users/male.jpg";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";

//i18n
import { withTranslation } from "react-i18next";

import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import moment from "moment";

const getTimeDifference = (date) => {
  const now = moment();
  const then = moment(date);
  const diffInSeconds = now.diff(then, "seconds");
  const diffInMinutes = now.diff(then, "minutes");
  const diffInHours = now.diff(then, "hours");
  const diffInDays = now.diff(then, "days");

  if (diffInSeconds < 60) {
    return `${diffInSeconds} second${diffInSeconds === 1 ? `` : `s`} ago`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? `` : `s`} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? `` : `s`} ago`;
  } else {
    return `${diffInDays} day${diffInDays === 1 ? `` : `s`} ago`;
  }
};

const NotificationDropdown = (props) => {
  const { auth } = useAuth();
  const [menu, setMenu] = useState(false);
  const [newNotifs, setNewNotifs] = useState(0);
  const audio = new Audio("/mixkit-software-interface-start-2574.wav");
  const [lastNotifsCount, setLastNotifsCount] = useState(0); // Track the last number of notifications
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_HOST + `/notifications/${auth?.user?._id}`,
          {
            headers: {
              Authorization: `Bearer ${auth?.accessToken}`,
            },
          }
        );
        const newNotifsCount = response.data.newNotifs;

        setNotifs(response.data.notifs.reverse());
        setNewNotifs(newNotifsCount);
        if (newNotifsCount !== lastNotifsCount && newNotifsCount > 0) {
          audio.play();
        }
        setLastNotifsCount(newNotifsCount);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotifs();

    const intervalId = setInterval(fetchNotifs, 5000);

    return () => clearInterval(intervalId);
  }, [auth?.accessToken, lastNotifsCount]);

  const handleView = async () => {
    try {
      if (auth.user) {
        const response = await axios.put(
          import.meta.env.VITE_HOST +
            `/notifications/viewed/${auth?.user?._id}`,
          [],
          {
            headers: {
              Authorization: `Bearer ${auth?.accessToken}`,
            },
          }
        );
      }
      setNewNotifs(0);
    } catch (error) {
      console.log(error);
      window.location.reload();
    }
  };

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => {
          !menu && handleView();
          !menu && setNewNotifs(0);
          setMenu(!menu);
        }}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <i className="ri-notification-3-line" />
          {newNotifs !== 0 && <span className="noti-dot"></span>}
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0">{props.t("Notifications")}</h6>
              </Col>
              <div className="col-auto">
                <Link to="/#" className="small">
                  View All
                </Link>
              </div>
            </Row>
          </div>

          {/* Updated SimpleBar with fixed height */}
          <SimpleBar style={{ height: "230px", overflowY: "auto" }}>
            {notifs.map((notif, index) => (
              <Link
                to={`/${notif.type}` || ""}
                key={index}
                className="text-reset notification-item"
                onClick={() => setMenu(!menu)}
              >
                <div className="d-flex">
                  <div className="flex-shrink-0 me-3">
                    <div className="avatar-xs">
                      <span className="avatar-title bg-primary rounded-circle font-size-16">
                        <i
                          className={
                            notif.type === "reclamations"
                              ? "mdi mdi-face-agent"
                              : notif.type === "calendar"
                              ? "mdi mdi-calendar-outline"
                              : "ri-notification-3-line"
                          }
                        ></i>
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{notif.title}</h6>
                    <div className="font-size-12 text-muted">
                      <p className="mb-1">{notif.detail} </p>
                      <p className="mb-0">
                        <i className="mdi mdi-clock-outline"></i>{" "}
                        {getTimeDifference(notif.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            {notifs.length === 0 && (
              <div
                className="flex-grow-1"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div className="font-size-12 text-muted">
                  <p className="mb-1">No new notifications to display</p>
                </div>
              </div>
            )}
          </SimpleBar>

          {/* View More button under the scrollable area */}
          <div className="p-2 border-top d-grid">
            <Link
              className="btn btn-sm btn-link font-size-14 text-center"
              to="#"
            >
              <i className="mdi mdi-arrow-right-circle me-1"></i>{" "}
              <span key="t-view-more">{props.t("View More..")}</span>
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default withTranslation()(NotificationDropdown);

NotificationDropdown.propTypes = {
  t: PropTypes.any,
};
