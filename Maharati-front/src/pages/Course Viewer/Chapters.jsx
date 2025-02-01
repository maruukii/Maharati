import React, { useState, useEffect } from "react";
import classnames from "classnames";

import {
  Card,
  CardBody,
  Col,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
const Chapters = ({ chapters, setSelectedChapter }) => {
  const [customActiveTab, setcustomActiveTab] = useState("Chapters");
  const tabid = ["Chapters", "Resources"];

  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };
  useEffect(() => {
    if (chapters && chapters.length > 0) {
      const timer = setTimeout(() => {
        setSelectedChapter(
          JSON.parse(localStorage.getItem("selected-chapter")) || chapters[0]
        );
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [chapters]);

  return (
    <div>
      <div
        className="content"
        style={{ marginBottom: "2rem", marginTop: "1rem" }}
      >
        <>
          <Col xl={9}>
            <Card className="mb-0">
              <CardBody>
                <Nav tabs className="nav-tabs-custom nav-justified">
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: customActiveTab === "Chapters",
                      })}
                      onClick={() => {
                        toggleCustom("Chapters");
                      }}
                    >
                      <i className="mdi mdi-book me-2 align-middle font-size-18">
                        {" "}
                      </i>
                      <span className="d-none d-md-inline-block">
                        {" "}
                        Chapters{" "}
                      </span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: customActiveTab === "Resources",
                      })}
                      onClick={() => {
                        toggleCustom("Resources");
                      }}
                    >
                      <i className="mdi mdi-file-multiple me-2 align-middle font-size-18"></i>{" "}
                      <span className="d-none d-md-inline-block">
                        Resources
                      </span>
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent
                  activeTab={customActiveTab}
                  className="pt-3 text-muted"
                >
                  {tabid.map((chapter, index) => (
                    <TabPane key={index} tabId={chapter}>
                      <Row>
                        <Col sm="12">
                          <div className="card-text mb-0">
                            <div
                              className="tab-pane active"
                              id="custom-primary"
                              role="tabpanel"
                            >
                              <ul
                                className="chapter-list mb-0"
                                style={{ maxHeight: "75vh", overflow: "auto" }}
                              >
                                {Object.keys(chapters).length !== 0 &&
                                  customActiveTab === "Chapters" &&
                                  chapters.map((x, index) => (
                                    <li
                                      key={index}
                                      className="unread chapter-item"
                                      onClick={() => {
                                        setSelectedChapter(x);
                                        localStorage.setItem(
                                          "selected-chapter",
                                          JSON.stringify(x)
                                        );
                                      }}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <span className="col-mail col-mail-1">
                                        <a to="#" className="chapter-title">
                                          {x.ChapterTitle}
                                        </a>
                                      </span>

                                      <div className="scroll-progress">
                                        <div
                                          className="scroll-progress-bar"
                                          style={{
                                            width: `${x.scrollProgress || 0}%`,
                                            backgroundColor: "#0bb197",
                                          }}
                                        ></div>
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
        </>
      </div>
    </div>
  );
};

export default Chapters;
