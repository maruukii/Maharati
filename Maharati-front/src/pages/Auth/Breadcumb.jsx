import React from "react";

const BreadcrumbWrapper = () => {
  return (
    <div
      className="breadcumb-wrapper"
      data-bg-src="assets/img/breadcumb/breadcumb-bg.png"
    >
      <div className="container z-index-common">
        <div className="breadcumb-content">
          <h1 className="breadcumb-title">Login & Register</h1>
          <p className="breadcumb-text">
            Search over 200 individual encyclopedias and reference books.
          </p>
          <div className="breadcumb-menu-wrap">
            <ul className="breadcumb-menu">
              <li>
                <a href="index.html">Home</a>
              </li>
              <li>Login & Register</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadcrumbWrapper;
