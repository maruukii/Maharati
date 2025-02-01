import React, { useState, useReducer, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
//i18n
import { withTranslation } from "react-i18next";
// Redux
import { connect } from "react-redux";
import withRouter from "../../components/Common/withRouter";
import useAuth from "../../hooks/useAuth";
import { editProfile as oneditProfile } from "../../store/actions";
import girlAvatar from "../../assets/images/users/female.jpg";
import guyAvatar from "../../assets/images/users/male.jpg";
import { useSnackbar } from "notistack";
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
const UserProfile = (props) => {
  document.title = "Profile | Maharati";
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { auth } = useAuth();
  const TnStates = [
    "Tunis",
    "Sfax",
    "Sousse",
    "Bizerte",
    "Kairouan",
    "Gabès",
    "Ariana",
    "Gafsa",
    "Kasserine",
    "Monastir",
    "Medenine",
    "Tataouine",
    "Ben Arous",
    "Béja",
    "Mahdia",
    "Sidi Bouzid",
    "Nabeul",
    "Jendouba",
    "Tozeur",
    "El Kef",
    "Kebili",
    "Siliana",
    "Manouba",
    "Zaghouan",
  ];
  const [gender, setGender] = useState(auth?.user?.Gender || "N/D");
  const [learningLanguage, setLearningLanguage] = useState(
    auth?.user?.LearningLanguage || ""
  );
  const [dateofBirth, setDateofBirth] = useState(
    auth?.user?.DateofBirth !== undefined
      ? auth?.user?.DateofBirth.split("T")[0]
      : null
  );
  const [address, setAddress] = useState({
    street: auth?.user?.Address?.street || "",
    city: auth?.user?.Address?.city || "",
    state: auth?.user?.Address?.state || "",
    zipCode: auth?.user?.Address?.zipCode || "",
  });
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: auth?.user?.Email,
    isValid: null,
  });
  const [phoneState, dispatchPhone] = useReducer(phoneReducer, {
    value: auth?.user?.PhoneNumber,
    isValid: null,
  });
  const [firstnameState, dispatchFirstname] = useReducer(firstnameReducer, {
    value: auth?.user?.FirstName,
    isValid: null,
  });
  const [lastnameState, dispatchLastname] = useReducer(lastnameReducer, {
    value: auth?.user?.LastName,
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
  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(
        emailIsValid &&
          // passwordIsValid &&
          phoneIsValid &&
          firstnameIsValid &&
          lastnameIsValid
        // confirmPasswordIsValid
      );
    }, 10);
    return () => {
      clearTimeout(timer);
    };
  }, [
    emailIsValid,
    phoneIsValid,
    firstnameIsValid,
    lastnameIsValid,
    // phoneIsValid,
    // confirmPasswordIsValid,
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
  useEffect(() => {
    validateFirstnameHandler();
    validateLastnameHandler();
    validatePhoneHandler();
    validateEmailHandler();
  }, []);
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

  const clearInput = (dispatchFunction, actionType, name) => {
    dispatchFunction({ type: actionType, value: auth?.user?.[name] });
  };
  // Initialize form data

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleSubmit = async (e) => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    e.preventDefault();
    try {
      let emailUsed = false;
      let phoneUsed = false;

      const emailCheckPromise = (async () => {
        if (auth?.user?.Email !== emailState.value) {
          const emailResponse = await axios.get(
            import.meta.env.VITE_HOST +
              `/users/email/${emailState.value.trim()}`
          );
          if (emailResponse.data) {
            emailUsed = true;
          }
        }
      })();

      const phoneCheckPromise = (async () => {
        if (auth?.user?.PhoneNumber !== phoneState.value) {
          const phoneResponse = await axios.get(
            import.meta.env.VITE_HOST +
              `/users/phone/${phoneState.value.trim()}`
          );
          if (phoneResponse.data) {
            phoneUsed = true;
          }
        }
      })();

      await Promise.all([emailCheckPromise, phoneCheckPromise]);
      await delay(500);

      if (emailUsed) {
        setEmailUsed(true);
      }
      if (phoneUsed) {
        setPhoneUsed(true);
      }

      if (emailUsed || phoneUsed) {
        throw new Error("Email or Phone number already used");
      }
      setEmailUsed(false);
      setPhoneUsed(false);
      const updatedData = {
        _id: auth?.user?._id,
        Email: emailState.value.trim(),
        Gender: gender,
        DateofBirth: dateofBirth,
        LearningLanguage: learningLanguage,
        Address: address,
        FirstName: firstnameState.value.trim(),
        LastName: lastnameState.value.trim(),
        PhoneNumber: phoneState.value.trim(),
        Password: passwordState.value,
      };
      dispatch(oneditProfile(updatedData, auth?.accessToken));
      enqueueSnackbar("Profile changes saved!");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <React.Fragment>
      <div className="mdk-drawer-layout__content page m-5">
        <div className="container-fluid page__container mt-5">
          <form onSubmit={handleSubmit}>
            <div className="text-center">
              <img
                src={gender === "Female" ? girlAvatar : guyAvatar}
                alt="User Avatar"
                className="rounded-circle mt-5"
                style={{ height: "6rem" }}
              />

              <h1 className="h2 mb-0 mt-1">
                {firstnameState.value} {lastnameState.value}
              </h1>
              <div className="badge-primary mb-3">
                {props.t(auth?.user.Role)}
              </div>
            </div>

            <section className="mb-4">
              <hr className="my-4" />

              <h3>{props.t("Personal Information")} </h3>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="form-group row">
                    <label
                      htmlFor="FirstName"
                      className="col-md-4 col-form-label"
                    >
                      {props.t("First name")}
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        autoComplete="off"
                        name="firstname"
                        id="firstname"
                        className="form-control"
                        value={firstnameState.value}
                        onChange={firstnameChangeHandler}
                        onBlur={validateFirstnameHandler}
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
                      {/* {firstnameState.value && (
                        <i
                          className="clear-button fa-solid fa-x"
                          onClick={() =>
                            clearInput(
                              dispatchFirstname,
                              "First name changed",
                              "FirstName"
                            )
                          }
                          style={{ marginRight: "1rem" }}
                        />
                      )} */}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group row">
                    <label
                      htmlFor="LastName"
                      className="col-md-4 col-form-label"
                    >
                      {props.t("Last name")}
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        autoComplete="off"
                        name="lastname"
                        id="lastname"
                        className="form-control"
                        value={lastnameState.value}
                        onChange={lastnameChangeHandler}
                        onBlur={validateLastnameHandler}
                        style={{
                          borderColor:
                            lastnameIsValid === true
                              ? "green"
                              : lastnameIsValid === false && lastnameState.value
                              ? "red"
                              : undefined,
                        }}
                      />
                      {/* {lastnameState.value && (
                        <i
                          className="clear-button fa-solid fa-x"
                          onClick={() =>
                            clearInput(
                              dispatchLastname,
                              "Last name changed",
                              "LastName"
                            )
                          }
                          style={{ marginRight: "1rem" }}
                        />
                      )} */}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group row">
                    <label
                      htmlFor="PhoneNumber"
                      className="col-md-4 col-form-label"
                    >
                      {props.t("Phone number")}
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        autoComplete="off"
                        name="phonenumber"
                        id="phonenumber"
                        className="form-control"
                        value={phoneState.value}
                        onChange={phoneChangeHandler}
                        onBlur={validatePhoneHandler}
                        style={{
                          borderColor:
                            (phoneIsValid === false && phoneState.value) ||
                            PhoneUsed === true
                              ? "red"
                              : phoneIsValid === true
                              ? "green"
                              : undefined,
                        }}
                      />
                      {/* {phoneState.value && (
                        <i
                          className="clear-button fa-solid fa-x"
                          onClick={() =>
                            clearInput(
                              dispatchPhone,
                              "Phone number changed",
                              "PhoneNumber"
                            )
                          }
                          style={{ marginRight: "1rem" }}
                        />
                      )} */}
                    </div>
                    {PhoneUsed && (
                      <div
                        className="acceptance"
                        style={{
                          color: PhoneUsed === true ? "red" : undefined,
                        }}
                      >
                        {props.t("Phone Used")}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group row">
                    <label htmlFor="Gender" className="col-md-4 col-form-label">
                      {props.t("Gender")}
                    </label>
                    <div className="col-md-8">
                      <select
                        name="Gender"
                        id="Gender"
                        className="form-control"
                        value={gender || "N/D"}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="N/D">-----</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group row">
                    <label
                      htmlFor="DateofBirth"
                      className="col-md-4 col-form-label"
                    >
                      {props.t("Date of Birth")}
                    </label>
                    <div className="col-md-8">
                      <input
                        type="date"
                        name="dateofbirth"
                        id="dateofbirth"
                        className="form-control"
                        value={dateofBirth}
                        onChange={(e) => setDateofBirth(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="form-group row">
                    <label
                      htmlFor="LearningLanguage"
                      className="col-md-4 col-form-label"
                    >
                      {props.t("Learning Language")}
                    </label>
                    <div className="col-md-8">
                      <select
                        type="text"
                        id="LearningLanguage"
                        name="LearningLanguage"
                        className="form-control"
                        value={learningLanguage}
                        onChange={(e) => setLearningLanguage(e.target.value)}
                      >
                        <option value="">-----</option>
                        <option value="French">Français</option>
                        <option value="English">English</option>
                        <option value="Arabic">العربية</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-4" />
            </section>
            <section className="mb-4">
              <h3>{props.t("Address Information")}</h3>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="form-group row">
                    <label htmlFor="Street" className="col-md-4 col-form-label">
                      {props.t("Street")}
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        autoComplete="off"
                        name="street"
                        id="street"
                        className="form-control"
                        value={address.street}
                        onChange={handleAddressChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group row">
                    <label htmlFor="City" className="col-md-4 col-form-label">
                      {props.t("City")}
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        autoComplete="off"
                        name="city"
                        id="city"
                        className="form-control"
                        value={address.city}
                        onChange={handleAddressChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group row">
                    <label htmlFor="State" className="col-md-4 col-form-label">
                      {props.t("State")}
                    </label>
                    <div className="col-md-8">
                      <select
                        type="text"
                        autoComplete="off"
                        name="state"
                        id="state"
                        className="form-control"
                        value={address.state}
                        onChange={handleAddressChange}
                      >
                        <option value="">--Select--</option>
                        {TnStates.map((state, index) => (
                          <option value={state} key={index}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group row">
                    <label htmlFor="Zip" className="col-md-4 col-form-label">
                      {props.t("Zip-code")}
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        autoComplete="off"
                        name="zipCode"
                        id="zipCode"
                        className="form-control"
                        value={address.zipCode}
                        onChange={handleAddressChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-4" />
            </section>
            <section className="mb-4">
              <h3>{props.t("Confidential Information")}</h3>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="form-group row">
                    <label htmlFor="Email" className="col-md-4 col-form-label">
                      {props.t("Email")}
                    </label>
                    <div className="col-md-8">
                      <input
                        type="email"
                        required={true}
                        autoComplete="off"
                        name="email"
                        id="email"
                        disabled={true}
                        className="form-control"
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                        style={{
                          borderColor:
                            (emailIsValid === false && emailState.value) ||
                            EmailUsed === true
                              ? "red"
                              : emailIsValid === true
                              ? "green"
                              : undefined,
                        }}
                      />
                      {/* {emailState.value && (
                        <i
                          className="clear-button fa-solid fa-x"
                          onClick={() =>
                            clearInput(dispatchEmail, "Email changed", "Email")
                          }
                          style={{ marginRight: "1rem" }}
                        />
                      )} */}
                    </div>
                    {EmailUsed && (
                      <div
                        className="acceptance"
                        style={{
                          color: EmailUsed === true ? "red" : undefined,
                        }}
                      >
                        {props.t("Email Used")}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <hr className="my-4" />
            </section>

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary mt-3"
                style={{ marginBottom: "2rem" }}
                disabled={!formIsValid}
              >
                {props.t("Save Changes")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};
UserProfile.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
};

const mapStatetoProps = (state) => {
  const { error, success } = state.profile;
  return { error, success };
};
export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(UserProfile))
);
