import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const TopQuality = () => {
  return (
    <section className="space-bottom">
      <div className="container">
        <div className="cta-style2">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="cta-content">
                <p className="cta-text">AWARD WINNING QUALIFIED TUTORS</p>
                <h2 className="cta-title h1">
                  Top quality tutors at affordable prices
                </h2>
                <a href="team.html" className="vs-btn style2">
                  <i>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </i>
                  Find a Tutor
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="cta-img">
                <img src="assets/img/about/about-2-6.jpg" alt="About Img" />
                <a
                  href="https://www.youtube.com/watch?v=_sI_Ps7JSEk"
                  className="play-btn popup-video position-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-play"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopQuality;
