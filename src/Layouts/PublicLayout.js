import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/partials/Footer";
import Header from "../components/partials/header/Header";

const PublicLayout = ({user, handleSignout}) => {
  return (
    <>
     <div className="page-wrapper">
        <Header user={user} handleSignout={handleSignout} />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PublicLayout;
