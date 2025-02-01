import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import axios from "axios";

const CourseSection = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const coursesPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_HOST}/courses`
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to fetch courses. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Ensure courses is defined and is an array before calling slice
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = Array.isArray(courses)
    ? courses.slice(indexOfFirstCourse, indexOfLastCourse)
    : [];

  return (
    <section className="space-top space-extra-bottom">
      <div className="container">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className="row">
            {currentCourses.map((course) => (
              <div
                key={course._id}
                className="col-sm-6 col-xl-4 course-container"
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(courses.length / coursesPerPage)}
          handlePageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

const Pagination = ({ currentPage, totalPages, handlePageChange }) => (
  <div className="vs-pagination">
    <ul className="pagination pagination-rounded m-3">
      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <a
          className="page-link"
          href="#"
          onClick={() => handlePageChange(currentPage - 1)}
          aria-label="Previous"
        >
          <i className="mdi mdi-chevron-left"></i>
        </a>
      </li>
      {[...Array(totalPages).keys()].map((page) => (
        <li
          key={page + 1}
          className={`page-item ${currentPage === page + 1 ? "active" : ""}`}
        >
          <a
            className="page-link"
            href="#"
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </a>
        </li>
      ))}
      <li
        className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
      >
        <a
          className="page-link"
          href="#"
          onClick={() => handlePageChange(currentPage + 1)}
          aria-label="Next"
        >
          <i className="mdi mdi-chevron-right"></i>
        </a>
      </li>
    </ul>
  </div>
);

export default CourseSection;
