import React, { useEffect, useReducer, useState, useRef } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import "./login.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";

import signin from "../../assets/images/auth/signin.png";
import signinBg from "../../assets/images/auth/signin-bg.png";

const emailphoneReducer = (prevState, action) => {
  if (action.type === "Email/phone changed") {
    return {
      value: action.value,
      isValid:
        !isNaN(action.value) ||
        (action.value.includes("@") && action.value.includes(".")),
    };
  }
  if (action.type === "validate_email/phone") {
    return {
      value: prevState.value,
      isValid:
        !isNaN(prevState.value) ||
        (prevState.value.includes("@") && prevState.value.includes(".")),
    };
  }
  return { value: "", isValid: null };
};

const passwordReducer = (prevState, action) => {
  if (action.type === "password changed") {
    return { value: action.value, isValid: action.value.trim().length >= 8 };
  }
  if (action.type === "validate_password") {
    return {
      value: prevState.value,
      isValid: prevState.value.trim().length >= 8,
    };
  }
  return { value: "", isValid: null };
};

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [AccountVerif, setAccountVerif] = useState();
  const [incorrectCredentials, setincorrectCredentials] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const year = new Date().getFullYear();

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [emailphoneState, dispatchemailphone] = useReducer(emailphoneReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const [formIsValid, setFormIsValid] = useState();
  const { isValid: emailphoneIsValid } = emailphoneState;
  const { isValid: passwordIsValid } = passwordState;

  const snackbarShownRef = useRef(new Set());

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const activation = queryParams.get("activation");
    const changed = queryParams.get("changed");
    const error = queryParams.get("error");

    if (error) {
      if (!snackbarShownRef.current.has(error)) {
        if (error === "email_error") {
          enqueueSnackbar("Email in use!");
          navigate("/login", { replace: true });
        } else if (error === "authentication_failed") {
          enqueueSnackbar("Authentication failed!");
          navigate("/login", { replace: true });
        } else if (error === "login_failed") {
          enqueueSnackbar("Login failed!");
          navigate("/login", { replace: true });
        }
        snackbarShownRef.current.add(error);
      }
    }

    if (activation) {
      if (!snackbarShownRef.current.has(activation)) {
        if (activation === "fail") {
          enqueueSnackbar("Link expired, sign up again");

          navigate("/signup", { replace: true });
        } else if (activation === "success") {
          enqueueSnackbar("Your account is activated! You may now Login.");
          navigate("/login", { replace: true });
        }
        snackbarShownRef.current.add(activation);
      }
    }

    if (changed === "true") {
      if (!snackbarShownRef.current.has("changed")) {
        enqueueSnackbar("Password saved");
        navigate("/login", { replace: true });

        snackbarShownRef.current.add("changed");
      }
    }
  }, [location.search, enqueueSnackbar, navigate]);
  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(emailphoneIsValid && passwordIsValid);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [emailphoneIsValid, passwordIsValid]);

  const emailphoneChangeHandler = (event) => {
    setincorrectCredentials();
    setAccountVerif();
    dispatchemailphone({
      type: "Email/phone changed",
      value: event.target.value.toLowerCase(),
    });
  };

  const passwordChangeHandler = (event) => {
    setincorrectCredentials();
    setAccountVerif();
    dispatchPassword({ type: "password changed", value: event.target.value });
  };

  const validateEmailPhoneHandler = () => {
    dispatchemailphone({ type: "validate_email/phone" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "validate_password" });
  };

  const clearInput = (dispatchFunction, actionType) => {
    dispatchFunction({ type: actionType, value: "" });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const req = {
      cred: emailphoneState.value,
      Password: passwordState.value,
    };
    try {
      const response = await axios.post(
        import.meta.env.VITE_HOST + "/login",
        req,
        {
          withCredentials: true,
        }
      );
      if (response.data.user.Status) {
        setAuth({
          user: response.data.user,
          accessToken: response.data.accessToken,
        });
        enqueueSnackbar("Welcome to Maharati");
        sessionStorage.setItem("session", true);
        navigate(from, { replace: true });
      } else {
        setAccountVerif(false);
        enqueueSnackbar("Please check your email and activate your account");
      }
    } catch (error) {
      setincorrectCredentials(true);
      // enqueueSnackbar("Incorrect User credentials");
      console.log(error);
    }
  };

  const signInWithFacebook = () => {
    window.open(
      `${import.meta.env.VITE_HOST}/auth/facebook/callback?from=${from}`,
      "_self"
    );
  };

  const signInWithGoogle = () => {
    window.open(
      `${import.meta.env.VITE_HOST}/auth/google/callback?from=${from}`,
      "_self"
    );
  };
  const signInWithGithub = () => {
    window.open(
      `${import.meta.env.VITE_HOST}/auth/github/callback?from=${from}`,
      "_self"
    );
  };
  const signInWithLinkedIn = () => {
    window.open(
      `${import.meta.env.VITE_HOST}/auth/linkedin/callback?from=${from}`,
      "_self"
    );
  };
  return (
    <section>
      <div>
        <div className="row justify-content-center">
          <div className="col-lg-10 m-5">
            <div>
              <div>
                <div className="row ">
                  <div className="col-xxl-5 mx-auto">
                    <div>
                      <div className="card-body ">
                        <div className="text-center mt-5">
                          <h1>Welcome Back</h1>
                          <p className="text-muted">Sign in to Maharati.</p>
                        </div>
                        <div className="p-2 mt-5">
                          <form onSubmit={submitHandler}>
                            <div className="mb-5">
                              <div
                                className="error"
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  padding: "1rem",
                                }}
                              >
                                {incorrectCredentials && (
                                  <div style={{ color: "red" }}>
                                    Incorrect User credentials
                                  </div>
                                )}
                              </div>
                              <div className="input-group">
                                <span
                                  className="input-group-text"
                                  id="basic-addon"
                                >
                                  <i className="ri-user-3-line"></i>
                                </span>
                                <input
                                  type="text"
                                  required={true}
                                  autoComplete="on"
                                  name="cred"
                                  id="cred"
                                  placeholder="Email/Phone number"
                                  value={emailphoneState.value}
                                  onChange={emailphoneChangeHandler}
                                  onBlur={validateEmailPhoneHandler}
                                  className="form-control"
                                  style={{
                                    borderColor:
                                      incorrectCredentials === true ||
                                      AccountVerif === false
                                        ? "red"
                                        : undefined,
                                  }}
                                />
                                <span className="placeholder-title">
                                  Email/Phone number
                                </span>
                                {/* {emailphoneState.value && (
                                  <i
                                    className="clear-button fa-solid fa-x"
                                    onClick={() =>
                                      clearInput(
                                        dispatchemailphone,
                                        "Email/phone changed"
                                      )
                                    }
                                  />
                                )} */}
                              </div>
                            </div>
                            <div className="mb-3 ">
                              <div className="input-group">
                                <span
                                  className="input-group-text"
                                  id="basic-addon1"
                                >
                                  <i className="ri-lock-2-line"></i>
                                </span>
                                <input
                                  type={showPassword ? "text" : "password"}
                                  autoComplete="on"
                                  required={true}
                                  name="password"
                                  id="password"
                                  placeholder="Password"
                                  value={passwordState.value}
                                  onChange={passwordChangeHandler}
                                  onBlur={validatePasswordHandler}
                                  className="form-control "
                                  style={{
                                    borderColor:
                                      incorrectCredentials === true ||
                                      AccountVerif === false
                                        ? "red"
                                        : undefined,
                                  }}
                                />
                                <span className="placeholder-title">
                                  Password
                                </span>
                              </div>
                            </div>

                            <div className="form-group">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="rememberlogin"
                                  id="rememberlogin"
                                  checked={persist}
                                  onChange={(e) => setPersist(e.target.checked)}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="rememberlogin"
                                >
                                  Remember me
                                </label>
                              </div>
                              <a
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleScrollUp();
                                  navigate("/forgot-password");
                                }}
                                className="forgot-password-link"
                              >
                                Forgot password?
                              </a>
                            </div>
                            <div className="mt-4">
                              <button
                                className="btn btn-primary w-100"
                                type="submit"
                                disabled={!formIsValid}
                              >
                                Sign In
                              </button>
                            </div>
                            <div className="mt-4 pt-2 text-center">
                              <div className="signin-other-title position-relative">
                                <h5 className="fs-sm mb-4 title">
                                  Sign In with
                                </h5>
                              </div>
                              <div className="pt-2 hstack gap-2 justify-content-center">
                                <button
                                  type="button"
                                  onClick={signInWithFacebook}
                                  className="btn btn-subtle-primary btn-icon"
                                >
                                  <i className="ri-facebook-fill fs-lg"></i>
                                </button>
                                <button
                                  type="button"
                                  onClick={signInWithGoogle}
                                  className="btn btn-subtle-danger btn-icon"
                                >
                                  <i className="ri-google-fill fs-lg"></i>
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-subtle-dark btn-icon"
                                  onClick={signInWithGithub}
                                >
                                  <i className="ri-github-fill fs-lg"></i>
                                </button>
                                <button
                                  type="button"
                                  onClick={signInWithLinkedIn}
                                  className="btn btn-subtle-info btn-icon"
                                >
                                  <i className="ri-linkedin-fill fs-lg"></i>
                                </button>
                              </div>
                            </div>
                          </form>
                          <div className="text-center mt-5">
                            <p className="mb-1">Don't have an account yet?</p>
                            <a
                              onClick={(e) => {
                                e.preventDefault();
                                handleScrollUp();
                                navigate("/signup");
                              }}
                              className="forgot-password-link"
                            >
                              Create an account
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-5">
                    <div
                      className="card auth-card h-100 border-0 shadow-none d-none d-sm-block mb-0"
                      style={{
                        background: `url(${signinBg}) center no-repeat`,
                        backgroundSize: "cover",
                      }}
                    >
                      <div className="card-body py-5 d-flex justify-content-between flex-column">
                        <div className="text-center">
                          <h5 className="text-white">Nice to see you again</h5>
                          <p className="text-white opacity-75">
                            Enter your details and start your journey with us.
                          </p>
                        </div>
                        <div className="auth-effect-main my-5 position-relative rounded-circle d-flex align-items-center justify-content-center mx-auto">
                          <div className="auth-user-list list-unstyled">
                            <img src={signin} alt="" className="img-fluid" />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-white opacity-75 mb-0 mt-3">
                            &copy; {year} Maharati. Crafted with{" "}
                            <i className="mdi mdi-heart text-danger"></i> by
                            Profeel interns
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
