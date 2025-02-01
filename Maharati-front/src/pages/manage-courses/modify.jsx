import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../components/CRUD/add.scss";

const Modify = ({ slug, columns, row, setModifopen, setArray, array, putData }) => {
  const [formData, setFormData] = useState(row);
  const [modify, setModify] = useState(false);

  const handleChange = (e, field) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedArray = { ...array };
    columns.forEach((column) => {
      if (column.field !== "createdAt" && column.field !== "modifiedAt" && column.field !== "Password") {
        updatedArray[column.field] = formData[column.field];
      }
    });
    setArray(updatedArray);
    putData();
    setModifopen(false);
  };

  const clearField = (field) => {
    setFormData({
      ...formData,
      [field]: "",
    });
  };
  const handleModify = (e) => {
    setModify(true);
    setFormData();
  };
  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => setModifopen(false)}>
          <i className="fa-solid fa-x"></i>
        </span>
        <h1>Modify {slug}</h1>
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
          {columns.map((column) => (
            <div key={column.field} className="item">
              <label>{column.headerName}</label>
              <div className="input-container">
                <input
                  required
                  name={column.field}
                  type={column.type || "text"}
                  placeholder={formData[column.field]}
                  value={formData[column.field] || ""}
                  onChange={(e) => handleChange(e, column.field)}
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
            </div>
          ))}
          <button type="submit">Modify</button>
        </form>
      </div>
    </div>
  );
};

Modify.propTypes = {
  slug: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  row: PropTypes.object.isRequired,
  setModifopen: PropTypes.func.isRequired,
  setArray: PropTypes.func.isRequired,
  array: PropTypes.object.isRequired,
  putData: PropTypes.func.isRequired,
};

export default Modify;
  //   const [content, setContent] = useState("");
  //   const [files, setFiles] = useState([]);

  //   const onEditorChange = (value) => {
  //     setContent(value);
  //     console.log(content);
  //   };

  //   const onFilesChange = (files) => {
  //     setFiles(files);
  //     console.log(files)
  //   };
  //   const onSubmit = async (event) => {
  //     event.preventDefault();

  //     setContent("");

  //     // axios
  //     //   .post(import.meta.env.VITE_HOST + "/blog/createPost", content)
  //     //   .then((response) => {
  //     //     if (response) {
  //     //       message.success("Post Created!");

  //     //       setTimeout(() => {
  //     //         props.history.push("/blog");
  //     //       }, 2000);
  //     //     }
  //     //   });
  //     try {
  //       const variables = {
  //         content: content,
  //         //userID: auth.user._id,
  //       };

  //       const response = await axios.post(
  //         import.meta.env.VITE_HOST + "/blog/createPost",
  //         variables,
  //         {
  //           // headers: {
  //           //   "Content-Type": "multipart/form-data",
  //           // },
  //         }
  //       );
  //       console.log("Course created:", response.data);
  //     } catch (error) {
  //       console.error("Error creating course:", error);
  //     }
  //   };
  //   {/* <QuillEditor
  //           placeholder={"Start Posting something"}
  //           onEditorChange={onEditorChange}
  //           onFilesChange={onFilesChange}
  //         />
  //         <form onSubmit={onSubmit}>
  //           <div style={{ textAlign: "center", margin: "2rem" }}>
  //             <button
  //               size="large"
  //               htmlType="submit"
  //               className=""
  //               onSubmit={onSubmit}
  //             >
  //               Submit
  //             </button>
  //           </div>
  //         </form> */}