import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import "./signup.scss";
import { useNavigate, useLocation } from "react-router-dom";
import signin from "../../assets/images/auth/signin.png";
import signinBg from "../../assets/images/auth/signin-bg.png";
const emailReducer = (prevState, action) => {
  if (action.type === "Email changed") {
    return {
      value: action.value,
      isValid: action.value.includes("@") && action.value.includes("."),
    };
  }
  if (action.type === "validate_email") {
    return {
      value: prevState.value,
      isValid: prevState.value.includes("@") && prevState.value.includes("."),
    };
  }
  return { value: "", isValid: null };
};

const phoneReducer = (prevState, action) => {
  if (action.type === "Phone number changed") {
    return {
      value: action.value,
      isValid:
        !isNaN(action.value) &&
        action.value > 0 &&
        !action.value.startsWith("0") &&
        action.value > 10000000 &&
        action.value < 99999999,
    };
  }
  if (action.type === "validate_phone") {
    return {
      value: prevState.value,
      isValid:
        !isNaN(prevState.value) &&
        prevState.value > 0 &&
        !prevState.value.startsWith("0") &&
        prevState.value > 10000000 &&
        prevState.value < 99999999,
    };
  }
  return { value: "", isValid: null };
};

const firstnameReducer = (prevState, action) => {
  if (action.type === "First name changed") {
    return { value: action.value, isValid: action.value.trim().length >= 3 };
  }
  if (action.type === "validate_firstname") {
    return {
      value: prevState.value,
      isValid: prevState.value.trim().length >= 3,
    };
  }
  return { value: "", isValid: null };
};

const lastnameReducer = (prevState, action) => {
  if (action.type === "Last name changed") {
    return { value: action.value, isValid: action.value.trim().length >= 3 };
  }
  if (action.type === "validate_lastname") {
    return {
      value: prevState.value,
      isValid: prevState.value.trim().length >= 3,
    };
  }
  return { value: "", isValid: null };
};

const passwordReducer = (prevState, action) => {
  const validatePassword = (password) => {
    const lengthValid = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

    return lengthValid && hasUppercase && hasNumber && hasSpecialChar;
  };

  if (action.type === "Password changed") {
    return {
      value: action.value,
      isValid: validatePassword(action.value),
    };
  }

  if (action.type === "validate_password") {
    return {
      value: prevState.value,
      isValid: validatePassword(prevState.value),
    };
  }

  return { value: "", isValid: null };
};

