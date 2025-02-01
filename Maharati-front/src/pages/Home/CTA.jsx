import React from "react";
import { Link } from "react-router-dom"; // Assuming you are using react-router for navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons"; // Add this for the play icon
import c4 from "../../assets/img/course/course-1-4.png";

const CTA = () => {
  return (
    <section className="space-top space-bottom">
      <div className="container">
        <div className="cta-style2">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="cta-content">
                <p className="cta-text">AWARD WINNING QUALIFIED TUTORS</p>
                <h1 className="cta-title ">
                  Top quality tutors at affordable prices
                </h1>
                <Link
                  to="/team.html"
                  className="vs-btn style3 mt-2"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <i>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </i>
                  Find a Tutor
                </Link>
              </div>
            </div>
            <div className="col-lg-6 mb-5">
              <div className="cta-img">
                <img src={c4} alt="About Img" />
                <a
                  href="https://www.youtube.com/watch?v=_sI_Ps7JSEk"
                  className="play-btn popup-video position-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-play">
                    <FontAwesomeIcon icon={faPlay} />
                  </i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
