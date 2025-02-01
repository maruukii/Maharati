import React from "react";
import icon1 from "../../assets/img/icon/about-icon-1.svg"; // Update the path as needed
import icon2 from "../../assets/img/icon/about-icon-2.svg"; // Update the path as needed
import icon3 from "../../assets/img/icon/about-icon-3.svg"; // Update the path as needed
import icon4 from "../../assets/img/icon/about-icon-4.svg"; // Update the path as needed

const Features = () => {
  return (
    <section className="space-top space-extra-bottom">
      <div className="container">
        <div
          className="row vs-carousel"
          data-slide-show="4"
          data-md-slide-show="3"
          data-sm-slide-show="2"
          data-xs-slide-show="2"
        >
          <div className="col-sm-6 col-lg-3">
            <div className="media-style8">
              <div className="media-icon">
                <img src={icon1} alt="80+ Centres" />
              </div>
              <h5 className="media-title">80+ Centres</h5>
              <p className="media-text">
                With over 80 local training centres in the world.
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="media-style8">
              <div className="media-icon">
                <img src={icon2} alt="1M+ Courses" />
              </div>
              <h5 className="media-title">1M+ Courses</h5>
              <p className="media-text">
                Our unique training, based on practical activity.
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="media-style8">
              <div className="media-icon">
                <img src={icon3} alt="43 Years" />
              </div>
              <h5 className="media-title">43 Years</h5>
              <p className="media-text">
                Our heritage and longevity as the leading.
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="media-style8">
              <div className="media-icon">
                <img src={icon4} alt="65K Students" />
              </div>
              <h5 className="media-title">65K Students</h5>
              <p className="media-text">
                Our heritage and longevity as the leading.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
