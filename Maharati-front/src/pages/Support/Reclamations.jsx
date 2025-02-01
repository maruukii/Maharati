import React, { useState, useEffect } from "react";

import {
  Card,
  CardBody,
  Col,
  Row,
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

import { Link } from "react-router-dom";
import classnames from "classnames";
import Sidebar from "./Sidebar";
import axios from "axios";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import useAuth from "../../hooks/useAuth";
import ReadContact from "./ReadContact";
import { useSnackbar } from "notistack";
import ReplyCompose from "./ReplyCompose";
const Reclamations = () => {
  document.title = "Support reclamations";
  const { enqueueSnackbar } = useSnackbar();
  const { auth } = useAuth();
  const [customActiveTab, setcustomActiveTab] = useState("All");
  const [data, setData] = useState([]);
  const [contact, setContact] = useState({});
  const [countAll, setCountAll] = useState(0);
  const [countSolved, setCountSolved] = useState(0);
  const [countInProgress, setCountInProgress] = useState(0);
  const [countUnsolved, setCountUnSolved] = useState(0);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);
  const [reply, setReply] = useState(false);
  const [compose, setCompose] = useState(false);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const linkMap = {
    "Admission Help": "success",
    "Apply Scholarship": "warning",
    "Private Tutor": "primary",
    "Admission Session": "danger",
    Other: "info",
  };
  const tabid = ["All", "Unsolved", "In progress", "Solved"];
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setCurrentPage(1);
      setOpen(false);
      setcustomActiveTab(tab);
    }
  };

  const fetch = async (page = 1) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_HOST + `/support/${customActiveTab}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
          params: { page, limit: 10 },
        }
      );
      setData(response.data.contacts.reverse());
      setPagination(response.data.pagination);
    } catch (error) {
      console.log(error);
      window.location.reload();
    }
    try {
      const res = await axios.get(import.meta.env.VITE_HOST + `/support/All`, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });
      setCountAll(Object.keys(res.data).length);
      setUnread(res.data.filter((item) => item.Read === false).length);

      setCountSolved(
        Object.keys(res.data.filter((item) => item.Status === "Solved")).length
      );
      setCountUnSolved(
        Object.keys(res.data.filter((item) => item.Status === "Unsolved"))
          .length
      );
      setCountInProgress(
        Object.keys(res.data.filter((item) => item.Status === "In progress"))
          .length
      );
    } catch (error) {
      console.log(error);
      window.location.reload();
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetch(page);
  };
  useEffect(() => {
    fetch(currentPage);
  }, [currentPage, customActiveTab, contact]);

  const handleRead = async (id) => {
    try {
      const response = await axios.put(
        import.meta.env.VITE_HOST + `/support/read/${id}`,
        [],
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      );
      setCurrentPage(currentPage);
    } catch (error) {
      console.log(error);
      window.location.reload();
    }
  };
  const deleteContact = async () => {
    try {
      const response = await axios.delete(
        import.meta.env.VITE_HOST + `/support/delete/${contact._id}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      );
      {
        enqueueSnackbar(`Contact ${contact._id} Deleted !`);
      }
      setOpen(false);
      setContact({});
    } catch (error) {
      window.location.reload();
    }
  };
  const putContact = async (req) => {
    try {
      const response = await axios.put(
        import.meta.env.VITE_HOST + `/support/update/${contact._id}`,
        req,
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      );

      setOpen(false);
      setContact({});
    } catch (error) {
      window.location.reload();
    }
  };
  const composeEmail = async (destination, subject, content) => {
    try {
      const req = {
        destination: destination,
        subject: subject,
        content: content,
      };
      const response = await axios.post(
        import.meta.env.VITE_HOST + `/compose-mail`,
        req,
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      );
      setCurrentPage(currentPage);
    } catch (error) {
      console.log(error);
      window.location.reload();
    }
  };

  return (
    <React.Fragment>
      <div className="page-content" style={{ marginBottom: "2rem" }}>
        <Container fluid={true}>
          {compose ? (
            <Breadcrumbs title="Support" breadcrumbItem="Compose Mail" />
          ) : !open ? (
            <Breadcrumbs title="Support" breadcrumbItem="Contacts" />
          ) : (
            <Breadcrumbs title="Support" breadcrumbItem="Read Contact" />
          )}
          <Row>
            {/* SideBar */}
            <Sidebar
              count={[
                countAll,
                countUnsolved,
                countInProgress,
                countSolved,
                unread,
              ]}
              toggleCustom={toggleCustom}
              customActiveTab={customActiveTab}
              setCompose={setCompose}
              setOpen={setOpen}
              setContact={setContact}
            />
            {!open && !compose && (
              <>
                <Col xl={9}>
                  <Card className="mb-0">
                    <CardBody>
                      <Nav tabs className="nav-tabs-custom nav-justified">
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: customActiveTab === "All",
                            })}
                            onClick={() => {
                              toggleCustom("All");
                            }}
                          >
                            <i className="mdi mdi-inbox me-2 align-middle font-size-18">
                              {" "}
                            </i>
                            <span className="d-none d-md-inline-block">
                              {" "}
                              All{" "}
                            </span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: customActiveTab === "Unsolved",
                            })}
                            onClick={() => {
                              toggleCustom("Unsolved");
                            }}
                          >
                            <i className="mdi mdi-alpha-x-circle-outline me-2 align-middle font-size-18"></i>{" "}
                            <span className="d-none d-md-inline-block">
                              Unsolved
                            </span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: customActiveTab === "In progress",
                            })}
                            onClick={() => {
                              toggleCustom("In progress");
                            }}
                          >
                            <i className="mdi mdi-progress-question me-2 align-middle font-size-18"></i>{" "}
                            <span className="d-none d-md-inline-block">
                              In progress{" "}
                            </span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: customActiveTab === "Solved",
                            })}
                            onClick={() => {
                              toggleCustom("Solved");
                            }}
                          >
                            <i className="mdi mdi-check-circle-outline me-2 align-middle font-size-18"></i>{" "}
                            <span className="d-none d-md-inline-block">
                              Solved{" "}
                            </span>
                          </NavLink>
                        </NavItem>
                      </Nav>

                      <TabContent
                        activeTab={customActiveTab}
                        className="pt-3 text-muted"
                      >
                        {tabid.map((nav, index) => (
                          <TabPane key={index} tabId={nav}>
                            <Row>
                              <Col sm="12">
                                <div className="card-text mb-0">
                                  <div
                                    className="tab-pane active"
                                    id="custom-primary"
                                    role="tabpanel"
                                  >
                                    <ul className="message-list mb-0">
                                      {data.map((x, index) => (
                                        <li
                                          key={index}
                                          className={!x.Read ? "unread" : ""}
                                          onClick={() => {
                                            !x.Read
                                              ? handleRead(x._id)
                                              : undefined;
                                            x.Read = true;
                                            setContact(x);
                                            setOpen(true);
                                          }}
                                        >
                                          <span className="col-mail col-mail-1">
                                            {/* <span className="checkbox-wrapper-mail">
                                          <input
                                            type="checkbox"
                                            id={`chk${index}`}
                                          />
                                          <label
                                            htmlFor={`chk${index}`}
                                            className="toggle"
                                          ></label>
                                        </span> */}
                                            <Link to="#" className="title">
                                              {x.FullName}
                                              {/* (3) */}
                                            </Link>
                                          </span>
                                          <div className="col-mail col-mail-2">
                                            <Link to="#" className="subject">
                                              {x.Status === "Unsolved" ? (
                                                <i
                                                  className="mdi mdi-alpha-x-circle-outline me-2 align-middle"
                                                  style={{ fontSize: "24px" }}
                                                ></i>
                                              ) : x.Status === "Solved" ? (
                                                <i
                                                  className="mdi mdi-check-circle-outline  me-2 me-2 align-middle"
                                                  style={{ fontSize: "24px" }}
                                                ></i>
                                              ) : (
                                                <i
                                                  className="mdi mdi-progress-question me-2 align-middle"
                                                  style={{ fontSize: "24px" }}
                                                ></i>
                                              )}
                                              <span
                                                className={
                                                  "bg-" +
                                                  linkMap[x.Subject] +
                                                  " badge me-2"
                                                }
                                              >
                                                {x.Subject}
                                              </span>
                                              from: {x.Email} -{" "}
                                              <span className="teaser">
                                                {x.Content}
                                              </span>
                                            </Link>
                                            <div className="date">
                                              {months[
                                                parseInt(
                                                  x.modifiedAt
                                                    .toLocaleString("en-US", {
                                                      month: "short",
                                                    })
                                                    .split(" ")[0]
                                                    .split("-")[1],
                                                  10
                                                ) - 1
                                              ] +
                                                "-" +
                                                x.modifiedAt
                                                  .split(" ")[0]
                                                  .split("-")[2]}
                                            </div>
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </TabPane>
                        ))}
                      </TabContent>
                    </CardBody>
                  </Card>
                </Col>
                <Row className="justify-content-end">
                  <Col xl={9}>
                    <Row className="my-4">
                      <div className="col-7">
                        Showing{" "}
                        {(currentPage - 1) * 10 + 1 > pagination.total
                          ? pagination.total
                          : (currentPage - 1) * 10 + 1}{" "}
                        -{" "}
                        {currentPage * 10 > pagination.total
                          ? pagination.total
                          : currentPage * 10}{" "}
                        of
                        {" " + pagination.total}
                      </div>
                      <div className="col-5">
                        <div className="btn-group float-end">
                          <button
                            type="button"
                            className="btn btn-sm btn-success waves-effect"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                          >
                            <i className="fa fa-chevron-left"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-success waves-effect"
                            disabled={currentPage >= pagination.totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                          >
                            <i className="fa fa-chevron-right"></i>
                          </button>
                        </div>
                      </div>
                    </Row>
                  </Col>
                </Row>
              </>
            )}
            <Col>
              {open && (
                <ReadContact
                  contact={contact}
                  setOpen={setOpen}
                  deleteContact={deleteContact}
                  putContact={putContact}
                  setContact={setContact}
                  handleRead={handleRead}
                  setReply={setReply}
                  reply={reply}
                />
              )}
              {((open && reply) || compose) && (
                <ReplyCompose
                  contact={contact}
                  putContact={putContact}
                  setReply={setReply}
                  setContact={setContact}
                  composeEmail={composeEmail}
                  setCompose={setCompose}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Reclamations;
