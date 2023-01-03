import React from "react";

const Subcriptions = () => {
  return (
    <>
      <section className="wpo-subscribe-section section-padding">
        <div className="container">
          <div className="wpo-subscribe-wrap">
            <div className="subscribe-text">
              <h3>Never miss any Update!</h3>
              <p>
                Get the freshest headlines and updates sent uninterrupted to
                your inbox.
              </p>
            </div>
            <div className="subscribe-form">
              <form action="#">
                <div className="input-field">
                  <input type="email" placeholder="Enter your email" required />
                  <button type="submit">Subscribe</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* <!-- end container --> */}
      </section>
    </>
  );
};

export default Subcriptions;
