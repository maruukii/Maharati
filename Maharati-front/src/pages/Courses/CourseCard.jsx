import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  console.log(course);
  return (
    <div className="">
      <div className="course-style1 has-border">
        <div className="course-img">
          <Link to="/CourseDetails">
            <img
              className="w-100 "
              style={{
                width: "300px",
                height: "200px",
                objectFit: "cover",
              }}
              src={course.CourseImage.ImageLink}
              alt="Course Img"
            />
          </Link>
          {/* <div className="course-category">
            <a href="course.html">{course.category}</a>
          </div> */}
          <a
            href={`course/${course._id}`}
            className="vs-btn style4 popup-video"
          >
            <i className="fas fa-play"></i>Preview Course
          </a>
        </div>
        <div className="course-content">
          <div className="course-top">
            <div className="course-review">
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
              (0.0)
            </div>
            <span className="course-price">{course.CoursePrice} dt</span>
          </div>
          <h3 className="course-name">
            <Link to="/CourseDetails">
              <a className="text-inherit">{course.CourseName}</a>
            </Link>
          </h3>
          <div className="course-teacher">
            <a className="text-inherit" href="team-details.html">
              By {course.createdBy.FirstName + " " + course.createdBy.LastName}
            </a>
          </div>
        </div>
        <div className="course-meta">
          <span>
            <i className="fa fa-users"></i>
            {course?.students || 0}
          </span>
          <span>
            <i className="fa fa-clock"></i>
            {course?.CourseDuration || "undefined duration"}
          </span>
          <span>
            <i className="fa fa-calendar-alt"></i>
            {course?.CourseStart}
          </span>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered modal-extra-large">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Course Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4 div1">
                    <div className="mb-3">
                      <img
                        className="img-fluid"
                        src={course.imgSrc}
                        alt="Preview"
                      />
                      <div className="course-meta-box">
                        <table>
                          <tbody>
                            <tr>
                              <th>
                                <i>
                                  <FontAwesomeIcon icon={faHourglass} />
                                </i>
                                Duration:
                              </th>
                              <td>{course.duration}</td>
                            </tr>
                            <tr>
                              <th>
                                <i className="far fa-clock"></i> Weekly Study:
                              </th>
                              <td>{course.weeklyStudy}</td>
                            </tr>
                            <tr>
                              <th>
                                <i>
                                  <FontAwesomeIcon icon={faUserAlt} />
                                </i>
                                Student:
                              </th>
                              <td>{course.students}</td>
                            </tr>
                            <tr>
                              <th>
                                <i>
                                  <FontAwesomeIcon icon={faSuitcase} />
                                </i>
                                Course Type:
                              </th>
                              <td>100% online</td>
                            </tr>
                          </tbody>
                        </table>
                        <a href="contact.html" className="vs-btn">
                          Join Course
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8 div2">
                    <div className="course-info">
                      <h2>{course.title}</h2>
                      <div className="d-flex align-items-centre gap-5 mb-4 mt-3">
                        <h6 className="course-price fw-bold fs-4">
                          {course.price}
                        </h6>
                        <span className="d-flex align-items-center gap-2">
                          <span>
                            <i className="ri-star-s-fill"></i>
                            <i className="ri-star-s-fill"></i>
                            <i className="ri-star-s-fill"></i>
                            <i className="ri-star-s-fill"></i>
                            <i className="ri-star-s-fill"></i>
                          </span>
                        </span>
                      </div>
                      <p className="description">{course.description}</p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur.
                      </p>
                      <div className="list-style1 vs-list">
                        <ul>
                          <li>Steady stream of new students</li>
                          <li>Smart calendar</li>
                          <li>Interactive classroom</li>
                          <li>Convenient payment methods</li>
                          <li>Professional development webinars</li>
                        </ul>
                      </div>
                      <div className="accordion-body">
                        <div className="syllabus-list">
                          <div className="syllabus-img">
                            <img
                              src="assets/img/course/course-syllabus-1.jpg"
                              alt=""
                            />
                          </div>
                          <div className="syllabus-content">
                            <h6 className="syllabustitle">Introduction</h6>
                            <p className="syllabustext">
                              Reprehenderit in voluptate velit esse cillum
                              dolore eu fugiat nulla pariatur. Excepteur sint
                              occaecat cupidatat non proident.
                            </p>
                          </div>
                        </div>
                        <div className="syllabus-list">
                          <div className="syllabus-img">
                            <img
                              src="assets/img/course/course-syllabus-2.jpg"
                              alt=""
                            />
                          </div>
                          <div className="syllabus-content">
                            <h6 className="syllabustitle">
                              What do you understand by Extensive Reading?
                            </h6>
                            <p className="syllabustext">
                              Reprehenderit in voluptate velit esse cillum
                              dolore eu fugiat nulla pariatur. Excepteur sint
                              occaecat cupidatat non proident.
                            </p>
                          </div>
                        </div>
                        <div className="syllabus-list">
                          <div className="syllabus-content">
                            <h6 className="syllabustitle">
                              Why Extensive Reading?
                            </h6>
                            <p className="syllabustext">
                              Reprehenderit in voluptate velit esse cillum
                              dolore eu fugiat nulla pariatur. Excepteur sint
                              occaecat cupidatat non illum dolore eu fugiat
                              proident.
                            </p>
                          </div>
                        </div>
                        <div className="syllabus-list">
                          <div className="syllabus-content">
                            <h6 className="syllabustitle">
                              Incorporating Extensive Reading
                            </h6>
                            <p className="syllabustext">
                              Lit esse cillum dolore eu fugiat nulla pariatur.
                              Excepteur sint occaecat cupidatat non illum dolore
                              eu fugiat proident.
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleClose}
                      >
                        Join
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
