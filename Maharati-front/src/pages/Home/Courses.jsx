import React from "react";
import { Link } from "react-router-dom"; // Assuming you are using react-router for navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserTie,
  faTv,
  faClock,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import courseImg1 from "../../assets/img/course/course-1-1.png";
import courseImg2 from "../../assets/img/course/course-1-2.png";
import courseImg3 from "../../assets/img/course/course-1-3.png";
import courseImg4 from "../../assets/img/course/course-1-4.png";
import courseImg5 from "../../assets/img/course/course-1-5.png";

const CourseCard = ({
  image,
  price,
  title,
  students,
  lessons,
  duration,
  teacherImage,
  teacherName,
}) => (
  <div className="col-sm-6 col-xl-4">
    <div className="course-style2">
      <div className="course-img">
        <Link to="/course-details.html">
          <img
            className="w-100"
            src={image}
            alt="Course Img"
            style={{
              width: "300px",
              height: "200px",
              objectFit: "cover",
            }}
          />
        </Link>
        <span className="course-price">{price} dt</span>
      </div>
      <div className="course-content">
        <h3 className="course-name">
          <Link to="/course-details.html" className="text-inherit">
            {title}
          </Link>
        </h3>
        <div className="course-meta">
          <span>
            <i>
              <FontAwesomeIcon icon={faUserTie} />
            </i>
            {students} Students
          </span>
          <Link to="/course-details.html">
            <i>
              <FontAwesomeIcon icon={faTv} />
            </i>
            {lessons} Lessons
          </Link>
          <span>
            <i>
              <FontAwesomeIcon icon={faClock} />
            </i>
            {duration}
          </span>
        </div>
        <div className="course-footer">
          <div className="course-teacher">
            <Link to="/team-details.html" className="text-inherit">
              <img src={teacherImage} alt="Teacher" /> By {teacherName}
            </Link>
          </div>
          <div className="course-review">
            {[...Array(5)].map((_, i) => (
              <i key={i}>
                <FontAwesomeIcon icon={faStar} />
              </i>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Courses = () => {
  return (
    <section className="space-bottom">
      <div className="container">
        <div
          className="title-area text-center wow fadeInUp"
          data-wow-delay="0.3s"
        >
          <div className="sec-icon">
            <div className="vs-circle"></div>
          </div>
          <span className="sec-subtitle">WELCOME TO GLOBAL EDUCATION</span>
          <h2 className="sec-title">Explore Courses</h2>
        </div>
        <div
          className="row vs-carousel"
          data-slide-show="3"
          data-lg-slide-show="3"
          data-md-slide-show="2"
        >
          <CourseCard
            image={courseImg1}
            price="78"
            title="Advance Beginner's Goal & Managing Course"
            students="775"
            lessons="45"
            duration="78h 15m"
            teacherImage={courseImg1}
            teacherName="Rose Marry"
          />
          <CourseCard
            image={courseImg2}
            price="93"
            title="Advance Technology & Architecture Course"
            students="779"
            lessons="79"
            duration="6h 36m"
            teacherImage={courseImg2}
            teacherName="Jerzzy Lamot"
          />
          <CourseCard
            image={courseImg3}
            price="45"
            title="Basic Chemistry Programs arranged on Lab"
            students="75"
            lessons="78"
            duration="17h 11m"
            teacherImage={courseImg3}
            teacherName="Rodja Hartmann"
          />
        </div>
        <div
          className="row vs-carousel"
          data-slide-show="2"
          data-lg-slide-show="3"
          data-md-slide-show="2"
        >
          <div className="col-md-6">
            <div className="course-style2 layout2" style={{ height: "15rem" }}>
              <div className="course-img">
                <Link to="/course-details.html">
                  <img
                    src={courseImg4}
                    alt="Course Img"
                    style={{ height: "15rem", width: "15rem" }}
                  />
                </Link>
                <span className="course-price">56 dt</span>
              </div>
              <div className="course-content">
                <h3 className="course-name">
                  <Link to="/course-details.html" className="text-inherit">
                    Graduation For Engineering & Architect
                  </Link>
                </h3>
                <div className="course-meta">
                  <span>
                    <i>
                      <FontAwesomeIcon icon={faUserTie} />
                    </i>
                    631 Students
                  </span>
                  <Link to="/course-details.html">
                    <i>
                      <FontAwesomeIcon icon={faTv} />
                    </i>
                    41 Lessons
                  </Link>
                  <span>
                    <i>
                      <FontAwesomeIcon icon={faClock} />
                    </i>
                    9h 11m
                  </span>
                </div>
                <div className="course-footer">
                  <div className="course-teacher">
                    <Link to="/team-details.html" className="text-inherit">
                      <img src={courseImg4} alt="Teacher" /> By Peter Parker
                    </Link>
                  </div>
                  <div className="course-review">
                    {[...Array(5)].map((_, i) => (
                      <i key={i}>
                        <FontAwesomeIcon icon={faStar} />
                      </i>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="course-style2 layout2 " style={{ height: "15rem" }}>
              <div className="course-img">
                <Link to="/course-details.html">
                  <img
                    src={courseImg5}
                    alt="Course Img"
                    style={{ height: "15rem", width: "15rem" }}
                  />
                </Link>
                <span className="course-price">56 dt</span>
              </div>
              <div className="course-content">
                <h3 className="course-name">
                  <Link to="/course-details.html" className="text-inherit">
                    Graduation For Engineering & Architect
                  </Link>
                </h3>
                <div className="course-meta">
                  <span>
                    <i>
                      <FontAwesomeIcon icon={faUserTie} />
                    </i>
                    631 Students
                  </span>
                  <Link to="/course-details.html">
                    <i>
                      <FontAwesomeIcon icon={faTv} />
                    </i>
                    41 Lessons
                  </Link>
                  <span>
                    <i>
                      <FontAwesomeIcon icon={faClock} />
                    </i>
                    9h 11m
                  </span>
                </div>
                <div className="course-footer">
                  <div className="course-teacher">
                    <Link to="/team-details.html" className="text-inherit">
                      <img src={courseImg4} alt="Teacher" /> By Peter Parker
                    </Link>
                  </div>
                  <div className="course-review">
                    {[...Array(5)].map((_, i) => (
                      <i key={i}>
                        <FontAwesomeIcon icon={faStar} />
                      </i>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
