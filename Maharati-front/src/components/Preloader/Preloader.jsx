import { useEffect } from "react";
import "./Preloader.scss";
import { bouncy } from "ldrs";

bouncy.register();

const Preloader = () => {
  useEffect(() => {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add("fade-out");
        setTimeout(() => preloader.remove(), 1500);
      }, 1000);
    }
  }, []);

  return (
    <div>
      <div
        className="preloader"
        style={{ backgroundColor: "white", zIndex: "998" }}
      >
        <div className="preloader-inner">
          <l-bouncy size="120" speed="1" color="#FFCC33"></l-bouncy>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
