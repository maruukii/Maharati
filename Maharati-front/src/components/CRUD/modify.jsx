import React, { useState, useEffect } from "react";
import "./add.scss";

const Modify = (props) => {
  const [formData, setFormData] = useState({});
  const [modify, setModify] = useState(false);
  const [cols, setcols] = useState(props.columns);

  const handleChange = (e, field, type) => {
    let value = e.target.value;
    if (type === "number" && Number(value) <= 0.0) {
      value = undefined;
    }
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Function to clear input field
  const clearField = (field) => {
    setFormData({
      ...formData,
      [field]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedArray = props.array; // Create a copy of the array
    const data = new FormData(e.target);
    cols
      .filter(
        (item) =>
          item.field !== "createdAt" &&
          item.field !== "modifiedAt" &&
          item.field !== "Password"
      )
      .map((column) => (updatedArray[column.field] = data.get(column.field)));
    props.setArray(updatedArray);

    props.putData();
    props.setModifopen(false);
  };
  const handleModify = (e) => {
    setModify(true);
    setFormData(props.row);
  };
  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setModifopen(false)}>
          <i className="fa-solid fa-x"></i>
        </span>
        <h1>Modify {props.slug}</h1>{" "}
        <button
          className="btn btn-success"
          style={{
            marginBottom: "1rem",
            position: "absolute",
            right: "5rem",
            top: "3.2rem",
          }}
          onClick={handleModify}
        >
          <i className="fa-solid fa-pen-nib"></i>
        </button>
        <form onSubmit={handleSubmit}>
          {cols
            .filter(
              (item) =>
                item.field !== "createdAt" &&
                item.field !== "modifiedAt" &&
                item.field !== "Password"
            )
            .map((column) => (
              <div className="item" key={column.field}>
                <label>{column.headerName}</label>
                {column.field === "Status" ? (
                  <select
                    name={column.field}
                    defaultValue={props.row[column.field]}
                    disabled={!modify}
                    required={true}
                  >
                    <option value={true}>Active</option>
                    <option value={false}>Block</option>
                  </select>
                ) : column.field === "Role" ? (
                  <select
                    name={column.field}
                    defaultValue={props.row[column.field]}
                    disabled={!modify}
                    required={true}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Instructor">Instructor</option>
                    <option value="User">User</option>
                  </select>
                ) : column.field === "PhoneNumber" ? (
                  <div className="input-container">
                    <input
                      required={true}
                      name={column.field}
                      type="number"
                      placeholder={props.row[column.field]}
                      value={formData[column.field] || ""}
                      min={0}
                      pattern={"^[0-9]*(.[0-9]*[1-9])?[0-9]*$"}
                      onChange={(e) =>
                        handleChange(e, column.field, column.type)
                      }
                    />
                    {formData[column.field] && (
                      <span
                        className="clear-button"
                        onClick={() => clearField(column.field)}
                      >
                        <i className="fa-solid fa-x"></i>
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="input-container">
                    <input
                      required={true}
                      name={column.field}
                      type={column.type}
                      placeholder={props.row[column.field]}
                      value={formData[column.field] || ""}
                      onChange={(e) =>
                        handleChange(e, column.field, column.type)
                      }
                      min={column.type === "number" ? -Infinity : undefined}
                      pattern={
                        column.type === "number"
                          ? "^[0-9]*(.[0-9]*[1-9])?[0-9]*$"
                          : undefined
                      }
                      disabled={!modify}
                    />
                    {formData[column.field] && (
                      <span
                        className="clear-button"
                        onClick={() => clearField(column.field)}
                      >
                        <i className="fa-solid fa-x"></i>
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          <button>Modify</button>
        </form>
      </div>
    </div>
  );
};

export default Modify;
