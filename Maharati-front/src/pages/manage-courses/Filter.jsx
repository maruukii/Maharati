import React, { useEffect, useRef } from "react";
import "./CoursesDash.scss";

const Filter = () => {
  const dropdownToggleRef = useRef(null);
  const dropdownMenuRef = useRef(null);

  useEffect(() => {
    const dropdownToggle = dropdownToggleRef.current;
    const dropdownMenu = dropdownMenuRef.current;

    const handleClickOutside = (event) => {
      if (
        dropdownToggle &&
        !dropdownToggle.contains(event.target) &&
        dropdownMenu &&
        !dropdownMenu.contains(event.target)
      ) {
        dropdownMenu.classList.remove("show");
      }
    };

    const handleToggleClick = (event) => {
      event.preventDefault();
      dropdownMenu.classList.toggle("show");
    };

    if (dropdownToggle && dropdownMenu) {
      dropdownToggle.addEventListener("click", handleToggleClick);
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      if (dropdownToggle) {
        dropdownToggle.removeEventListener("click", handleToggleClick);
      }
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="d-flex flex-row">
      <div className="dropdown mb-3" style={{ marginRight: "1%" }}>
        <a
          href="#"
          ref={dropdownToggleRef}
          className="btn btn-white d-flex mt-1"
        >
          <i className="material-icons mr-sm-3" style={{ marginRight: "10%" }}>
            tune
          </i>
          <span className="d-none d-sm-block">Filters</span>
        </a>

        <div className="custom-dropdown-menu" ref={dropdownMenuRef}>
          <div className="custom-dropdown-item d-flex flex-column">
            <div className="custom-form-group">
              <label htmlFor="custom-select" className="custom-form-label">
                Category
              </label>
              <br />
              <select
                id="custom-select"
                className="custom-form-control custom-select"
              >
                <option selected>All categories</option>
                <option value="1">Vue.js</option>
                <option value="2">Node.js</option>
                <option value="3">GitHub</option>
              </select>
            </div>
            <div className="custom-form-group">
              <label htmlFor="published01" className="custom-form-label">
                Published
              </label>
              <br />
              <select
                id="published01"
                className="custom-form-control custom-select"
              >
                <option selected>Published courses</option>
                <option value="1">Draft courses</option>
                <option value="3">All courses</option>
              </select>
            </div>
            <a href="#" className="custom-clear-filters">
              Clear filters
            </a>
          </div>
        </div>
      </div>

      <div className="d-flex position-relative flex-grow-1">
        <input
          type="text"
          className="flex-grow-1"
          style={{
            height: "50px",
            padding: "0 60px 0 28px", // Adjust padding to make room for the button
            border: "1px solid #d2d2d2",
            color: "#555555",
            backgroundColor: "var(--white-color)",
            borderRadius: "9999px", // Use rounded corners
            fontSize: "14px",
            width: "100%",
          }}
          placeholder="Search courses"
          id="searchSample02"
        />
        <button
          className=" position-absolute end-0 top-0 mt-1 me-3"
          type="button"
          role="button"
          style={{
            height: "48px",
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
        >
          <i className="material-icons">search</i>
        </button>
      </div>
    </div>
  );
};

export default Filter;
