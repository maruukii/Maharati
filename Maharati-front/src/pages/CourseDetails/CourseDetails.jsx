import React from "react";
import { Link } from "react-router-dom";
import breadcumbBg from "../../assets/img/breadcumb/ab.jpg"; // Update the path as needed
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHourglass,
  faClock,
  faUserAlt,
  faSuitcase,
} from "@fortawesome/free-solid-svg-icons";
import c1 from "../../assets/img/course/course-1-2.png";

const CourseDetails = () => {
  return (
    <div>
      <div
        className="breadcumb-wrapper"
        style={{
          backgroundImage: `url(${breadcumbBg})`,
          backgroundSize: " 100% 160%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container z-index-common">
          <div className="breadcumb-content">
            <h1 className="breadcumb-title">Course Details</h1>
            <p className="breadcumb-text">
              Search over 200 individual encyclopedias and reference books.
            </p>
            <div className="breadcumb-menu-wrap">
              <ul className="breadcumb-menu">
                <li>
                  <Link to="/Accueil">
                    <a>Home</a>
                  </Link>
                </li>
                <li>Course Details</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <section className="course-details space-top space-extra-bottom">
        <div className="container">
          <div className="mega-hover course-img">
            <img
              src={c1}
              alt="girl"
              style={{ width: "100%", height: "20rem" }}
            />
          </div>
          <div className="row flex-row-reverse">
            <div className="col-lg-4">
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
                      <td>4 Week</td>
                    </tr>
                    <tr>
                      <th>
                        <i className="far fa-clock"></i> Weekly Study:
                      </th>
                      <td>11 Hours</td>
                    </tr>
                    <tr>
                      <th>
                        <i>
                          <FontAwesomeIcon icon={faUserAlt} />
                        </i>
                        Student:
                      </th>
                      <td>204 Students</td>
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
            <div className="col-lg-8">
              <div className="course-category">
                <a href="course.html">Advance learning</a>
              </div>
              <h2 className="course-title">
                Naturally & Safely Boost Testosterone
              </h2>
              <div className="course-review">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>( 5.0 )
              </div>
              <h5 className="border-title2">Overview</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
                nisi ut aliquip ex ea commodo consequat. Magna aliqua. Ut enim
                ad minim veniam.
              </p>
              <h5>Reading on English language learners</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <h5>Benefit your learners’ entire reading journey</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
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
              <div className="inner-video-box">
                <img
                  src="assets/img/course/course-details-2.jpg"
                  alt="blog video"
                />
                <a
                  href="https://www.youtube.com/watch?v=_sI_Ps7JSEk"
                  className="play-btn position-center popup-video"
                >
                  <i className="fas fa-play"></i>
                </a>
              </div>
              <h5 className="border-title2">Syllabus</h5>
              <div className="accordion accordion-style4" id="faqVersion2">
                <div className="accordion-item active">
                  <div className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <span className="button-label">Week 1</span>
                      Getting started with Extensive Reading
                    </button>
                  </div>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#faqVersion2"
                  >
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
                            Reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident.
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
                            Reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident.
                          </p>
                        </div>
                      </div>
                      <div className="syllabus-list">
                        <div className="syllabus-content">
                          <h6 className="syllabustitle">
                            Why Extensive Reading?
                          </h6>
                          <p className="syllabustext">
                            Reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non illum dolore eu fugiat proident.
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
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      <span className="button-label">Week 2</span>
                      Practical pre-reading activities with graded readers
                    </button>
                  </div>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#faqVersion2"
                  >
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
                            Reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident.
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
                            Reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident.
                          </p>
                        </div>
                      </div>
                      <div className="syllabus-list">
                        <div className="syllabus-content">
                          <h6 className="syllabustitle">
                            Why Extensive Reading?
                          </h6>
                          <p className="syllabustext">
                            Reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non illum dolore eu fugiat proident.
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetails;
