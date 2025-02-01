import React, { useState } from "react";
import contact from "../../assets/img/about/contact-1.jpg";
import axios from "axios";
import "./Contact.css";
import useAuth from "../../hooks/useAuth";
import { useSnackbar } from "notistack";

const ContactSection = () => {
  const { auth } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [long, setLong] = useState(0);

  const [formData, setFormData] = useState({
    FullName: auth?.user
      ? auth?.user?.FirstName + " " + auth?.user?.LastName
      : "",
    Email: auth?.user ? auth?.user?.Email : "",
    PhoneNumber: auth?.user ? auth?.user?.PhoneNumber : "",
    Subject: "",
    Content: "",
    Preference: "Email",
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prevState) => {
      let newState = { ...prevState };

      if (type === "checkbox") {
        newState[name] = checked ? value : null;
      } else if (type === "number") {
        newState[name] = String(value);
      } else {
        newState[name] = value;
      }

      if (name === "PhoneNumber" && value === "") {
        newState["Preference"] = "Email";
      }
      if (name === "Content") {
        setLong(newState["Content"].length);
      }
      return newState;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        import.meta.env.VITE_HOST + "/support/contact-us",
        formData
      );
      if (response) {
        enqueueSnackbar(
          "Reclamation submited, Our support team will contact you soon"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="space-top space-extra-bottom">
      <div className="container">
        <div className="row gx-80">
          <div className="col-lg-6 col-xl-6 mb-30 mb-lg-0">
            <h2 className="h1 mt-n2">Get in Touch to Learn About Programmes</h2>
            <p className="fs-md mb-4 pb-2">
              become a partner school, or discover more about our work.
            </p>
            <h3 className="border-title2 h5">Regional Office</h3>
            <p className="contact-info">
              <i className="fas fa-clock"></i>
              Office hours are 9am – 5pm <br /> Monday-Thursday and 9am – 4.30pm
              on Friday.
            </p>
            <p className="contact-info  mb-4 ">
              <i className="fas fa-map-marker-alt"></i>
              St Commandant Bejaoui, Sousse, 4000{" "}
            </p>
            <p className="contact-info mb-4">
              <i className="fas fa-phone-alt"></i>
              <a className="text-inherit" href="tel:+11234562228">
                (+216) 58628518
              </a>
            </p>
            <p className="contact-info">
              <i className="fas fa-envelope"></i>
              <a className="text-inherit" href="mailto:hello@domainname.com">
                maharati@profeel.tn{" "}
              </a>
            </p>
            <div className="mega-hover rounded-20 mt-4 mt-lg-5 mb-4">
              <img src={contact} alt="office" className="w-100" />
            </div>
            <p className="font-title text-title fs-md fw-medium pt-xl-2 mb-2">
              Membership enquiries:
              <a href="tel:+04432907612" className="text-decoration-underline">
                (+216) 58628518
              </a>
            </p>
            <p className="font-title text-title fs-md fw-medium mb-4">
              Principal Support:
              <a href="tel:+2256366989" className="text-decoration-underline">
                (+216) 58628518
              </a>
            </p>
          </div>
          <div className="col-lg-6 col-xl-6">
            <form onSubmit={handleSubmit} className="form-style5 ajax-contact">
              <div className="vs-circle"></div>
              <h3 className="form-title">Enquire Now</h3>
              <p className="form-text">
                Creating the right learning environment to get the most out of
                each learning session.
              </p>
              <div className="form-group">
                <input
                  required={true}
                  type="text"
                  name="FullName"
                  id="FullName"
                  placeholder="Full name"
                  value={formData.FullName}
                  onChange={handleChange}
                />
                <span className="placeholder-title">Full name</span>
              </div>
              <div className="form-group">
                <input
                  required={true}
                  type="email"
                  name="Email"
                  id="Email"
                  placeholder="Email address"
                  value={formData.Email}
                  onChange={handleChange}
                />
                <span className="placeholder-title">Email address</span>
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="PhoneNumber"
                  id="PhoneNumber"
                  placeholder="Phone number"
                  value={formData.PhoneNumber}
                  onChange={handleChange}
                />
                <span className="placeholder-title">Phone number</span>
              </div>
              <div className="form-group">
                <select
                  type="text"
                  name="Subject"
                  id="Subject"
                  required={true}
                  value={formData.Subject}
                  onChange={handleChange}
                >
                  <option value="">---Select subject---</option>
                  <option value="Admission Help">Admission Help</option>
                  <option value="Apply Scholarship">Apply Scholarship</option>
                  <option value="Private Tutor">Private Tutor</option>
                  <option value="Admission Session">Admission Session</option>
                  <option value="Other">Other</option>
                </select>
                <span className="placeholder-title">Subject</span>
              </div>
              <div className="form-group">
                <textarea
                  rows={4}
                  maxLength={800}
                  required={true}
                  name="Content"
                  id="Content"
                  placeholder="Write your message"
                  value={formData.Content}
                  onChange={handleChange}
                ></textarea>
                <span className="placeholder-title">Message [{long}/800]</span>
              </div>

              <p className="form-text2" style={{ fontSize: "1rem" }}>
                How would you prefer to be contacted by?
              </p>
              <div className="row" style={{ marginLeft: "0.1rem" }}>
                <div className="col-auto form-group">
                  <input
                    type="radio"
                    name="Preference"
                    id="callchoiceemail"
                    value="Email"
                    checked={formData.Preference === "Email"}
                    onChange={handleChange}
                  />
                  <label htmlFor="callchoiceemail">E-mail</label>
                </div>
                <div className="col-auto form-group">
                  <input
                    type="radio"
                    name="Preference"
                    id="callchoicephone"
                    value="Phone"
                    disabled={!formData.PhoneNumber}
                    checked={formData.Preference === "Phone"}
                    onChange={handleChange}
                  />
                  <label htmlFor="callchoicephone">Phone</label>
                </div>
              </div>
              <button type="submit" className="vs-btn">
                Send
              </button>
              {/* <p className="form-messages">
                <span className="sr-only">Form message will display here</span>
              </p> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
