import React from "react";
import teamMember1 from "../../assets/img/team/team-s-3-1.png"; // Update the path as needed
import teamMember2 from "../../assets/img/team/team-s-3-2.png"; // Update the path as needed
import teamMember3 from "../../assets/img/team/team-s-3-3.png"; // Update the path as needed
import teamMember4 from "../../assets/img/team/team-s-3-4.png"; // Update the path as needed
import teamMember5 from "../../assets/img/team/team-s-3-5.png"; // Update the path as needed
import teamMember6 from "../../assets/img/team/team-s-3-6.png"; // Update the path as needed

const tutors = [
  {
    name: "Moniqa Romin",
    designation: "Maths & Physics Tutor",
    lessonsCompleted: "100+ Lessons Completed",
    image: teamMember1,
    rate: "$63 / per hour",
    experience: "2+ years experience",
  },
  {
    name: "Marry Chain",
    designation: "Economics Professor",
    lessonsCompleted: "633+ Lessons Completed",
    image: teamMember2,
    rate: "$45 / per hour",
    experience: "8+ years experience",
  },
  {
    name: "Alice Heard",
    designation: "Statistics Professor",
    lessonsCompleted: "755+ Lessons Completed",
    image: teamMember3,
    rate: "$99 / per hour",
    experience: "7+ years experience",
  },
];

const Team = () => {
  return (
    <section className="space-top space-extra-bottom bg-smoke">
      <div className="container">
        <div className="title-area text-center">
          <div className="sec-icon">
            <div className="vs-circle"></div>
          </div>
          <span className="sec-subtitle">IDEAL TUTOR FOR EVERYONE</span>
          <h2 className="sec-title h1">Qualified Online Tutors</h2>
        </div>
        <div
          className="row vs-carousel"
          data-slide-show="4"
          data-lg-slide-show="3"
          data-md-slide-show="2"
          data-sm-slide-show="2"
          data-center-mode="true"
        >
          {tutors.map((tutor, index) => (
            <div className="col-sm-6 col-xl-4" key={index}>
              <div className="team-style2">
                <div className="team-content">
                  <h4 className="team-name h5">
                    <a href="team-details.html">{tutor.name}</a>
                  </h4>
                  <span className="team-courses">{tutor.lessonsCompleted}</span>
                  <div className="team-img">
                    <img src={tutor.image} alt={tutor.name} />
                  </div>
                  <p className="team-experi">{tutor.experience}</p>
                  <div className="team-review">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
