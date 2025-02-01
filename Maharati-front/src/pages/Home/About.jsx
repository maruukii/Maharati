import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.css";
import about1 from "../../assets/img/about/about-2-1.jpg";
import about2 from "../../assets/img/about/about-2-2.jpg";
import about3 from "../../assets/img/about/about-2-3.jpg";

const About = () => {
  return (
    <section className="space-top space-bottom">
      <div className="container">
        <div className="row align-items-center align-items-xxl-start">
          <div className="col-lg-5 wow fadeInUp" data-wow-delay="0.3s">
            <div className="picture-box2">
              <div className="picture-1 mega-hover">
                <img src={about1} alt="About Img" />
              </div>
              <div className="picture-2 mega-hover">
                <img src={about3} alt="About Img" />
              </div>
              <div className="picture-3 mega-hover">
                <img src={about2} alt="About Img" />
              </div>
              <div className="vs-circle"></div>
            </div>
          </div>
          <div className="col-lg-7 wow fadeInUp" data-wow-delay="0.4s">
            <div className="about-box2">
              <div className="title-area">
                <span className="sec-subtitle">
                  WELCOME TO GLOBAL EDUCATION
                </span>
                <h2 className="about-title h1">
                  Take Your Learning Organization to The Next Level.
                </h2>
              </div>
              <div className="about-content">
                <p className="fs-md">
                  Ducamb welcomed every pain avoided but in certain
                  circumstances owing to the claims of litigation that off but
                  will frequently occur the obligations of business it will
                  frequently occur that pleasures.
                </p>
                <div className="call-media">
                  <div className="media-icon">
                    <FontAwesomeIcon icon={faPhoneAlt} />
                  </div>
                  <div className="media-body">
                    <span className="media-label">Call Anytime 24/7</span>
                    <p className="media-info">(+216) 58628518</p>
                  </div>
                </div>
                <a className="vs-btn style3 mt-2">
                  <i>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </i>
                  Get More Info
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
