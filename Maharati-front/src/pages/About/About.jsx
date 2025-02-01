import React, { useRef } from "react";
import breadcumbBg from "../../assets/img/breadcumb/ab.jpg"; // Update the path as needed
import { Link } from "react-router-dom";
import AboutSection from "./AboutSection";
import Features from "./Features";
import Team from "./Team";
import useIntersectionObserver from "../../components/useIntersectionObserver";

const About = () => {
  const AboutSectionRef = useRef(null);
  const FeaturesRef = useRef(null);
  const TeamRef = useRef(null);

  const isAboutSectionVisible = useIntersectionObserver(AboutSectionRef, {
    threshold: 0.3,
  });
  const isFeaturesVisible = useIntersectionObserver(FeaturesRef, {
    threshold: 0.3,
  });
  const isTeamVisible = useIntersectionObserver(TeamRef, { threshold: 0.3 });

  return (
    <div>
      <div
        className="breadcumb-wrapper"
        style={{
          backgroundImage: `url(${breadcumbBg})`,
          backgroundSize: " 100% 160%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container z-index-common">
          <div className="breadcumb-content">
            {/* <h1 className="breadcumb-title">About Us</h1>
            <p className="breadcumb-text">
              Search over 200 individual encyclopedias and reference books.
            </p> */}
            <div className="breadcumb-menu-wrap">
              <ul className="breadcumb-menu">
                <li>
                  <Link to="/Accueil">
                    <a>Home</a>
                  </Link>
                </li>
                <li>About Us</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={AboutSectionRef}
        className={`animate-on-scroll ${
          isAboutSectionVisible ? "is-visible" : ""
        }`}
      >
        <AboutSection />
      </div>
      <div
        ref={FeaturesRef}
        className={`animate-on-scroll ${isFeaturesVisible ? "is-visible" : ""}`}
      >
        <Features />
      </div>
      <div
        ref={TeamRef}
        className={`animate-on-scroll ${isTeamVisible ? "is-visible" : ""}`}
      ></div>
    </div>
  );
};

export default About;
