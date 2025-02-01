import React from "react";

const LoginForm = ({ style }) => {
  return (
    <div className="form-style4 login" style={style}>
      <h2 className="form-title">LOG IN</h2>
      <div className="form-group">
        <input
          type="text"
          autoComplete="off"
          name="email"
          id="email"
          placeholder="Username or email address"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          autoComplete="off"
          name="password"
          id="password"
          placeholder="Password"
        />
      </div>
      <div className="row justify-content-between">
        <div className="col-auto form-group">
          <input type="checkbox" name="rememberlogin" id="rememberlogin" />
          <label htmlFor="rememberlogin">Remember me</label>
        </div>
        <div className="col-auto form-group">
          <a className="forget-link" href="#">
            FORGET A PASSWORD?
          </a>
        </div>
      </div>
      <button type="submit" className="vs-btn">
        Login
      </button>
    </div>
  );
};

export default LoginForm;
