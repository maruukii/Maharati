import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faFile } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import Contenu from "./Contenu";
import { useParams } from "react-router-dom";
import CreateQuiz from "./CreatQuiz";
import { useSnackbar } from "notistack";

function AddLesson() {
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { auth } = useAuth();
  const { id } = useParams();
  const [contentData, setContentData] = useState([]); // To collect dynamic content from Contenu
  const { enqueueSnackbar } = useSnackbar();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) TransformFileData(file);
  };

  const TransformFileData = (file) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prevState) => ({
        ...prevState,
        ChapterPhoto: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleChapterVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          ChapterVideo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAcceptedFiles = (acceptedFiles) => {
    setSelectedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    setFiles((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.map((file) => file.name),
    ]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleContentChange = (content) => {
    setContentData(content); // Update the content data from Contenu
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "Files") {
        selectedFiles.forEach((file) => formDataToSend.append("files", file));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Ensure ChapterContent is sent as a JSON string of the inputs array
    contentData.forEach((content, index) => {
      formDataToSend.append(`ChapterContent`, JSON.stringify(content)); // Append dynamic content
    });
    console.log(contentData);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_HOST}/courses/${id}/chapters`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      );
      console.log(formDataToSend);
      enqueueSnackbar("Chapter Created");
    } catch (error) {
      console.error("Error adding chapter:", error);
    }
  };

  return (
    <div className="mdk-drawer-layout__content container-Dash m-5">
      <div className="d-flex flex-column flex-sm-row flex-wrap mb-3 align-items-start align-items-sm-center">
        <h1 className="h2 flex mb-2 mb-sm-0 mt-5">Add Lesson</h1>
        <button className="btn btn-success ms-auto mt-5" onClick={handleSubmit}>
          Save
        </button>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <label htmlFor="ChapterTitle" className="col-md-2 mt-3">
              Preview
            </label>
            <div className="col-md-6 mt-3">
              <input
                id="ChapterPhoto"
                name="ChapterPhoto"
                type="file"
                className="form-control"
                placeholder="Choose a File"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="row">
            <label htmlFor="ChapterTitle" className="col-md-2 mt-3">
              Title
            </label>
            <div className="col-md-6 mt-3">
              <input
                id="ChapterTitle"
                name="ChapterTitle"
                type="text"
                className="form-control"
                placeholder="Write an awesome title"
                value={formData.ChapterTitle || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="cards mt-4">
        <div className="card-header">
          <h4 className="card-title">Content</h4>
        </div>
        <Contenu id={id} onContentChange={handleContentChange} />
      </div>

      <div className="cards mt-4">
        <div className="card-header">
          <h4 className="card-title">Files</h4>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="dropzone">
                <Dropzone onDrop={handleAcceptedFiles}>
                  {({ getRootProps, getInputProps }) => (
                    <div style={{ textAlign: "center" }}>
                      <div
                        className="dz-message needsclick"
                        {...getRootProps()}
                      >
                        <input {...getInputProps()} />
                        <div className="mb-3">
                          <i className="display-4 text-muted mdi mdi-cloud-upload-outline"></i>
                        </div>
                        <h4>Drop files here to upload</h4>
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>
            </div>
            <div className="col-md-6">
              <div data-toggle="tree">
                <ul style={{ display: "block" }}>
                  <li className="folder">
                    <FontAwesomeIcon icon={faFolder} className="icon" />
                    Lesson files
                    <ul>
                      {files.map((file, index) => (
                        <li key={index}>
                          <FontAwesomeIcon icon={faFile} className="icon" />
                          {file}
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddLesson;
