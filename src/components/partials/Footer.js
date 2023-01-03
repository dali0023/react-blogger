import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="wpo-site-footer">
        <div className="wpo-upper-footer">
          <div className="container">
            <div className="row">
              <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                <div className="widget about-widget">
                  <div className="logo widget-title">
                    <img src="assets/images/logo2.png" alt="blog" />
                  </div>
                  <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which don't
                    look even slightly believable.
                  </p>
                </div>
              </div>
              <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                <div className="widget link-widget">
                  <div className="widget-title">
                    <h3>Important Link</h3>
                  </div>
                  <ul>
                    <li>
                      <a href="blog.html">News</a>
                    </li>
                    <li>
                      <a href="blog.html">Career </a>
                    </li>
                    <li>
                      <a href="blog.html">Technology</a>
                    </li>
                    <li>
                      <a href="blog.html">Startups</a>
                    </li>
                    <li>
                      <a href="blog.html">Gadgets</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col col-lg-4 col-md-6 col-sm-12 col-12">
                <div className="widget tag-widget">
                  <div className="widget-title">
                    <h3>Browse by Tag </h3>
                  </div>
                  <ul>
                    <li>
                      <a href="travels.html">Travel</a>
                    </li>
                    <li>
                      <a href="business.html">Business</a>
                    </li>
                    <li>
                      <a href="lifestyle.html">Lifestyle</a>
                    </li>
                    <li>
                      <a href="blog.html">Marketing</a>
                    </li>
                    <li>
                      <a href="blog.html">Medical</a>
                    </li>
                    <li>
                      <a href="blog.html">Sports</a>
                    </li>
                    <li>
                      <a href="blog.html">Career</a>
                    </li>
                    <li>
                      <a href="foods.html">Foods</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col col-lg-2 col-md-6 col-sm-12 col-12">
                <div className="widget social-widget">
                  <div className="widget-title">
                    <h3>Social Media</h3>
                  </div>
                  <ul>
                    <li>
                      <a href="#">
                        <i>
                          <img src="assets/images/ft-icon/1.png" alt="" />
                        </i>{" "}
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i>
                          <img src="assets/images/ft-icon/2.png" alt="" />
                        </i>{" "}
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i>
                          <img src="assets/images/ft-icon/3.png" alt="" />
                        </i>{" "}
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i>
                          <img src="assets/images/ft-icon/4.png" alt="" />
                        </i>{" "}
                        Youtube
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end container --> */}
        </div>
        <div className="wpo-lower-footer">
          <div className="container">
            <div className="row">
              <div className="col col-xs-12">
                <p className="copyright">
                  {" "}
                  Copyright &copy; 2022 Bloggar by{" "}
                  <a href="index.html">wpOceans</a>. All Rights Reserved.
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
