import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth.js";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useLocation } from "react-router-dom";

import Quiz from "./Quiz.jsx";
import CreateQuiz from "./CreatQuiz.jsx";
import { Form, Link, useParams } from "react-router-dom";
import { FieldArray } from "formik";
import "./CoursesDash.scss";

import { useSnackbar } from "notistack";
import DeleteModal from "../../components/UI/DeleteModal.jsx";

const ManageCourse = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [chapterId, setChapterId] = useState(null);
  const [fileName, setFileName] = useState("");
  const { auth } = useAuth();
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    CourseLevel: "Beginner",
    CourseImage: { ImageName: null, ImageLink: null },
  });
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [formDat, setFormDat] = useState({});

  const [error, setError] = useState("");
  useEffect(() => {
    if (id) {
      const fetchCourseData = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_HOST}/courses/${id}`,
            {
              headers: {
                Authorization: `Bearer ${auth.accessToken}`,
              },
            }
          );

          const respons = await axios.get(
            `${import.meta.env.VITE_HOST}/testfinals/all`,
            {
              headers: {
                Authorization: `Bearer ${auth.accessToken}`,
              },
            }
          );

          setFormDat(respons.data);
          setFormData(response.data);
        } catch (error) {
          console.error("Failed to fetch course data:", error);
          setError("Failed to fetch course data");
        }
      };

      fetchCourseData();
    } else {
      console.error("ID is undefined or null");
    }
  }, [id, chapterId]);
  const handleDeleteChapter = async () => {
    const response = await axios.delete(
      `${import.meta.env.VITE_HOST}/courses/delete/chapter/${id}/${chapterId}`,

      {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      }
    );
    enqueueSnackbar("Chapter Deleted");
    setChapterId(null);
    setDeleteModal(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newData = {
        ...formData,
        createdBy: auth.user._id,
      };
      const response = await axios.post(
        import.meta.env.VITE_HOST + "/courses/new",
        newData,
        {
          headers: {
            //   "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      );
      {
        enqueueSnackbar(`Course ${formData.CourseName} Added !`);
      }
      const currentPath = location.pathname;
      navigate(`${currentPath}/${response?.data?.course?._id}`);
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };
  const handleUpdate = async () => {
    try {
      const newData = {
        ...formData,
        doneBy: auth.user._id,
      };
      const response = await axios.put(
        `${import.meta.env.VITE_HOST}/courses/update/${id}`,
        newData,
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      );
      {
        enqueueSnackbar(`Course ${formData.CourseName} Modified !`);
      }
    } catch (error) {
      console.error("Failed to update course:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(e.target.files[0].name);
    TransformFileData(file, e.target.files[0].name);
  };
  const TransformFileData = (file, Name) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          CourseImage: reader.result,
          ImageName: Name,
        }));
        setFile(reader.result);
      };
    } else {
      setFormData((prevState) => ({
        ...prevState,
        CourseImage: null,
        ImageName: null,
      }));
      setFile(null);
    }
  };

  return (
    <div className="mdk-drawer-layout__content ajouter">
      <DeleteModal
        show={deleteModal}
        onDeleteClick={() => handleDeleteChapter()}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="container-Dash m-5">
        <div className="d-flex flex-column flex-sm-row flex-wrap mb-3 align-items-start align-items-sm-center">
          <div className="flex mb-2 mb-sm-0 mt-5">
            <h1 className="h2">Manage Course</h1>
          </div>
          {id == undefined ? (
            <a className="btn btn-success ms-auto mt-5" onClick={handleSubmit}>
              Add
            </a>
          ) : (
            <a className="btn btn-success ms-auto mt-5" onClick={handleUpdate}>
              Save
            </a>
          )}
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Basic Information</h4>
              </div>
              <div className="card-body">
                <div className="container">
                  <div className="row mb-4">
                    <div className="col">
                      <label className="form-label" htmlFor="courseTitle1">
                        Title
                      </label>
                      <input
                        type="text"
                        name="CourseName"
                        value={formData.CourseName || ""}
                        id="CourseName"
                        className="form-control"
                        placeholder="Write a title"
                        onChange={handleChange}
                        style={{
                          border: "1px solid #000",
                          borderRadius: "0.3rem",
                        }}
                      />
                    </div>
                    <div className="col">
                      <label className="form-label" htmlFor="CoursePrix">
                        Price
                      </label>
                      <input
                        type="number"
                        name="CoursePrice"
                        value={formData.CoursePrice || ""}
                        id="CoursePrice"
                        className="form-control"
                        placeholder="Price"
                        onChange={handleChange}
                        style={{
                          border: "1px solid #000",
                          borderRadius: "0.3rem",
                        }}
                      />
                    </div>
                  </div>

                  {/* Additional Block */}
                  <div className="row mb-4">
                    <div className="col">
                      <label className="form-label">Description</label>
                      <textarea
                        type="text"
                        rows={5}
                        name="CourseDescription"
                        value={formData.CourseDescription || ""}
                        id="CourseDescription"
                        className="form-control"
                        placeholder="Start From Here..."
                        onChange={handleChange}
                        style={{
                          border: "1px solid #000",
                          borderRadius: "0.3rem",
                        }}
                      />
                      {/* <div
                        style={{
                          height: "11rem",
                          border: "1px solid #717579",
                          borderRadius: "4px",
                        }}
                        className="mb-4"
                      >
                        <ReactQuill
                          onChange={handleDescriptionChange}
                          placeholder="Start From Here..."
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                          style={{ height: "50%" }}
                          name="CourseDescription"
                          value={formData.CourseDescription}
                        />
                      </div> */}
                    </div>
                    <div className="col">
                      <label className="form-label" htmlFor="coursePhoto2">
                        Photo
                      </label>
                      <div className="custom-file mt-1">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="coursePhoto2"
                          onChange={handleFileChange}
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="coursePhoto2"
                          style={{ border: "1px solid #333" }}
                        >
                          {fileName ||
                            formData?.CourseImage?.ImageName ||
                            "Choose image"}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <label className="form-label" htmlFor="courseTitle2">
                    Level
                  </label>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input-level"
                        type="radio"
                        name="CourseLevel"
                        id="levelBeginner"
                        value="Beginner"
                        checked={formData.CourseLevel === "Beginner"}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="levelBeginner"
                      >
                        Beginner
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input-level"
                        type="radio"
                        name="CourseLevel"
                        id="levelIntermediate"
                        value="Intermediate"
                        checked={formData.CourseLevel === "Intermediate"}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="levelIntermediate"
                      >
                        Intermediate
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input-level"
                        type="radio"
                        name="CourseLevel"
                        id="levelAdvanced"
                        value="Advanced"
                        checked={formData.CourseLevel === "Advanced"}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="levelAdvanced"
                      >
                        Advanced
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {id && (
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Content</h4>
                </div>
                <div className="card-body">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <p style={{ margin: 0 }}>
                      <Link
                        to={id ? `/manage-lesson/${id}` : ""}
                        className="btnd"
                      >
                        Lesson <i className="material-icons">add</i>
                      </Link>
                    </p>
                    <p style={{ margin: 0 }}>
                      <Link
                        to={{
                          pathname: id ? `/Test-Final/${id}` : "",
                          search: "true", // Adjust logic for state
                        }}
                        className="btnd"
                        style={{ backgroundColor: "#053c7a" }}
                      >
                        Test <i className="material-icons">add</i>
                      </Link>
                    </p>
                  </div>

                  <div className="nestable" id="nestable-handles-primary">
                    <ul className="nestable-list">
                      {Array.isArray(formDat) &&
                        formDat
                          .filter((course) => course.courseID === id)
                          .map((course, index) => {
                            const _id = course._id; // Correctly assign the _id
                            return (
                              <li
                                className="nestable-item nestable-item-handle"
                                data-id={index}
                                key={_id || index} // Use course._id as key if available
                              >
                                <div className="nestable-content">
                                  <div
                                    className="media align-items-center"
                                    style={{ backgroundColor: "red" }}
                                  >
                                    <div className="media-body">
                                      <h5 className="card-title h6 mb-0">
                                        <a>{course.courseName || "No title"}</a>
                                      </h5>
                                      <small className="text-muted">
                                        {course.updatedAt || "No date"}{" "}
                                      </small>
                                    </div>
                                    <div className="media-right">
                                      <Link
                                        to={{
                                          pathname:
                                            _id && id
                                              ? `/Test-Final/${_id}/${id}`
                                              : "/Test-Final",
                                          search: "false", // Adjust logic for state
                                        }}
                                        className="btn btn-white btn-sm"
                                      >
                                        <i className="material-icons">edit</i>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })}

                      {formData.Chapters &&
                        formData.Chapters.map((chapter, index) => (
                          <li
                            className="nestable-item nestable-item-handle"
                            data-id={index}
                            key={index}
                          >
                            {/* <div className="nestable-handle">
                        <i className="material-icons">menu</i>
                      </div> */}
                            <div className="nestable-content">
                              <div className="media align-items-center">
                                <div className="media-left">
                                  <img
                                    src={chapter.ChapterPhoto || ""}
                                    alt=""
                                    width="100"
                                    className="rounded"
                                  />
                                </div>
                                <div className="media-body">
                                  <h5 className="card-title h6 mb-0">
                                    <a href={`/manage-lesson/${id}`}>
                                      {chapter.ChapterTitle || "No title"}
                                    </a>
                                  </h5>
                                  <small className="text-muted">
                                    updated at {chapter.createdAt.split("T")[0]}{" "}
                                    {
                                      chapter.createdAt
                                        .split("T")[1]
                                        .split(".")[0]
                                    }
                                  </small>
                                </div>
                                <div className="media-right">
                                  <a
                                    href={`/manage-lesson/${id}`}
                                    className="btn btn-white btn-sm"
                                  >
                                    <i className="material-icons">edit</i>
                                  </a>
                                  <a
                                    onClick={() => {
                                      setDeleteModal(!deleteModal);
                                      setChapterId(chapter?._id);
                                    }}
                                    className="btn btn-white btn-sm"
                                    style={{ marginLeft: "1rem" }}
                                  >
                                    <i className="material-icons">delete</i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col-md-4">
            <div className="card">
              <div
                className="embed-responsive embed-responsive-16by9"
                style={{ display: "flex", justifyContent: "center" }}
              >
                {/* <iframe
                  className="embed-responsive-item"
                  src="https://player.vimeo.com/video/97243285?title=0&amp;byline=0&amp;portrait=0"
                  allowFullScreen
                ></iframe> */}
                <img
                  src={file || formData?.CourseImage?.ImageLink || ""}
                  alt=""
                  style={{ height: "150px", width: "200", margin: "1rem" }}
                />
              </div>
              <div className="card-body">
                <input
                  type="text"
                  className="form-control"
                  readOnly={true}
                  defaultValue={
                    fileName ||
                    formData?.CourseImage?.ImageName ||
                    "Course Image"
                  }
                />
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <p className="card-subtitle">Extra Options </p>
              </div>
              <form className="card-body" action="#">
                {/* <div>
                  <label className="form-label" htmlFor="category">
                    Category
                  </label>
                  <select id="category" className="custom-select form-control">
                    <option value="HTML">HTML</option>
                    <option value="Angular JS">Angular JS</option>
                    <option value="Vue.js">Vue.js</option>
                    <option value="CSS / LESS">CSS / LESS</option>
                    <option value="Design / Concept">Design / Concept</option>
                  </select>
                </div> */}

                <div style={{ marginTop: "1rem" }}>
                  <label className="form-label" htmlFor="CourseDuration">
                    Duration
                  </label>
                  <input
                    type="text"
                    id="CourseDuration"
                    className="form-control"
                    placeholder="e.g: 2h 11m"
                    required
                    name="CourseDuration"
                    value={formData.CourseDuration}
                    onChange={handleChange}
                  />
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <label className="form-label" htmlFor="start">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="start"
                    className="form-control"
                    name="CourseStart"
                    value={formData.CourseStart}
                    onChange={handleChange}
                  />
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <label className="form-label" htmlFor="end">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="end"
                    className="form-control"
                    name="CourseEnd"
                    value={formData.CourseEnd}
                    onChange={handleChange}
                  />
                </div>

                {/* <div style={{ marginTop: "1rem" }}>
                  <label className="form-label" htmlFor="option1">
                    Completion Badge
                  </label>
                  <div>
                    <div data-toggle="buttons">
                      <label className={`btn btn-primary btn-circle `}>
                        <input
                          type="radio"
                          className="d-none"
                          name="options"
                          id="option1"
                          value="option1"
                        />
                        <i className="material-icons">person</i>
                      </label>

                      <label className={`btn btn-danger btn-circle`}>
                        <input
                          type="radio"
                          className="d-none"
                          name="options"
                          id="option2"
                          value="option2"
                        />
                        <i className="material-icons">star</i>
                      </label>

                      <label className={`btn btn-success btn-circle`}>
                        <input
                          type="radio"
                          className="d-none"
                          name="options"
                          id="option3"
                          value="option3"
                        />
                        <i className="material-icons">shop</i>
                      </label>

                      <label className={`btn btn-warning btn-circle `}>
                        <input
                          type="radio"
                          className="d-none"
                          name="options"
                          id="option4"
                          value="option4"
                        />
                        <i className="material-icons">thumb_up</i>
                      </label>
                    </div>
                  </div>
                </div> */}
              </form>
            </div>
            {/* <CreateQuiz /> */}
            {/* <Quiz /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCourse;
