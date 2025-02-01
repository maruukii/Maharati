import React from "react";

const SignupForm = ({ style }) => {
  return (
    <div className="form-style4 signup" style={style}>
      <h2 className="form-title">SIGN UP</h2>
      <div className="form-group">
        <input
          type="text"
          autoComplete="off"
          name="signupname"
          id="signupname"
          placeholder="Complete Name"
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          autoComplete="off"
          name="signupemail"
          id="signupemail"
          placeholder="Email address"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          autoComplete="off"
          name="signupphone"
          id="signupphone"
          placeholder="Password"
        />
      </div>
      <button type="button" className="vs-btn">
        Register
      </button>
    </div>
  );
};

export default SignupForm;