const confirmPasswordReducer = (prevState, action) => {
  if (action.type === "Confirm password changed") {
    return { value: action.value, isValid: action.value === action.password };
  }
  if (action.type === "validate_confirm_password") {
    return {
      value: prevState.value,
      isValid: prevState.value === action.password,
    };
  }
  return { value: "", isValid: null };
};

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [phoneState, dispatchPhone] = useReducer(phoneReducer, {
    value: "",
    isValid: null,
  });
  const [firstnameState, dispatchFirstname] = useReducer(firstnameReducer, {
    value: "",
    isValid: null,
  });
  const [lastnameState, dispatchLastname] = useReducer(lastnameReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const [confirmPasswordState, dispatchConfirmPassword] = useReducer(
    confirmPasswordReducer,
    { value: "", isValid: null }
  );
  const [EmailUsed, setEmailUsed] = useState(false);
  const [PhoneUsed, setPhoneUsed] = useState(false);

  const [formIsValid, setFormIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { isValid: emailIsValid } = emailState;
  const { isValid: phoneIsValid } = phoneState;
  const { isValid: firstnameIsValid } = firstnameState;
  const { isValid: lastnameIsValid } = lastnameState;
  const { isValid: passwordIsValid } = passwordState;
  const { isValid: confirmPasswordIsValid } = confirmPasswordState;
  const year = new Date().getFullYear();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(
        emailIsValid &&
          passwordIsValid &&
          phoneIsValid &&
          firstnameIsValid &&
          lastnameIsValid &&
          confirmPasswordIsValid
      );
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [
    emailIsValid,
    passwordIsValid,
    firstnameIsValid,
    lastnameIsValid,
    phoneIsValid,
    confirmPasswordIsValid,
  ]);

  const emailChangeHandler = (event) => {
    setEmailUsed(false);
    const newValue = event.target.value;

    const trimmedValue = newValue.replace(/\s+/g, "");

    dispatchEmail({ type: "Email changed", value: trimmedValue.toLowerCase() });
  };

  const firstnameChangeHandler = (event) => {
    dispatchFirstname({
      type: "First name changed",
      value: event.target.value,
    });
  };

  const lastnameChangeHandler = (event) => {
    dispatchLastname({ type: "Last name changed", value: event.target.value });
  };

  const phoneChangeHandler = (event) => {
    setPhoneUsed(false);
    const value = event.target.value;
    if (!isNaN(value) && value > 0 && !value.startsWith("0")) {
      dispatchPhone({ type: "Phone number changed", value });
    } else {
      dispatchPhone({ type: "Phone number changed", value: "" });
    }
  };

  const passwordChangeHandler = (event) => {
    const newValue = event.target.value;

    const trimmedValue = newValue.replace(/\s+/g, "");

    dispatchPassword({ type: "Password changed", value: trimmedValue });
  };

  const confirmPasswordChangeHandler = (event) => {
    const newValue = event.target.value;

    const trimmedValue = newValue.replace(/\s+/g, "");

    dispatchConfirmPassword({
      type: "Confirm password changed",
      value: trimmedValue,
      password: passwordState.value,
    });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "validate_email" });
  };

  const validatePhoneHandler = () => {
    dispatchPhone({ type: "validate_phone" });
  };

  const validateFirstnameHandler = () => {
    dispatchFirstname({ type: "validate_firstname" });
  };

  const validateLastnameHandler = () => {
    dispatchLastname({ type: "validate_lastname" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "validate_password" });
  };

  const validateConfirmPasswordHandler = () => {
    dispatchConfirmPassword({
      type: "validate_confirm_password",
      password: passwordState.value,
    });
  };

  const clearInput = (dispatchFunction, actionType) => {
    dispatchFunction({ type: actionType, value: "" });
  };
  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const emailUsed = await axios.get(
        import.meta.env.VITE_HOST + `/users/email/${emailState.value.trim()}`
      );
      if (emailUsed.data) {
        setEmailUsed(true);
        throw new Error("Email Used");
      }
      setEmailUsed(false);
      const phoneUsed = await axios.get(
        import.meta.env.VITE_HOST + `/users/phone/${phoneState.value.trim()}`
      );
      if (phoneUsed.data) {
        setPhoneUsed(true);
        throw new Error("Phone Used");
      }
      setPhoneUsed(false);
      const req = {
        Email: emailState.value.trim(),
        FirstName: firstnameState.value.trim(),
        LastName: lastnameState.value.trim(),
        PhoneNumber: phoneState.value.trim(),
        Password: passwordState.value,
      };

      const response = await axios.post(
        import.meta.env.VITE_HOST + "/signup",
        req
      );
      if (response.data) {
        localStorage.setItem("email", req.Email);
        const request = {
          user: response.data.user,
          token: response.data.token,
        };
        const res = await axios.post(
          import.meta.env.VITE_HOST + "/activate",
          request
        );
        handleScrollUp();
        setTimeout(() => {
          navigate("/account-activation");
        }, 300);
      }
    } catch (error) {
      console.error("Caught an error:", error.message);
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
                  <div className="col-xxl-7 ">
                    <div>
                      <div>
                        <div className="text-center mt-3">
                          <h1>Get Started</h1>
                          <p className="text-muted">
                            Get your free Profeel account now
                          </p>
                        </div>
                        <div className=" mt-1">
                          <form onSubmit={submitHandler}>
                            <div className="row mb-3">
                              <div className="col-md-6">
                                <div className="input-group">
                                  <span
                                    className="input-group-text"
                                    id="basic-addon"
                                  >
                                    <i className="ri-user-3-line"></i>
                                  </span>
                                  <input
                                    type="text"
                                    autoComplete="off"
                                    name="firstname"
                                    id="firstname"
                                    placeholder="First name"
                                    value={firstnameState.value}
                                    onChange={firstnameChangeHandler}
                                    onBlur={validateFirstnameHandler}
                                    className="form-control"
                                    style={{
                                      borderColor:
                                        firstnameIsValid === true
                                          ? "green"
                                          : firstnameIsValid === false &&
                                            firstnameState.value
                                          ? "red"
                                          : undefined,
                                    }}
                                  />
                                  <span className="placeholder-title">
                                    First name
                                  </span>
                                  {firstnameState.value && (
                                    <i
                                      className="clear-button fa-solid fa-x"
                                      onClick={() =>
                                        clearInput(
                                          dispatchFirstname,
                                          "First name changed"
                                        )
                                      }
                                    />
                                  )}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="input-group">
                                  <span
                                    className="input-group-text"
                                    id="basic-addon1"
                                  >
                                    <i className="ri-user-3-line"></i>
                                  </span>
                                  <input
                                    type="text"
                                    autoComplete="off"
                                    name="lastname"
                                    id="lastname"
                                    placeholder="Last name"
                                    value={lastnameState.value}
                                    onChange={lastnameChangeHandler}
                                    onBlur={validateLastnameHandler}
                                    className="form-control"
                                    style={{
                                      borderColor:
                                        lastnameIsValid === true
                                          ? "green"
                                          : lastnameIsValid === false &&
                                            lastnameState.value
                                          ? "red"
                                          : undefined,
                                    }}
                                  />
                                  <span className="placeholder-title">
                                    Last name
                                  </span>
                                  {lastnameState.value && (
                                    <i
                                      className="clear-button fa-solid fa-x"
                                      onClick={() =>
                                        clearInput(
                                          dispatchLastname,
                                          "Last name changed"
                                        )
                                      }
                                    />
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="row mb-3">
                              <div className="col-md-6">
                                <div className="input-group">
                                  <span
                                    className="input-group-text"
                                    id="basic-addon"
                                  >
                                    <i className="ri-mail-line"></i>
                                  </span>
                                  <input
                                    type="email"
                                    autoComplete="off"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    value={emailState.value}
                                    onChange={emailChangeHandler}
                                    onBlur={validateEmailHandler}
                                    className="form-control"
                                    style={{
                                      borderColor:
                                        (emailIsValid === false &&
                                          emailState.value) ||
                                        EmailUsed === true
                                          ? "red"
                                          : emailIsValid === true
                                          ? "green"
                                          : undefined,
                                    }}
                                  />
                                  <span className="placeholder-title">
                                    Email
                                  </span>
                                  {emailState.value && (
                                    <i
                                      className="clear-button fa-solid fa-x"
                                      onClick={() =>
                                        clearInput(
                                          dispatchEmail,
                                          "Email changed"
                                        )
                                      }
                                    />
                                  )}
                                </div>
                                {EmailUsed && (
                                  <div className="acceptance">
                                    <ul>
                                      <li
                                        style={{
                                          color:
                                            EmailUsed === true
                                              ? "red"
                                              : undefined,
                                        }}
                                      >
                                        This Email is used
                                      </li>
                                    </ul>
                                  </div>
                                )}
                              </div>
                              <div className="col-md-6">
                                <div className="input-group">
                                  <span
                                    className="input-group-text"
                                    id="basic-addon"
                                  >
                                    <i className="ri-phone-line"></i>
                                  </span>
                                  <input
                                    type="number"
                                    autoComplete="off"
                                    name="phone"
                                    id="phone"
                                    min={0}
                                    placeholder="Phone number"
                                    value={phoneState.value}
                                    onChange={phoneChangeHandler}
                                    onBlur={validatePhoneHandler}
                                    className="form-control"
                                    style={{
                                      borderColor:
                                        (phoneIsValid === false &&
                                          phoneState.value) ||
                                        PhoneUsed === true
                                          ? "red"
                                          : phoneIsValid === true
                                          ? "green"
                                          : undefined,
                                    }}
                                  />
                                  <span className="placeholder-title">
                                    Phone number
                                  </span>
                                  {phoneState.value && (
                                    <i
                                      className="clear-button fa-solid fa-x"
                                      onClick={() =>
                                        clearInput(
                                          dispatchPhone,
                                          "Phone number changed"
                                        )
                                      }
                                    />
                                  )}
                                </div>
                                {PhoneUsed && (
                                  <div className="acceptance">
                                    <ul>
                                      <li
                                        style={{
                                          color:
                                            PhoneUsed === true
                                              ? "red"
                                              : undefined,
                                        }}
                                      >
                                        This Phone number is used
                                      </li>
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6">
                                <div className="input-group">
                                  <span
                                    className="input-group-text"
                                    id="basic-addon1"
                                  >
                                    <i className="ri-lock-2-line"></i>
                                  </span>
                                  <input
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="off"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    value={passwordState.value}
                                    onChange={passwordChangeHandler}
                                    onBlur={validatePasswordHandler}
                                    className="form-control"
                                    style={{
                                      borderColor:
                                        passwordIsValid === true
                                          ? "green"
                                          : passwordIsValid === false &&
                                            passwordState.value
                                          ? "red"
                                          : undefined,
                                    }}
                                  />
                                  <span className="placeholder-title">
                                    Password
                                  </span>
                                </div>
                                <div style={{ margin: "10px 0px 0px 25px" }}>
                                  <ul>
                                    <li
                                      style={{
                                        color:
                                          passwordState.value.trim().length >= 8
                                            ? "green"
                                            : undefined,
                                      }}
                                    >
                                      Must be at least 8 characters
                                    </li>
                                    <li
                                      style={{
                                        color: /[A-Z]/.test(passwordState.value)
                                          ? "green"
                                          : undefined,
                                      }}
                                    >
                                      Must contain at least 1 uppercase
                                    </li>
                                    <li
                                      style={{
                                        color: /[0-9]/.test(passwordState.value)
                                          ? "green"
                                          : undefined,
                                      }}
                                    >
                                      Must contain at least 1 number
                                    </li>
                                    <li
                                      style={{
                                        color: /[^A-Za-z0-9]/.test(
                                          passwordState.value
                                        )
                                          ? "green"
                                          : undefined,
                                      }}
                                    >
                                      Must contain at least 1 special character
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="input-group">
                                  <span
                                    className="input-group-text"
                                    id="basic-addon"
                                  >
                                    <i className="ri-lock-2-line"></i>
                                  </span>
                                  <input
                                    type={
                                      showConfirmPassword ? "text" : "password"
                                    }
                                    autoComplete="off"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={confirmPasswordState.value}
                                    onChange={confirmPasswordChangeHandler}
                                    onBlur={validateConfirmPasswordHandler}
                                    className="form-control"
                                    style={{
                                      borderColor:
                                        confirmPasswordIsValid === true &&
                                        passwordIsValid
                                          ? "green"
                                          : confirmPasswordIsValid === false &&
                                            confirmPasswordState.value
                                          ? "red"
                                          : undefined,
                                    }}
                                  />
                                  <span className="placeholder-title">
                                    Confirm Password
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="">
                              <p className="mb-0 fs-sm text-muted fst-italic">
                                By registering you agree to the Vixon{" "}
                                <a
                                  routerLink="/pages/term-conditions"
                                  className="text-primary text-decoration-underline fst-normal fw-medium"
                                >
                                  Terms of Use
                                </a>
                              </p>
                            </div>

                            <div className="mt-2">
                              <button
                                className="btn btn-primary "
                                type="submit"
                                disabled={!formIsValid}
                              >
                                Sign Up
                              </button>
                            </div>
                            <div className="mt-2 pt-2 text-center">
                              <div className="signin-other-title position-relative">
                                <h5 className="fs-sm mb-4 title">
                                  Create account with
                                </h5>
                              </div>
                              <div className=" hstack gap-2 justify-content-center">
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
                                  onClick={signInWithGithub}
                                  className="btn btn-subtle-dark btn-icon"
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
                          <div className="text-center mt-2 mb-3">
                            <p className="mb-1">Already have an account ?</p>
                            <a
                              onClick={(e) => {
                                e.preventDefault();
                                handleScrollUp();
                                navigate("/login");
                              }}
                              className="forgot-password-link"
                            >
                              Sign In
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-5">
                    <div
                      className="border-0 shadow-none d-none d-sm-block mb-0"
                      style={{
                        background: `url(${signinBg}) center no-repeat`,
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

export default Signup;
