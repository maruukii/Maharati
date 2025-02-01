import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
  ModalHeader,
} from "reactstrap";
import { useSnackbar } from "notistack";

import DataTable from "../../components/datatable/datatable";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import SimpleBar from "simplebar-react";
import { Link } from "react-router-dom";
// Import Flatepicker
import Flatpickr from "react-flatpickr";

import axios from "axios";
import useAuth from "../../hooks/useAuth";
import DataTables from "../Tables/DataTables/DataTables";
import Add from "../../components/CRUD/add";
import Delete from "../../components/CRUD/delete";
import Modify from "../../components/CRUD/modify";
const UsersList = () => {
  document.title = "Users | Maharati";
  const { auth } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [change, setChange] = useState(false);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState();
  const [modifopen, setModifopen] = useState(false);
  const [delopen, setDelopen] = useState(false);
  const [array, setArray] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_HOST + "/users", {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        });

        const usersWithFullName = response.data.map((user) => ({
          ...user,
          "Full name": `${user.FirstName} ${user.LastName}`,
        }));

        setUsers(usersWithFullName);
      } catch (error) {
        window.location.reload();

        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [change]);
  const putData = async () => {
    try {
      const newData = {
        ...array,
        doneBy: auth.user._id,
      };
      const response = await axios.put(
        import.meta.env.VITE_HOST + `/users/update/${user._id}`,
        newData,
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      );

      {
        enqueueSnackbar(`User ${array.Email} Modified !`);
      }
      setArray({});
      setChange(!change);
    } catch (error) {
      window.location.reload();
    }
  };
  const deleteData = async () => {
    try {
      const response = await axios.delete(
        import.meta.env.VITE_HOST + `/users/delete/${user._id}`,

        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
          params: {
            doneBy: auth.user._id,
          },
        }
      );
      {
        enqueueSnackbar(`User ${user.Email} Deleted !`);
      }
      setChange(!change);

      setArray({});
    } catch (error) {
      window.location.reload();
    }
  };

  const postData = async () => {
    try {
      const newData = {
        ...array,
        createdBy: auth.user._id,
      };

      const response = await axios.post(
        import.meta.env.VITE_HOST + "/users/new",
        newData,
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      );

      {
        enqueueSnackbar(`User ${array.Email} Added !`);
      }
      setArray({});
      setChange(!change);
    } catch (error) {
      window.location.reload();
    }
  };
  const columnsToShow = [
    {
      field: "Full name",
      type: "text",
      headerName: "Full name",
      width: 180,
    },
    {
      field: "Email",
      type: "email",
      headerName: "Email",
      width: 250,
    },

    {
      field: "PhoneNumber",
      type: "text",
      headerName: "Phone number",
      width: 140,
    },
    {
      field: "Role",
      type: "string",
      headerName: "Role",
      width: 100,
    },

    {
      field: "createdAt",
      headerName: "createdAt",
      width: 250,
      type: "string",
    },
    {
      field: "modifiedAt",
      headerName: "modifiedAt",
      width: 250,
      type: "string",
    },
  ];
  const columnsToAddOrModify = [
    {
      field: "FirstName",
      type: "text",
      headerName: "First name",
    },
    {
      field: "LastName",
      type: "text",
      headerName: "Last name",
    },
    {
      field: "Email",
      type: "email",
      headerName: "Email",
    },

    {
      field: "PhoneNumber",
      type: "text",
      headerName: "Phone number",
    },
    {
      field: "Role",
      type: "string",
      headerName: "Role",
    },
    {
      field: "Password",
      type: "text",
      headerName: "Password",
    },
    {
      field: "Status",
      type: "text",
      headerName: "Account Status",
    },
  ];
  const columnsToDelete = [
    {
      field: "Full name",
      type: "text",
      headerName: "Full name",
    },
    {
      field: "Email",
      type: "email",
      headerName: "Email",
    },

    {
      field: "PhoneNumber",
      type: "text",
      headerName: "Phone number",
    },
    {
      field: "Role",
      type: "string",
      headerName: "Role",
    },
    {
      field: "Status",
      type: "text",
      headerName: "Account Status",
    },
    {
      field: "createdAt",
      headerName: "createdAt",
      type: "string",
    },
    {
      field: "modifiedAt",
      headerName: "modifiedAt",
      type: "string",
    },
  ];
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Users" breadcrumbItem="Manage users" />
          <Button
            color="success"
            className="add-btn"
            style={{ margin: "1rem" }}
            onClick={() => setOpen(true)}
            id="create-btn"
          >
            <i className="ri-add-line align-bottom me-1"></i> Add
          </Button>
          <DataTable
            slug="users"
            columns={columnsToShow}
            setModifopen={setModifopen}
            setDelopen={setDelopen}
            setUser={setUser}
            rows={users}
            getRowId={(row) => row._id}
          />
          {open && (
            <Add
              slug="user"
              columns={columnsToAddOrModify}
              setOpen={setOpen}
              setArray={setArray}
              array={array}
              postData={postData}
            />
          )}
          {modifopen && (
            <Modify
              slug="user"
              columns={columnsToAddOrModify}
              row={user}
              setModifopen={setModifopen}
              setArray={setArray}
              array={array}
              putData={putData}
            />
          )}
          {delopen && (
            <Delete
              slug="user"
              columns={columnsToDelete}
              row={user}
              deleteData={deleteData}
              setDelopen={setDelopen}
            />
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UsersList;
