import React from "react";
import LoginForm from "../login/login";
import SignupForm from "../signup/signup";
import log from "../../assets/img/bg/course-bg-pattern.jpg";

const AuthSection = () => {
  const formStyle = {
    backgroundImage: `url(${log})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <section className="space-top space-extra-bottom">
      <div className="container">
        <div className="row gx-60">
          <div className="col-lg-6">
            <LoginForm style={formStyle} />
          </div>
          <div className="col-lg-6">
            <SignupForm style={formStyle} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthSection;
