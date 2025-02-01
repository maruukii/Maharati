import React from "react";
import ContactSection from "./ContactSection";
import breadcumbBg from "../../assets/img/breadcumb/ab.jpg";
import { Link } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Contact = () => {
  const mapStyles = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: 35.8256,
    lng: 10.6411,
  };

  return (
    <div>
      <div
        className="breadcumb-wrapper"
        style={{
          backgroundImage: `url(${breadcumbBg})`,
          backgroundSize: "100% 160%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container z-index-common">
          <div className="breadcumb-content">
            {/* <h1 className="breadcumb-title">Contact Us</h1>
            <p className="breadcumb-text">
              Search over 200 individual encyclopedias and reference books.
            </p> */}
            <div className="breadcumb-menu-wrap">
              <ul className="breadcumb-menu">
                <li>
                  <Link to="/">
                    <a>Home</a>
                  </Link>
                </li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <ContactSection />

      <div
        id="gmaps-markers"
        className="gmaps"
        style={{
          position: "relative",
          height: "400px",
          margin: "0rem 15rem",
          border: "10px solid #b7b6b92a",
        }}
      >
        <LoadScript googleMapsApiKey={import.meta.env.GOOGLE_MAPS_API_KEY}>
          <GoogleMap mapContainerStyle={mapStyles} center={center} zoom={8}>
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default Contact;
