import React, { useState } from "react";

import {
  Card,
  CardBody,
  Row,
  Container,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import DeleteModal from "../../components/UI/DeleteModal";
import img1 from "../../assets/images/users/avatar-1.jpg";
const ReadContact = ({
  contact,
  setOpen,
  setContact,
  deleteContact,
  putContact,
  handleRead,
  setReply,
  reply,
}) => {
  const [menubtn, setmenubtn] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <React.Fragment>
      <div>
        <Container fluid={true}>
          <DeleteModal
            show={deleteModal}
            onDeleteClick={deleteContact}
            onCloseClick={() => setDeleteModal(false)}
          />
          <Row className="mb-4">
            <div className="col-xl-9">
              <div className="d-flex flex-wrap justify-content-between">
                <div className="btn-toolbar" role="toolbar">
                  <div className="btn-group me-2 mb-3">
                    <button
                      type="button"
                      className="btn btn-primary waves-light waves-effect"
                      onClick={() => {
                        setContact({});
                        setOpen(false);
                        setReply(false);
                      }}
                    >
                      <i className="mdi mdi-arrow-left"></i>
                    </button>
                    {/* <button
                      type="button"
                      className="btn btn-primary waves-light waves-effect"
                    >
                      <i className="fa fa-exclamation-circle"></i>
                    </button> */}
                    <button
                      type="button"
                      className="btn btn-primary waves-light waves-effect"
                      onClick={() => setDeleteModal(true)}
                    >
                      <i className="far fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
                <div
                  className="btn-toolbar justify-content-md-end"
                  role="toolbar"
                >
                  <div className="btn-group ms-2 mb-3">
                    <Dropdown
                      isOpen={menubtn}
                      toggle={() => setmenubtn(!menubtn)}
                    >
                      <DropdownToggle className="btn" color="primary" caret>
                        More <i className="mdi mdi-dots-vertical ms-1"></i>{" "}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem
                          onClick={() => {
                            handleRead(contact._id);
                            setContact((prev) => ({
                              ...prev,
                              Read: !prev.Read,
                            }));
                          }}
                        >
                          {contact.Read ? "Mark as Unread" : "Mark as read"}
                        </DropdownItem>
                        {contact.Status != "Unsolved" && (
                          <DropdownItem
                            onClick={() => {
                              putContact({ Status: "Unsolved" });
                              setContact((prev) => ({
                                ...prev,
                                Status: "Unsolved",
                              }));
                            }}
                          >
                            Mark as Unsolved
                          </DropdownItem>
                        )}
                        {contact.Status != "In progress" && (
                          <DropdownItem
                            onClick={() => {
                              putContact({ Status: "In progress" });
                              setContact((prev) => ({
                                ...prev,
                                Status: "In progress",
                              }));
                            }}
                          >
                            Mark as In progress
                          </DropdownItem>
                        )}
                        {contact.Status != "Solved" && (
                          <DropdownItem
                            onClick={() => {
                              putContact({ Status: "Solved" });
                              setContact((prev) => ({
                                ...prev,
                                Status: "Solved",
                              }));
                            }}
                          >
                            Mark as Solved
                          </DropdownItem>
                        )}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              </div>
              <Card className="mb-0">
                <CardBody>
                  <div className="d-flex mb-4">
                    <div className="flex-shrink-0 me-3">
                      <img
                        className="rounded-circle avatar-sm"
                        src={img1}
                        alt="Generic placeholder"
                      />
                    </div>
                    <div className="flex-grow-1">
                      <h4
                        className="font-size-16"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "1rem",
                        }}
                      >
                        {contact.FullName}
                        <div
                          className="text-muted font-size-13"
                          style={{ margin: "0.1rem" }}
                        >{`<${contact.Status}>`}</div>
                      </h4>
                      <p>
                        {
                          <a
                            href={"mailto:" + contact.Email}
                            className="text-muted font-size-13"
                          >
                            {contact.Email}{" "}
                          </a>
                        }

                        {contact.PhoneNumber && (
                          <a
                            href={"tel:" + contact.PhoneNumber}
                            className="text-muted font-size-13"
                          >
                            (tel: {contact.PhoneNumber})
                          </a>
                        )}
                      </p>
                    </div>
                  </div>
                  <h4 className="font-size-16">Subject: {contact.Subject}</h4>

                  <h4
                    className="font-size-14"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "normal",
                    }}
                  >
                    Contact preference: {contact.Preference}
                  </h4>

                  <p>{contact.Content}</p>

                  <hr />
                  <h4 className="font-size-16">Reply: {contact.Subject}</h4>
                  <div dangerouslySetInnerHTML={{ __html: contact.Reply }} />

                  <Button
                    className="btn btn-secondary waves-effect mt-4"
                    onClick={() => {
                      setReply(!reply);
                    }}
                  >
                    <i className="mdi mdi-reply"></i> Reply
                  </Button>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ReadContact;
