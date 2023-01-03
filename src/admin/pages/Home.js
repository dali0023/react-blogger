import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="row">
        <div className="col-lg-10">
          <div className="card card-primary card-outline">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>

              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <Link to="#" className="card-link">
                Card link
              </Link>
              <Link to="#" className="card-link">
                Another link
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
