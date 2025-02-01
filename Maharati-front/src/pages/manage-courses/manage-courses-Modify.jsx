import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth.js";
import { Link, useParams } from "react-router-dom";
import vue from "../../assets/images/vuejs.png";
import node from "../../assets/images/nodejs.png";
import gulp from "../../assets/images/gulp.png";
import Quiz from "./Quiz.jsx";
import CreateQuiz from "./CreatQuiz.jsx";

const Modify = ({ onUpdate }) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [fileName, setFileName] = useState();
  const [loading, setLoading] = useState(true);

  const { auth } = useAuth();
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
          console.log(response.CourseName);
          setFormData(response.data);
        } catch (error) {
          console.error("Failed to fetch course data:", error);
          setError("Failed to fetch course data");
        } finally {
          setLoading(false);
        }
      };

      fetchCourseData();
    } else {
      console.error("ID is undefined or null");
    }
  }, [id]);
  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_HOST}/courses/update/${id}`,
        formData
      );
      console.log("Course updated successfully:", response);
      alert("Course updated successfully");
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Failed to update course:", error);
      alert("Failed to update course");
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

    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          CourseImage: reader.result,
          ImageName: fileName,
        }));
      };
    } else {
      setFormData((prevState) => ({
        ...prevState,
        CourseImage: null,
        ImageName: null,
      }));
    }
  };
  return (
    <div className="mdk-drawer-layout__content ajouter">
      {!loading && (
        <div className="container-Dash m-5">
          <div className="d-flex flex-column flex-sm-row flex-wrap mb-3 align-items-start align-items-sm-center">
            <div className="flex mb-2 mb-sm-0 mt-5">
              <h1 className="h2">Edit Course</h1>
            </div>
            <button
              className="btn btn-success ms-auto mt-5"
              onClick={handleSubmit}
            >
              SAVE
            </button>
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
                        <label className="form-label" htmlFor="CourseName">
                          Title
                        </label>
                        <input
                          type="text"
                          name="CourseName"
                          value={formData.CourseName}
                          id="CourseName"
                          className="form-control"
                          placeholder="Write a title"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col">
                        <label className="form-label" htmlFor="CoursePrix">
                          Price
                        </label>
                        <input
                          type="number"
                          name="CoursePrix"
                          value={formData.CoursePrice}
                          id="CoursePrix"
                          className="form-control"
                          placeholder="Enter price"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="col">
                        <label className="form-label">Description</label>
                        <input
                          type="text"
                          name="CourseDescription"
                          value={formData.CourseDescription}
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
                            {formData.CourseImage.ImageName || "Choose image"}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col">
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
                    <div className="col">
                      <img src={formData.CourseImg} />
                    </div>
                  </div>
                </div>
              </div>
              <CreateQuiz />
              {/* <Quiz/> */}
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Lessons</h4>
                </div>
                <div className="card-body">
                  <p>
                    <Link to="/manage-Lesson-Add" className="btnd">
                      Add Lesson <i className="material-icons">add</i>
                    </Link>
                  </p>
                  <div className="nestable" id="nestable-handles-primary">
                    <ul className="nestable-list">
                      <li
                        className="nestable-item nestable-item-handle"
                        data-id="2"
                      >
                        <div className="nestable-handle">
                          <i className="material-icons">menu</i>
                        </div>
                        <div className="nestable-content">
                          <div className="media align-items-center">
                            <div className="media-left">
                              <img
                                src={vue}
                                alt=""
                                width="100"
                                className="rounded"
                              />
                            </div>
                            <div className="media-body">
                              <h5 className="card-title h6 mb-0">
                                <a href="instructor-lesson-add.html">
                                  Awesome Vue.js with SASS Processing
                                </a>
                              </h5>
                              <small className="text-muted">
                                updated 1 month ago
                              </small>
                            </div>
                            <div className="media-right">
                              <a
                                href="instructor-lesson-add.html"
                                className="btn btn-white btn-sm"
                              >
                                <i className="material-icons">edit</i>
                              </a>
                              <a
                                href="instructor-lesson-add.html"
                                className="btn btn-white btn-sm"
                              >
                                <i className="material-icons">edit</i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li
                        className="nestable-item nestable-item-handle"
                        data-id="1"
                      >
                        <div className="nestable-handle">
                          <i className="material-icons">menu</i>
                        </div>
                        <div className="nestable-content">
                          <div className="media align-items-center">
                            <div className="media-left">
                              <img
                                src={node}
                                alt=""
                                width="100"
                                className="rounded"
                              />
                            </div>
                            <div className="media-body">
                              <h4 className="card-title h6 mb-0">
                                <a href="instructor-lesson-add.html">
                                  Github Webhooks for Beginners
                                </a>
                              </h4>
                              <small className="text-muted">
                                updated 1 month ago
                              </small>
                            </div>
                            <div className="media-right">
                              <a
                                href="instructor-lesson-add.html"
                                className="btn btn-white btn-sm"
                              >
                                <i className="material-icons">edit</i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li
                        className="nestable-item nestable-item-handle"
                        data-id="2"
                      >
                        <div className="nestable-handle">
                          <i className="material-icons">menu</i>
                        </div>
                        <div className="nestable-content">
                          <div className="media align-items-center">
                            <div className="media-left">
                              <img
                                src={gulp}
                                alt=""
                                width="100"
                                className="rounded"
                              />
                            </div>
                            <div className="media-body">
                              <h4 className="card-title h6 mb-0">
                                <a href="instructor-lesson-add.html">
                                  Browserify: Writing Modular JavaScript
                                </a>
                              </h4>
                              <small className="text-muted">
                                updated 1 month ago
                              </small>
                            </div>
                            <div className="media-right">
                              <a
                                href="instructor-lesson-add.html"
                                className="btn btn-white btn-sm"
                              >
                                <i className="material-icons">edit</i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe
                    className="embed-responsive-item"
                    src="https://player.vimeo.com/video/97243285?title=0&amp;byline=0&amp;portrait=0"
                    allowFullScreen
                  ></iframe>{" "}
                  <img
                    src={formData.CourseImage.ImageLink}
                    alt=""
                    style={{ height: "150px", width: "200", margin: "1rem" }}
                  />
                </div>
                <div className="card-body">
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={formData.CourseImage.ImageName}
                  />
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Meta</h4>
                  <p className="card-subtitle">Extra Options </p>
                </div>
                <form className="card-body" action="#">
                  <div>
                    <label className="form-label" htmlFor="category">
                      Category
                    </label>
                    <select
                      id="category"
                      className="custom-select form-control"
                    >
                      <option value="HTML">HTML</option>
                      <option value="Angular JS">Angular JS</option>
                      <option value="Vue.js">Vue.js</option>
                      <option value="CSS / LESS">CSS / LESS</option>
                      <option value="Design / Concept">Design / Concept</option>
                    </select>
                  </div>

                  <div style={{ marginTop: "1rem" }}>
                    <label className="form-label" htmlFor="duration">
                      Duration
                    </label>
                    <input
                      type="text"
                      id="duration"
                      className="form-control"
                      placeholder="10"
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

                  <div style={{ marginTop: "1rem" }}>
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
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modify;
