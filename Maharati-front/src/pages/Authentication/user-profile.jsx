import React from "react";

import avatar from "../../assets/images/users/avatar-1.jpg";
import './user.scss';
const UserProfile = () => {
  const courses = [
    {
      title: "Learn VueJs",
      image: "assets/images/vuejs.png",
      link: "instructor-take-course.html",
      rating: 4,
    },
    {
      title: "Npm & Gulp Advanced Workflow",
      image: "assets/images/nodejs.png",
      link: "instructor-take-course.html",
      rating: 4,
    },
    {
      title: "Github Webhooks for Beginners",
      image: "assets/images/github.png",
      link: "instructor-take-course.html",
      rating: 4,
    },
    {
      title: "Gulp & Slush Workflows",
      image: "assets/images/gulp.png",
      link: "instructor-take-course.html",
      rating: 4,
    },
  ];

  return (
    <div className="mdk-drawer-layout__content page m-5">
      <div className="container-fluid page__container mt-5">
        <ProfileInfo />
        <hr />
        <h4>Courses by Adrian</h4>
        <div className="card-columns">
          {courses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ProfileInfo = () => (
  <div className="text-center">
    <a href="#">
      <img
        src={avatar}
        alt=""
        className="rounded-circle mt-5"
        style={{ height: "6rem" }}
      />
    </a>
    <h1 className="h2 mb-0 mt-1">Adrian Demian</h1>
    <p className="lead text-muted mb-0">Florida, USA</p>
    <div className="badge badge-primary">INSTRUCTOR</div>
    <hr />
    <h5 className="text-muted mb-1">Instructor Rating</h5>
    <Rating rating={3} />
  </div>
);

const Rating = ({ rating }) => {
  const maxRating = 5;
  return (
    <div className="rating">
      {Array.from({ length: maxRating }, (_, index) => (
        <i
          key={index}
          className={`material-icons ${
            index < rating ? "text-success" : "text-muted-light"
          }`}
        >
          {index < rating ? "star" : "star_border"}
        </i>
      ))}
    </div>
  );
};

const CourseCard = ({ course }) => (
  <div className="card">
    <div className="card-header">
      <div className="media align-items-center">
        <div className="media-left">
          <a href={course.link}>
            <img
              src={course.image}
              alt={course.title}
              width="100"
              className="rounded"
            />
          </a>
        </div>
        <div className="media-body">
          <h4 className="card-title mb-0">
            <a href={course.link}>{course.title}</a>
          </h4>
          <Rating rating={course.rating} />
        </div>
      </div>
    </div>
  </div>
);

export default UserProfile;
