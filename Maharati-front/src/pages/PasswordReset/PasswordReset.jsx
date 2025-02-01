import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { replace, useNavigate, useSearchParams } from "react-router-dom";

const newPasswordReducer = (prevState, action) => {
  const validateNewPassword = (password) => {
    const lengthValid = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

    return lengthValid && hasUppercase && hasNumber && hasSpecialChar;
  };

  if (action.type === "Password changed") {
    return {
      value: action.value,
      isValid: validateNewPassword(action.value),
    };
  }

  if (action.type === "validate_password") {
    return {
      value: prevState.value,
      isValid: validateNewPassword(prevState.value),
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

const PasswordReset = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newPasswordState, dispatchNewPassword] = useReducer(
    newPasswordReducer,
    { value: "", isValid: null }
  );
  const [confirmPasswordState, dispatchConfirmPassword] = useReducer(
    confirmPasswordReducer,
    { value: "", isValid: null }
  );

  const [formIsValid, setFormIsValid] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const id = searchParams.get("id");
  useEffect(() => {
    if (!id) {
      navigate("/login");
    }

    if (localStorage.getItem("passwordChanged") === "true") {
      navigate("/login", { replace: true });
    }
  }, [id, navigate]);

  const { isValid: newPasswordIsValid } = newPasswordState;
  const { isValid: confirmPasswordIsValid } = confirmPasswordState;

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(newPasswordIsValid && confirmPasswordIsValid);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [newPasswordIsValid, confirmPasswordIsValid]);

  const newPasswordChangeHandler = (event) => {
    const newValue = event.target.value;

    const trimmedValue = newValue.replace(/\s+/g, "");

    dispatchNewPassword({ type: "Password changed", value: trimmedValue });
  };

  const confirmPasswordChangeHandler = (event) => {
    const newValue = event.target.value;

    const trimmedValue = newValue.replace(/\s+/g, "");

    dispatchConfirmPassword({
      type: "Confirm password changed",
      value: trimmedValue,
      password: newPasswordState.value,
    });
  };

  const validateNewPasswordHandler = () => {
    dispatchNewPassword({ type: "validate_password" });
  };

  const validateConfirmPasswordHandler = () => {
    dispatchConfirmPassword({
      type: "validate_confirm_password",
      password: newPasswordState.value,
    });
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prevShowNewPassword) => !prevShowNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const req = {
        Password: newPasswordState.value,
        id: id,
      };
      handleScrollUp();
      const response = await axios.put(
        import.meta.env.VITE_HOST + "/change-password",
        req
      );
      // Set flag in local storage
      localStorage.setItem("passwordChanged", "true");

      // Redirect to login and remove reset page from history
      navigate("/login?changed=true", { replace: true });
    } catch (error) {
      console.error("Caught an error:", error);
    }
  };

  return (
    <div>
      <section className="space-top space-extra-bottom">
        <div className="container">
          <div className="row gx-60">
            <div className="col-lg-6">
              <div className="form-style4 signup">
                <h2 className="form-title">Password reset</h2>
                <form onSubmit={submitHandler}>
                  <div className="form-group" style={{ marginBottom: "2rem" }}>
                    <div className="input-wrapper">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        autoComplete="off"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={newPasswordState.value}
                        onChange={newPasswordChangeHandler}
                        onBlur={validateNewPasswordHandler}
                        style={{
                          borderColor:
                            newPasswordIsValid === true
                              ? "green"
                              : newPasswordIsValid === false &&
                                newPasswordState.value
                              ? "red"
                              : undefined,
                        }}
                      />

                      <span className="placeholder-title">New password</span>
                      {showNewPassword ? (
                        <i
                          className="toggle-button fa-solid fa-eye"
                          onClick={toggleNewPasswordVisibility}
                        />
                      ) : (
                        <i
                          className="toggle-button fa-solid fa-eye-slash"
                          onClick={toggleNewPasswordVisibility}
                        />
                      )}
                    </div>
                    <div className="acceptance">
                      <ul>
                        <li
                          style={{
                            color:
                              newPasswordState.value.trim().length >= 8
                                ? "green"
                                : undefined,
                          }}
                        >
                          Must be at least 8 characters
                        </li>
                        <li
                          style={{
                            color: /[A-Z]/.test(newPasswordState.value)
                              ? "green"
                              : undefined,
                          }}
                        >
                          Must contain at least 1 uppercase
                        </li>
                        <li
                          style={{
                            color: /[0-9]/.test(newPasswordState.value)
                              ? "green"
                              : undefined,
                          }}
                        >
                          Must contain at least 1 number
                        </li>
                        <li
                          style={{
                            color: /[^A-Za-z0-9]/.test(newPasswordState.value)
                              ? "green"
                              : undefined,
                          }}
                        >
                          Must contain at least 1 special character
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: "2rem" }}>
                    <div className="input-wrapper">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="off"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        value={confirmPasswordState.value}
                        onChange={confirmPasswordChangeHandler}
                        onBlur={validateConfirmPasswordHandler}
                        style={{
                          borderColor:
                            confirmPasswordIsValid === true &&
                            newPasswordIsValid
                              ? "green"
                              : confirmPasswordIsValid === false &&
                                confirmPasswordState.value
                              ? "red"
                              : undefined,
                        }}
                      />

                      <span className="placeholder-title">
                        Confirm password
                      </span>
                      {showConfirmPassword ? (
                        <i
                          className="toggle-button fa-solid fa-eye"
                          onClick={toggleConfirmPasswordVisibility}
                        />
                      ) : (
                        <i
                          className="toggle-button fa-solid fa-eye-slash"
                          onClick={toggleConfirmPasswordVisibility}
                        />
                      )}
                    </div>
                  </div>

                  <div
                    className="form-group"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <button
                      type="submit"
                      className="vs-btn"
                      style={{ fontSize: "1.3rem" }}
                      disabled={!formIsValid}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PasswordReset;
