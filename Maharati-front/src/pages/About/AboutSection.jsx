import React from "react";
import authorImage from "../../assets/img/about/author-1-1.png"; // Update the path as needed
import aboutImage from "../../assets/img/about/about-s-1.png"; // Update the path as needed

const AboutSection = () => {
  return (
    <section className="space-top">
      <div className="container">
        <div className="row">
          <div className="col-xl-9">
            <div className="title-area mb-3 mb-xl-5">
              <span className="sec-subtitle">Welcome to global education</span>
              <h2 className="sec-title">
                Teach online and connect with students all over the world
              </h2>
            </div>
          </div>
          <div className="col-md-6 col-xl-4 mb-30 mb-xl-0">
            <p className="fs-md mt-n1">
              Ducamb welcomed every pain avoided but in certain circumstances
              owing to the claims of igation that off business it will
              frequently occur the obligations of business it will frequently of
              curs that pleasures.
            </p>
            
          </div>
          <div className="col-md-6 col-xl-4">
            <div className="list-style1 vs-list">
              <ul>
                <li>Steady stream of new students</li>
                <li>Smart calendar</li>
                <li>Interactive classroom</li>
                <li>Convenient payment methods</li>
                <li>Professional development webinars</li>
              </ul>
            </div>
          </div>
          <div className="col-xl-4 mt-n5 pt-5 pt-xl-0">
            <div className="img-box3">
              <div className="img-1 mega-hover">
                <img className="w-100" src={aboutImage} alt="About Img" />
              </div>
              <div className="shape-dotted jump"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
