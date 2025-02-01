import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import Filter from "./Filter";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CoursesDash.scss";
import useAuth from "../../hooks/useAuth";

const Courses = () => {
  document.title = "Courses | Maharati";

  const [courses, setCourses] = useState([]);
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        var response = { data: "" };
        if (auth?.user?.Role === "Admin") {
          response = await axios.get(`${import.meta.env.VITE_HOST}/courses`, {
            headers: {
              Authorization: `Bearer ${auth?.accessToken}`,
            },
          });
        } else {
          response = await axios.get(
            `${import.meta.env.VITE_HOST}/courses/user/${auth.user._id}`,
            {
              headers: {
                Authorization: `Bearer ${auth?.accessToken}`,
              },
            }
          );
        }
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to fetch courses. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [changed]);

  const handleSort = (sortBy) => {
    const sortedCourses = [...courses].sort((a, b) => {
      if (sortBy === "CourseName") {
        return sortOrder === "asc"
          ? a.CourseName.localeCompare(b.CourseName)
          : b.CourseName.localeCompare(a.CourseName);
      } else if (sortBy === "Sales") {
        return sortOrder === "asc" ? a.sales - b.sales : b.sales - a.sales;
      }
      return 0;
    });
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setCourses(sortedCourses);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Ensure courses is defined before calling slice
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses
    ? courses.slice(indexOfFirstCourse, indexOfLastCourse)
    : [];

  return (
    <div className="mdk-drawer-layout__content">
      <div className="container-Dash m-5">
        <div className="d-flex flex-column flex-sm-row flex-wrap mb-3 align-items-start align-items-sm-center">
          <div className="flex mb-2 mb-sm-0 mt-5">
            <h1 className="h2">Manage Courses</h1>
          </div>

          <Link className="btn btn-success ms-auto mt-5" to="/manage-course">
            Add course
          </Link>
        </div>

        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <>
            <div className="card card-body border-left-3 border-left-primary navbar-shadow mb-4">
              <Filter />
              <div
                className="d-flex flex-column flex-sm-row align-items-sm-center"
                style={{ whiteSpace: "nowrap" }}
              >
                <small className="flex text-muted text-uppercase mr-3 mb-2 mb-sm-0">
                  Displaying {currentCourses.length} out of {courses.length}{" "}
                  courses
                </small>
                {/* <div className="w-auto table d-flex align-items-center mb-0">
                  <small className="text-muted text-uppercase mr-3 d-none d-sm-block">
                    Sort by
                  </small>
                  <a
                    href="#"
                    className="sort small text-uppercase"
                    onClick={() => handleSort("CourseName")}
                  >
                    Course
                  </a>
                  <a
                    href="#"
                    className="sort small text-uppercase ml-2"
                    onClick={() => handleSort("Earnings")}
                  >
                    Earnings
                  </a>
                  <a
                    href="#"
                    className="sort small text-uppercase ml-2"
                    onClick={() => handleSort("Sales")}
                  >
                    Sales
                  </a>
                </div> */}
              </div>
            </div>

            {currentCourses.length === 0 ? (
              <div
                className="alert alert-light alert-dismissible border-1 border-left-3 border-left-warning"
                role="alert"
              >
                {/* <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button> */}
                <div className="text-black-70">
                  Ohh no! No courses to display. Add some courses.
                </div>
              </div>
            ) : (
              <div className="row course">
                {currentCourses.map((course) => (
                  <CourseCard
                    key={course._id}
                    id={course._id}
                    image={course.CourseImage.ImageLink}
                    title={course.CourseName}
                    description={course.CourseDescription}
                    price={course.CoursePrice}
                    level={course.CourseLevel}
                    setChanged={setChanged}
                    changed={changed}
                  />
                ))}
                <div className="course">
                  <ul className="pagination pagination-rounded m-3">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <Link
                        className="page-link"
                        to="#"
                        onClick={() => handlePageChange(currentPage - 1)}
                        aria-label="Previous"
                      >
                        <i className="mdi mdi-chevron-left"></i>
                      </Link>
                    </li>
                    {[
                      ...Array(
                        Math.ceil(courses.length / coursesPerPage)
                      ).keys(),
                    ].map((page) => (
                      <li
                        key={page + 1}
                        className={`page-item ${
                          currentPage === page + 1 ? "active" : ""
                        }`}
                      >
                        <Link
                          className="page-link"
                          to="#"
                          onClick={() => handlePageChange(page + 1)}
                        >
                          {page + 1}
                        </Link>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage ===
                        Math.ceil(courses.length / coursesPerPage)
                          ? "disabled"
                          : ""
                      }`}
                    >
                      <Link
                        className="page-link"
                        to="#"
                        onClick={() => handlePageChange(currentPage + 1)}
                        aria-label="Next"
                      >
                        <i className="mdi mdi-chevron-right"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Courses;
