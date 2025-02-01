import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import Preloader from "../components/Preloader/Preloader";
import "./Root.scss";
import withRouter from "../components/Common/withRouter";
import ChatWindow from "../components/UI/ChatWindow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
const RootLayout = (props) => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const prevLocationRef = useRef(location);

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (prevLocationRef.current.pathname !== location.pathname) {
      setLoading(true);
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 5000);

      prevLocationRef.current = location;

      return () => clearTimeout(timeout);
    } else {
      handleScrollUp();
      setLoading(false);
    }
  }, [location]);

  const currentPath = location.pathname.toLowerCase();

  const hideNavbarRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/course/",
  ];

  const showNavbar = !hideNavbarRoutes.some((route) =>
    currentPath.startsWith(route)
  );

  return (
    <React.Fragment>
      <div className="grid-wrapper">
        {loading && <Preloader />}
        {showNavbar && <Navbar />}
        <div className="outletBG">
          <div className="main">{props.children}</div>
          <a className="scrollToTop scroll-btn" onClick={handleScrollUp}>
            <i>
              <FontAwesomeIcon icon={faArrowUp} />
            </i>
          </a>
          <div className="scrollToTop scroll-btn ">
            <ChatWindow />
          </div>
        </div>
        {showNavbar && <Footer />}
      </div>
    </React.Fragment>
  );
};

export default withRouter(RootLayout);
