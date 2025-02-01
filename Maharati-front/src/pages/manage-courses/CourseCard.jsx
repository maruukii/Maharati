import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const CourseCard = ({
  id,
  image,
  title,
  description,
  price,
  level,
  setChanged,
  changed,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { auth } = useAuth();
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_HOST}/courses/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
          params: {
            doneBy: auth.user._id,
          },
        }
      );
      setChanged(!changed);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="course-card col-md-5">
      <div className="course-card-body">
        <div className="d-flex flex-column flex-sm-row">
          <a
            href="#"
            className="avatar avatar-lg avatar-4by3 mb-3 w-xs-plus-down-100 mr-sm-3"
          >
            <img src={image} alt="Course" className="course-card-image" />
          </a>
          <div className="flex" style={{ minWidth: "200px" }}>
            <h4 className="card-title mb-1">
              <a href="#" className="text-dark" style={{ fontSize: "1.3rem" }}>
                {title}
              </a>
            </h4>
            <p className="text-black-70 text-wrap" style={{ fontSize: "1rem" }}>
              {description}
            </p>
            <div className="d-flex align-items-end">
              <div className="d-flex flex-column mr-3">
                <div className="d-flex align-items-center py-1 border-bottom">
                  <div className="text-black-50">{price} TND</div>
                </div>
                <div className="d-flex align-items-center py-1">
                  <div className="text-muted mr-2">{level}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="course-card-options">
        <div className="d-flex flex-column">
          <button
            onClick={toggleDropdown}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            style={{ backgroundColor: "white", border: "none" }}
          >
            <i className="material-icons">more_vert</i>
          </button>
          <Link
            className="btnx btnx-sm btnx-white"
            to={`/manage-course/${id}`} // Include the ID in the path
            style={{ color: "black" }}
          >
            Edit
          </Link>
        </div>
        {dropdownOpen && (
          <div className="dropdown-menu show">
            <a className="dropdown-item" href="#">
              Course Insights
            </a>
            <div className="dropdown-divider"></div>
            <a
              className="dropdown-item text-danger"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
            >
              Delete course
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  prix: PropTypes.number.isRequired,
  level: PropTypes.string.isRequired,
  onUpdate: PropTypes.func,
};

export default CourseCard;
