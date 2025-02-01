import React, { useRef } from "react";
import HeroArea from "./HeroArea";
import About from "./About";
import Category from "./Category";
import CTA from "./CTA";
import Courses from "./Courses";
import HowItWorks from "./HowItWorks";
import aboutImage from "../../assets/img/bg/course-bg-pattern.jpg";
import useIntersectionObserver from "../../components/useIntersectionObserver";
import "./Home.scss";

const Home = () => {
  document.title = "Maharati";
  const ctaRef = useRef(null);
  const coursesRef = useRef(null);
  const howItWorksRef = useRef(null);
  const AboutRef = useRef(null);
  const CategoryRef = useRef(null);

  const isCTAVisible = useIntersectionObserver(ctaRef, { threshold: 0.3 });
  const isCoursesVisible = useIntersectionObserver(coursesRef, {
    threshold: 0.3,
  });
  const isHowItWorksVisible = useIntersectionObserver(howItWorksRef, {
    threshold: 0.3,
  });
  const isAboutRefVisible = useIntersectionObserver(AboutRef, {
    threshold: 0.3,
  });
  const isCategoryRefVisible = useIntersectionObserver(CategoryRef, {
    threshold: 0.3,
  });

  return (
    <div>
      <HeroArea />
      <div
        ref={AboutRef}
        className={`animate-on-scroll ${isAboutRefVisible ? "is-visible" : ""}`}
      >
        <About />
      </div>
      <div
        ref={CategoryRef}
        className={`animate-on-scroll ${
          isCategoryRefVisible ? "is-visible" : ""
        }`}
      >
        <Category />
      </div>
      <div
        style={{
          backgroundImage: `url(${aboutImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          ref={ctaRef}
          className={`animate-on-scroll ${isCTAVisible ? "is-visible" : ""}`}
        >
          <CTA />
        </div>
        <div
          ref={coursesRef}
          className={`animate-on-scroll ${
            isCoursesVisible ? "is-visible" : ""
          }`}
        >
          <Courses />
        </div>
      </div>
      <div
        ref={howItWorksRef}
        className={`animate-on-scroll ${
          isHowItWorksVisible ? "is-visible" : ""
        }`}
      >
        <HowItWorks />
      </div>
    </div>
  );
};

export default Home;
