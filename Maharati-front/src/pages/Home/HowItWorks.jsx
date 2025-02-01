import React from "react";
import aboutImage from "../../assets/img/about/work.png";

const HowItWorks = () => {
  return (
    <section className="space-top space-extra-bottom">
      <div className="container">
        <div className="title-area text-center">
          <div className="sec-icon">
            <div className="vs-circle"></div>
          </div>
          <span className="sec-subtitle">FIND THE BEST TEACHER FOR YOU</span>
          <h2 className="sec-title h1">How it works</h2>
        </div>
        <div className="row align-items-center">
          <div className="col-md-6 col-lg process-inner1 order-2 order-lg-1">
            <div className="process-style1">
              <span className="process-number">1</span>
              <div className="process-content">
                <h3 className="process-title">
                  Find your perfect online tutor
                </h3>
                <p className="process-text">
                  Will reply to your request in hours and arrange free minute
                </p>
              </div>
            </div>
            <div className="process-style1">
              <span className="process-number">2</span>
              <div className="process-content">
                <h3 className="process-title">
                  Meet your tutor to discuss your cours
                </h3>
                <p className="process-text">
                  During trial consultation you have chance to meet teachers
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-5 order-1 order-lg-2 mb-30 mb-md-5 mb-lg-0">
            <div className="img-box1 style2">
              <div className="vs-circle">
                <div className="mega-hover">
                  <img
                    src={aboutImage}
                    style={{
                      height: "400px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg process-inner2 order-3">
            <div className="process-style1">
              <span className="process-number">3</span>
              <div className="process-content">
                <h3 className="process-title">Pay for your course charges</h3>
                <p className="process-text">
                  Pay for your first study using our secure payment
                </p>
              </div>
            </div>
            <div className="process-style1">
              <span className="process-number">4</span>
              <div className="process-content">
                <h3 className="process-title">Start your course lessons</h3>
                <p className="process-text">
                  Be ready to start your lessons the very same day!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
