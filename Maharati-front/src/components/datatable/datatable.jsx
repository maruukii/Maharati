import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import "./dataTable.scss";

const DataTable = (props) => {
  const handleDelete = (row) => {
    props.setDelopen(true);
    props.setUser(row);
  };
  const handleModify = (row) => {
    props.setModifopen(true);
    props.setUser(row);
  };
  const statusColumn = {
    field: "Status",
    headerName: "Account Status",
    width: 150,
    renderCell: (params) => {
      return (
        <span
          className={`badge ${
            params.value === true ? "badge-soft-success" : "badge-soft-danger"
          } text-uppercase`}
          style={{ margin: "1rem" }}
        >
          {params.value === true ? "Active" : "Block"}
        </span>
      );
    },
  };
  const actionColumn = {
    field: "action",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="d-flex gap-2">
          <div className="edit">
            <button
              className="btn btn-sm btn-success edit-item-btn"
              onClick={() => handleModify(params.row)}
            >
              Edit
            </button>
          </div>
          <div className="remove">
            <button
              className="btn btn-sm btn-danger remove-item-btn"
              onClick={() => handleDelete(params.row)}
            >
              Remove
            </button>
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, statusColumn, actionColumn]}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 7,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[7]}
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
        style={{ height: "65vh", zIndex: "3" }}
      />
    </div>
  );
};

export default DataTable;
