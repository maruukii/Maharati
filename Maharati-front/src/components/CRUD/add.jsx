import React, { useState, useEffect } from "react";
import "./add.scss";

import axios from "axios";
import { array } from "prop-types";

const Add = (props) => {
  const [formData, setFormData] = useState({});
  const [cols, setcols] = useState(props.columns);
  const [emailUsed, setEmailUsed] = useState(false);
  const [phoneUsed, setPhoneUsed] = useState(false);
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

  const clearField = (field) => {
    setFormData({
      ...formData,
      [field]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailUsed(false);
    setPhoneUsed(false);
    let updatedArray = null;
    if (props.array) {
      updatedArray = props.array;
    }
    const data = new FormData(e.target);
    cols
      .filter(
        (item) => item.field !== "createdAt" && item.field !== "modifiedAt"
      )
      .map((column) => (updatedArray[column.field] = data.get(column.field)));
    const emailUsed = await axios.get(
      import.meta.env.VITE_HOST + `/users/email/${updatedArray.Email.trim()}`
    );
    if (emailUsed.data) {
      setEmailUsed(true);
      throw new Error("Email Used");
    }
    setEmailUsed(false);
    const phoneUsed = await axios.get(
      import.meta.env.VITE_HOST + `/users/phone/${updatedArray.PhoneNumber}`
    );
    if (phoneUsed.data) {
      setPhoneUsed(true);
      throw new Error("Phone Used");
    }
    setPhoneUsed(false);
    if (props.setArray) props.setArray(updatedArray);
    if (props.postData) props.postData();
    props.setOpen(false);
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          <i className="fa-solid fa-x"></i>
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {cols
            .filter(
              (item) =>
                item.field !== "createdAt" && item.field !== "modifiedAt"
            )
            .map((column) => (
              <div className="item" key={column.field}>
                <label>{column.headerName}</label>
                {column.field === "Status" ? (
                  <select name={column.field} required={true}>
                    <option value={true}>Active</option>
                    <option value={false}>Blocked</option>
                  </select>
                ) : column.field === "group" ? (
                  <select name={column.field} required={true}>
                    <option value="both">Both</option>
                    <option value="groups">2 Groups</option>
                  </select>
                ) : column.field === "Role" ? (
                  <select name={column.field} required={true}>
                    <option value="Admin">Admin</option>
                    <option value="Instructor">Instructor</option>
                    <option value="User">User</option>
                  </select>
                ) : column.field === "PhoneNumber" ? (
                  <>
                    <div className="input-container">
                      <input
                        required={true}
                        name={column.field}
                        type="number"
                        placeholder={column.headerName}
                        value={formData[column.field] || ""}
                        min={0}
                        pattern={"^[0-9]*(.[0-9]*[1-9])?[0-9]*$"}
                        onChange={(e) =>
                          handleChange(e, column.field, "number")
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
                    {phoneUsed && (
                      <div className="acceptance">
                        <ul>
                          <li
                            style={{
                              color: "red",
                            }}
                          >
                            This Phone number is used
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                ) : column.field === "Email" ? (
                  <>
                    <div className="input-container">
                      <input
                        required={true}
                        name={column.field}
                        type="Email"
                        placeholder={column.headerName}
                        value={formData[column.field] || ""}
                        min={0}
                        onChange={(e) => handleChange(e, column.field, "email")}
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
                    {emailUsed && (
                      <div className="acceptance">
                        <ul>
                          <li
                            style={{
                              color: "red",
                            }}
                          >
                            This Email is used
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="input-container">
                    <input
                      required={true}
                      name={column.field}
                      type={column.type}
                      placeholder={column.headerName}
                      value={formData[column.field] || ""}
                      min={column.type === "number" ? -Infinity : undefined}
                      pattern={
                        column.type === "number"
                          ? "^[0-9]*(.[0-9]*[1-9])?[0-9]*$"
                          : undefined
                      }
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
                )}
              </div>
            ))}
          <button>Add</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
