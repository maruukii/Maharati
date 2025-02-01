import React from "react";
import breadcumbBg from "../../assets/img/breadcumb/ab.jpg"; // Update the path as needed
import { Link } from "react-router-dom";
import CourseSection from "./CourseSection ";
import "./courses.scss";
const Courses = () => {
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
            {/* <h1 className="breadcumb-title">Our Courses</h1>
            <p className="breadcumb-text">
              Search over 200 individual encyclopedias and reference books.
            </p> */}
            <div className="breadcumb-menu-wrap">
              <ul className="breadcumb-menu">
                <li>
                  <Link to="/Home">
                    <a>Home</a>
                  </Link>
                </li>
                <li>OUR COURSES</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <CourseSection />
    </div>
  );
};

export default Courses;
