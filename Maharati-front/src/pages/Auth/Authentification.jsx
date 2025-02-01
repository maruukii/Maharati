import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import BreadcrumbWrapper from "./Breadcumb";
import AuthSection from "./AuthSection ";
import TopQuality from "./TopQuality";

const Authentification = () => {
  return (
    <div>
      <BreadcrumbWrapper />
      <AuthSection />
      <TopQuality />
    </div>
  );
};

export default Authentification;
