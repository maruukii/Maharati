import React from "react";
import { Link } from "react-router-dom";
import { Button, Col } from "reactstrap";

const InboxSidebar = ({
  count,
  toggleCustom,
  customActiveTab,
  setCompose,
  setOpen,
  setContact,
}) => {
  return (
    <React.Fragment>
      <Col xl={3} className="mb-4 mb-xl-0">
        <div className="card h-100">
          <div className="card-body email-leftbar">
            <div className="d-grid">
              <Button
                className="btn btn-danger btn-rounded"
                onClick={() => {
                  setOpen(false);
                  setCompose(true);
                  setContact({});
                }}
              >
                <i className="mdi mdi-plus me-2"></i>
                Compose
              </Button>
            </div>

            <div className="mail-list mt-4">
              <a
                style={{ cursor: "pointer" }}
                className={customActiveTab === "All" ? "active" : ""}
                onClick={() => {
                  toggleCustom("All");
                  setOpen(false);
                  setCompose(false);
                }}
              >
                <i className="mdi mdi-inbox me-2 "></i> All{" "}
                <span className="ms-1 float-end">{`(${count[4]})${count[0]}`}</span>
              </a>
              <a
                style={{ cursor: "pointer" }}
                className={customActiveTab === "Unsolved" ? "active" : ""}
                onClick={() => {
                  toggleCustom("Unsolved");
                  setOpen(false);
                  setCompose(false);
                }}
              >
                <i className="mdi mdi-alpha-x-circle-outline me-2 font-size-18"></i>
                Unsolved <span className="ms-1 float-end">{count[1]}</span>
              </a>
              <a
                style={{ cursor: "pointer" }}
                className={customActiveTab === "In progress" ? "active" : ""}
                onClick={() => {
                  toggleCustom("In progress");
                  setOpen(false);
                  setCompose(false);
                }}
              >
                <i className="mdi mdi-progress-question me-2 font-size-18"></i>
                In progress <span className="ms-1 float-end">{count[2]}</span>
              </a>
              <a
                style={{ cursor: "pointer" }}
                className={customActiveTab === "Solved" ? "active" : ""}
                onClick={() => {
                  toggleCustom("Solved");
                  setOpen(false);
                  setCompose(false);
                }}
              >
                <i className="mdi mdi-check-circle-outline me-2 font-size-18"></i>
                Solved <span className="ms-1 float-end">{count[3]}</span>
              </a>

              {/* <Link to="#">
                <i className="mdi mdi-trash-can-outline me-2"></i>Trash
              </Link> */}
            </div>

            <div>
              <h6 className="mt-4">Labels</h6>

              <div className="mail-list mt-1">
                <Link>
                  <span
                    className="bg-success badge me-2"
                    style={{ fontSize: "0.7rem" }}
                  >
                    Admission Help
                  </span>
                </Link>{" "}
                <Link>
                  <span
                    className="bg-warning badge me-2"
                    style={{ fontSize: "0.7rem" }}
                  >
                    Apply Scholarship
                  </span>
                </Link>{" "}
                <Link>
                  <span
                    className="bg-primary badge me-2"
                    style={{ fontSize: "0.7rem" }}
                  >
                    Private Tutor
                  </span>
                </Link>
                <Link>
                  <span
                    className="bg-danger badge me-2"
                    style={{ fontSize: "0.7rem" }}
                  >
                    Admission Session
                  </span>
                </Link>{" "}
                <Link>
                  <span
                    className="bg-info badge me-2"
                    style={{ fontSize: "0.7rem" }}
                  >
                    Other
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </React.Fragment>
  );
};

export default InboxSidebar;
