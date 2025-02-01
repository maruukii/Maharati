import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../login/login.scss";
import { useSnackbar } from "notistack";
import { useLocation, useNavigate } from "react-router-dom";

import signin from "../../assets/images/auth/signin.png";
import signinBg from "../../assets/images/auth/signin-bg.png";
const EmailVerification = () => {
  const { enqueueSnackbar } = useSnackbar();
  const snackbarShownRef = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [emailstate, setEmailstate] = useState();
  const [found, setfound] = useState();
  const year = new Date().getFullYear();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const expire = queryParams.get("token");

    if (expire === "expired" && !snackbarShownRef.current) {
      enqueueSnackbar("token expired, try again");
      snackbarShownRef.current = true;
    }
  }, [location.search, enqueueSnackbar]);

  const emailChangeHandler = (event) => {
    const newValue = event.target.value;

    const trimmedValue = newValue.replace(/\s+/g, "");

    setEmailstate(trimmedValue.toLowerCase());
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        import.meta.env.VITE_HOST + `/forgot-password/${emailstate}`
      );
      if (response.data) {
        setfound(true);
        {
          enqueueSnackbar("Password reset mail sent successfully !");
        }
        // Set flag in local storage
        localStorage.setItem("passwordChanged", "false");
        navigate("/login", { replace: true });
      }
    } catch (error) {
      setfound(false);
      {
        enqueueSnackbar("Wrong Email, try again");
      }
    }
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
                          <h1>Password reset</h1>
                          <p className="text-muted">
                            To reset your password, you need to provide us with
                            your email. <br />A password reset link will be sent
                            to your email after verifying it.{" "}
                          </p>
                        </div>
                        <div className="p-2 mt-5">
                          <form onSubmit={submitHandler}>
                            <div className="mb-3">
                              <div className="input-group">
                                <span
                                  className="input-group-text"
                                  id="basic-addon"
                                >
                                  <i className="ri-user-3-line"></i>
                                </span>
                                <input
                                  className="form-control"
                                  type="Email"
                                  required={true}
                                  autoComplete="off"
                                  name="email"
                                  id="email"
                                  placeholder="Email"
                                  value={emailstate}
                                  onChange={emailChangeHandler}
                                  style={{
                                    borderColor:
                                      found === true
                                        ? "green"
                                        : found === false && emailstate !== null
                                        ? "red"
                                        : undefined,
                                  }}
                                />
                              </div>
                            </div>

                            <div className="mt-4">
                              <button
                                className="btn  w-100"
                                style={{ backgroundColor: "#ffcc33" }}
                                type="submit"
                              >
                                Verify
                              </button>
                            </div>
                          </form>
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
                            &copy; {year} Vixon. Crafted with{" "}
                            <i className="ti ti-heart-filled text-danger"></i>{" "}
                            by Themesbrand
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

export default EmailVerification;
