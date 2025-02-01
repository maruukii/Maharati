import category1 from "../../assets/img/category/category-2-1.jpg";
import category2 from "../../assets/img/category/category-2-2.png";
import category3 from "../../assets/img/category/category-2-3.png";
import category4 from "../../assets/img/category/category-2-4.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  faBriefcaseMedical,
  faFlask,
} from "@fortawesome/free-solid-svg-icons";

const Category = () => {
  return (
    <section className="space-bottom">
      <div className="container">
        <div
          className="title-area text-center wow fadeInUp"
          data-wow-delay="0.3s"
        >
          <div className="sec-icon">
            <div className="vs-circle"></div>
          </div>
          <span className="sec-subtitle">BLOG AND UPDATES</span>
          <h2 className="sec-title">Topics by Category</h2>
        </div>
        <div
          className="row vs-carousel wow fadeInUp"
          data-wow-delay="0.4s"
          data-slide-show="4"
          data-lg-slide-show="3"
          data-md-slide-show="2"
          data-sm-slide-show="2"
          data-xs-slide-show="2"
          data-center-mode="true"
        >
          <div className="col-6 col-lg-4 col-xl-4">
            <div className="category-style1">
              <div className="category-img">
                <img className="w-100" src={category4} alt="category" />
                <div className="icon">
                  <FontAwesomeIcon icon={faLayerGroup} />
                </div>
              </div>
              <div className="category-content">
                <h2 className="category-title">
                  <a href="/courses">Software Development</a>
                </h2>
                <span className="subtitle">over 600 courses</span>
              </div>
            </div>
          </div>
          <div className="col-6 col-lg-4 col-xl-4">
            <div className="category-style1">
              <div className="category-img">
                <img className="w-100" src={category2} alt="category" />
                <div className="icon">
                  <i className="fa fa-globe-europe"></i>
                </div>
              </div>
              <div className="category-content">
                <h2 className="category-title">
                  <a href="/courses">Earth History</a>
                </h2>
                <span className="subtitle">over 336 courses</span>
              </div>
            </div>
          </div>
          <div className="col-6 col-lg-4 col-xl-4">
            <div className="category-style1">
              <div className="category-img">
                <img className="w-100" src={category1} alt="category" />
                <div className="icon">
                  <FontAwesomeIcon icon={faFlask} />
                </div>
              </div>
              <div className="category-content">
                <h2 className="category-title">
                  <a href="/courses">Chemistry</a>
                </h2>
                <span className="subtitle">over 778 courses</span>
              </div>
            </div>
          </div>
          {/* <div className="col-6 col-lg-4 col-xl-3">
            <div className="category-style1">
              <div className="category-img">
                <img
                  className="w-100"
                  src={category3}
                  style={{ height: "232px" }}
                />
                <div className="icon">
                  <FontAwesomeIcon icon={faBriefcaseMedical} />
                </div>
              </div>
              <div className="category-content">
                <h2 className="category-title">
                  <a href="course.html">Medical Health</a>
                </h2>
                <span className="subtitle">over 450 courses</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Category;
