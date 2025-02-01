import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/img/LOGO.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import LanguageDropdown from "../Common/TopbarDropdown/LanguageDropdown";
import { useSnackbar } from "notistack";
const Navbar = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    enqueueSnackbar("You have been logged out", { variant: "success" });
    const from = location.state?.from?.pathname || "/";
    navigate(from, { replace: true });
  };
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };
  document.addEventListener("DOMContentLoaded", () => {
    const menuItemsWithChildren = document.querySelectorAll(
      ".vs-item-has-children > a"
    );

    menuItemsWithChildren.forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        const parentLi = item.closest("li");
        parentLi.classList.toggle("vs-active");
      });
    });
  });

  return (
    <>
      {/* Mobile Menu */}
      <div className={`vs-menu-wrapper ${isMenuOpen ? "open" : ""}`}>
        <div className="vs-menu-area text-center">
          <button className="vs-menu-toggle" onClick={toggleMenu}>
            <i className="fa fa-times"></i>
          </button>
          <div className="mobile-logo">
            <a href="">
              <img src={logo} alt="Maharati" />
            </a>
          </div>
          <div className="vs-mobile-menu">
            <ul>
              <li className="menu-item-has-children">
                <a href="">Demos</a>
                <ul className="sub-menu">
                  <li>
                    <a
                      href="
                    "
                    >
                      Demo Style 1
                    </a>
                  </li>
                  <li>
                    <a
                      href="
                    "
                    >
                      Demo Style 2
                    </a>
                  </li>
                  <li>
                    <a
                      href="
                    "
                    >
                      Demo Style 3
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li className="menu-item-has-children">
                <a href="/course">Courses</a>
                <ul className="sub-menu">
                  <li>
                    <a href="">Courses 1</a>
                  </li>
                  <li>
                    <a href="">Courses 2</a>
                  </li>
                  <li>
                    <a href="">Course Details 1</a>
                  </li>
                  <li>
                    <a href="">Course Details 2</a>
                  </li>
                </ul>
              </li>
              <li className="menu-item-has-children">
                <a href="">Blog</a>
                <ul className="sub-menu">
                  <li>
                    <a href="">Blog</a>
                  </li>
                  <li>
                    <a href="">Blog Details</a>
                  </li>
                </ul>
              </li>
              <li className="menu-item-has-children">
                <a href="">Pages</a>
                <ul className="sub-menu">
                  <li>
                    <a href="">Our Tutors</a>
                  </li>
                  <li>
                    <a href="">Tutor Details</a>
                  </li>
                  <li>
                    <a href="">Become Tutor</a>
                  </li>
                  <li>
                    <a href="">Find Tutor</a>
                  </li>
                  <li>
                    <a href="">Academic</a>
                  </li>
                  <li>
                    <a href="">Academic Program</a>
                  </li>
                  <li>
                    <a href="">Program Details</a>
                  </li>
                  <li>
                    <a href="">Find Program</a>
                  </li>
                  <li>
                    <a href="">Event Details</a>
                  </li>
                  <li>
                    <a href="/login">Login Register</a>
                  </li>
                  <li>
                    <a href="">Error Page</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Popup Search Box */}
      <div className={`popup-search-box ${isSearchOpen ? "show" : ""}`}>
        <button className="searchClose" onClick={toggleSearch}>
          ×
        </button>
        <form>
          <input type="text" placeholder="Search..." />
          <button type="submit">🔍</button>
        </form>
      </div>

      <header
        className="vs-header header-layout1"
        style={{ top: 0, width: "100%", zIndex: 1000 }}
      >
        <div className="header-top">
          <div className="container">
            <div className="row justify-content-between align-items-center gx-50">
              <div className="col d-none d-xl-block">
                <div className="header-links">
                  <ul>
                    <li>
                      <i className="fas fa-phone-alt"></i>Phone:
                      <a href="tel:+4402076897888">(+216) 58628518</a>
                    </li>
                    <li>
                      <i className="fas fa-envelope"></i>Email:
                      <a>{"CONTACT@MAHARATI.TN".toLowerCase()}</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-md-auto text-center">
                <div className="header-social">
                  <LanguageDropdown />
                  <a
                    href="https://www.facebook.com/profile.php?id=61561551282308"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/profeel-tn/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sticky-wrapper">
          <div className="sticky-active">
            <div className="container position-relative z-index-common ">
              <div className="row align-items-center justify-content-between ">
                <div className="col-auto">
                  <div className="vs-logo">
                    <Link to="/">
                      <img src={logo} />
                    </Link>
                  </div>
                </div>
                <div className="col text-end text-xl-center">
                  <nav className="main-menu menu-style1 d-none d-lg-block">
                    <ul>
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/about">About Us</Link>
                      </li>
                      <li>
                        <Link to="/courses">Courses</Link>
                      </li>
                      {/* <li className="menu-item-has-children">
                        <a href="">Tutor</a>
                        <ul className="sub-menu">
                          <li>
                            <a href="">Our Tutors</a>
                          </li>
                          <li>
                            <a href="">Tutor Details</a>
                          </li>
                          <li>
                            <a href="">Become Tutor</a>
                          </li>
                          <li>
                            <a href="">Find Tutor</a>
                          </li>
                        </ul>
                      </li> */}
                      <li>
                        <Link to="/contact">Contact Us</Link>
                      </li>
                    </ul>
                  </nav>
                  <button
                    className="vs-menu-toggle d-inline-block d-lg-none"
                    onClick={toggleMenu}
                  >
                    <i className="fa fa-bars"></i>
                  </button>
                </div>

                {/* <button
                      type="button"
                      className="searchBoxTggler"
                      onClick={toggleSearch}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                    <a href="" className="vs-btn style4">
                      <i>
                        <FontAwesomeIcon icon={faGraduationCap} />
                      </i>{" "}
                      Find Program
                    </a> */}
                <div className="col-auto">
                  {auth.user == null ? (
                    <div className="vs-btn style4 loginButton">
                      <Link
                        to="/login"
                        style={{
                          display: "flex",
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        <i
                          className="fas fa-user-circle"
                          style={{ color: "black", fontSize: "1rem" }}
                        ></i>
                        <div className="authentification">Login / Register</div>
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div
                        className="vs-btn style4 loginButton"
                        style={{ marginRight: "10px" }}
                      >
                        <Link
                          to="/dashboard"
                          style={{
                            display: "flex",
                            textDecoration: "none",
                            color: "black",
                          }}
                        >
                          <i
                            className="fas fa-list-alt"
                            style={{ color: "black", fontSize: "1rem" }}
                          ></i>
                          <div className="authentification">Dashboard</div>
                        </Link>
                      </div>
                      <div className="vs-btn style4 loginButton">
                        <Link
                          to="/"
                          onClick={handleLogout}
                          style={{
                            display: "flex",
                            textDecoration: "none",
                            color: "black",
                          }}
                        >
                          <i
                            className="fas fa-user-circle"
                            style={{ color: "black", fontSize: "1rem" }}
                          ></i>
                          <div className="authentification">Logout</div>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
