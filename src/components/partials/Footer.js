import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="wpo-site-footer">
        <div className="wpo-lower-footer">
          <div className="container">
            <div className="row">
              <div className="col col-xs-12">
                <p className="copyright">
                  {" "}
                  Copyright &copy; 2022 Bloggar by{" "}
                  <Link to="/">Nazmul</Link>. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
