import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { PhotoProvider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import SwiperCore, { Pagination, EffectFade, Autoplay } from "swiper";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";

SwiperCore.use([Pagination, EffectFade, Autoplay]);

const CarouselComponent = () => {
  const [images, setImages] = useState({});
  useEffect(() => {
    const loadImages = async () => {
      const hero1Module = await import("../../assets/img/hero/hero-2-1.jpg");
      const hero2Module = await import("../../assets/img/hero/hero-2-2.jpg");
      const hero3Module = await import("../../assets/img/hero/hero-2-3.jpg");

      setImages({
        hero1: hero1Module.default,
        hero2: hero2Module.default,
        hero3: hero3Module.default,
      });
    };

    loadImages();
  }, []);

  return (
    <section className="hero-layout1 style2">
      <PhotoProvider className="no-event">
        <Swiper
          speed={1000}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            renderBullet: (index, className) =>
              `<span class="${className}"></span>`,
          }}
          loop
        >
          <SwiperSlide>
            <div className="hero-inner">
              <div className="hero-bg">
                <LazyLoad height={200} offset={900}>
                  <img src={images.hero1} alt="Hero 1" />
                </LazyLoad>
              </div>
              <div className="container">
                <div className="hero-content">
                  <h1 className="hero-title animated">
                    Inspire The Next Generation
                  </h1>
                  <p className="hero-text animated">
                    Search over 200 individual encyclopedias and reference books
                    from the worlds.
                  </p>
                  <div className="hero-btns animated">
                    <Link to="/courses" className="vs-btn style5">
                      <i>
                        <FontAwesomeIcon icon={faAngleRight} />
                      </i>
                      Explore Courses
                    </Link>
                  </div>
                </div>
              </div>
              <div className="course-style3">
                <div className="course-img">
                  <a href="course-details.html">
                    <img
                      src="../../assets/img/course/course-1-2.png"
                      alt="course"
                    />
                  </a>
                </div>
                <div className="course-content">
                  <div className="course-review">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    (5.0)
                  </div>
                  <h3 className="course-name">
                    <a href="course-details.html">
                      Advance Beginner's Goal & Managing Course
                    </a>
                  </h3>
                  <span className="course-teacher">By Ana Watson</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero-inner">
              <div className="hero-bg">
                <LazyLoad height={200} offset={500}>
                  <img src={images.hero2} alt="Hero 2" />
                </LazyLoad>
              </div>
              <div className="container">
                <div className="hero-content">
                  <h1 className="hero-title animated">
                    Empower Your Knowledge
                  </h1>
                  <p className="hero-text animated">
                    Discover new subjects and master them with our courses.
                  </p>
                  <div className="hero-btns animated">
                    <Link to="/courses" className="vs-btn style5">
                      <i>
                        <FontAwesomeIcon icon={faAngleRight} />
                      </i>
                      Explore Courses
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero-inner">
              <div className="hero-bg">
                <LazyLoad height={200} offset={500}>
                  <img src={images.hero3} alt="Hero 3" />
                </LazyLoad>
              </div>
              <div className="container">
                <div className="hero-content">
                  <h1 className="hero-title animated">Achieve Your Dreams</h1>
                  <p className="hero-text animated">
                    Join our community and reach your goals with our support.
                  </p>
                  <div className="hero-btns animated">
                    <Link to="/courses" className="vs-btn style5">
                      <i>
                        <FontAwesomeIcon icon={faAngleRight} />
                      </i>
                      Explore Courses
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </PhotoProvider>
    </section>
  );
};

export default CarouselComponent;
