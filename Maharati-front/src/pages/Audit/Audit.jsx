import React, { useState, useEffect } from "react";
import DeleteModal from "../../components/UI/DeleteModal";
import DataTable from "react-data-table-component";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Container,
  UncontrolledDropdown,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Form,
} from "reactstrap";
import useAuth from "../../hooks/useAuth";
import { useSnackbar } from "notistack";
import Breadcrumbs from "../../components/Common/Breadcrumb";

import axios from "axios";
const Audit = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [log, setLog] = useState({});
  const [data, setData] = useState([]);
  const { auth } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        import.meta.env.VITE_HOST + `/audits/delete/${log._id}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      );
      {
        enqueueSnackbar(`Audit log ${log._id} deleted`);
      }
      setLog({});
      setDeleteModal(false);
      setModal(false);
    } catch (error) {
      window.location.reload();
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_HOST + "/audits",
          {
            headers: {
              Authorization: `Bearer ${auth?.accessToken}`,
            },
          }
        );

        setData(response.data.reverse());
      } catch (error) {
        window.location.reload();

        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [auth?.accessToken, log]);

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">#</span>,
      selector: (row, index) => index + 1,
      sortable: false,
    },
    {
      name: <span className="font-weight-bold fs-13">Type</span>,
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Done by</span>,
      selector: (row) => (
        <>
          <strong>{row.doneBy.FirstName + " " + row.doneBy.LastName}</strong>{" "}
          <p>{"< " + row.doneBy.Email + " >"}</p>
        </>
      ),

      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">On</span>,
      selector: (row) => (
        <strong
          style={{ cursor: "pointer" }}
          onClick={() => {
            setLog(row);
            setModal(true);
          }}
        >
          {row.On._id}
        </strong>
      ),
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">At</span>,
      selector: (row) => row.At,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      cell: (row) => {
        return (
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-secondary btn-sm"
              tag="button"
            >
              <i className="ri-more-fill align-middle"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem
                onClick={() => {
                  setLog(row);
                  setModal(true);
                }}
              >
                <i className="ri-eye-fill align-bottom me-2 text-muted"></i>View
              </DropdownItem>
              <DropdownItem
                className="remove-item-btn"
                onClick={() => {
                  setLog(row);
                  setDeleteModal(true);
                }}
              >
                {" "}
                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                Delete{" "}
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Audit" breadcrumbItem="Logs" />
          <DeleteModal
            show={deleteModal}
            onDeleteClick={handleDelete}
            onCloseClick={() => setDeleteModal(false)}
          />
          <DataTable
            fixedHeader
            fixedHeaderScrollHeight="40rem"
            columns={columns}
            data={data}
          />
        </Container>

        <Modal isOpen={modal} onClosed={() => setModal(false)}>
          <ModalHeader toggle={() => setModal(false)} tag="h4">
            View Log
          </ModalHeader>
          <ModalBody>
            <Form>
              <Row>
                <Col className="col-12 mb-3">
                  <Label className="form-label">Type:</Label>
                  <Input type="text" value={log.type} readOnly />
                </Col>
                <Label className="form-label">Done by:</Label>
                {log.doneBy &&
                  Object.entries(log.doneBy)
                    .filter(
                      ([key]) =>
                        key === "FirstName" ||
                        key === "LastName" ||
                        key === "Email"
                    )
                    .map(([key, value]) => (
                      <Col className="col-12 mb-3" key={key}>
                        <Label className="form-label">{key}</Label>
                        <Input type="text" value={value || ""} readOnly />
                      </Col>
                    ))}
                <Col className="col-12 mb-3">
                  <Label className="form-label">At:</Label>
                  <Input type="text" value={log.At} readOnly />
                </Col>
                <Label className="form-label">On:</Label>
                {log.On &&
                  Object.entries(log.On)
                    .filter(
                      ([key]) =>
                        key !== "__v" &&
                        key !== "_id" &&
                        key !== "createdBy" &&
                        key !== "Password" &&
                        key !== "Content" &&
                        key !== "refreshToken" &&
                        key !== "Notifications"
                    )
                    .map(([key, value]) => (
                      <Col className="col-12 mb-3" key={key}>
                        <Label className="form-label">{key}</Label>
                        <Input type="text" value={value || ""} readOnly />
                      </Col>
                    ))}
              </Row>

              <Row>
                <Col>
                  <div className="text-end" style={{ margin: "1rem" }}>
                    <button
                      type="button"
                      className="btn btn-light me-2"
                      onClick={() => {
                        setModal(false);
                      }}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger me-2"
                      onClick={() => {
                        setDeleteModal(true);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </Col>
              </Row>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default Audit;
