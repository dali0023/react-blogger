import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ user, handleSignout }) => {
  const [showText, setShowText] = useState(false);
  const UserId = user?.uid;
  const admin = user?.admin;
  // console.log(admin);
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ padding: "30px 5px", backgroundColor: "#fff" }}
      >
        <div className="container">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse text-center" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/"
                  style={{ fontSize: "18px" }}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/posts"
                  style={{ fontSize: "18px" }}
                >
                  Posts
                </Link>
              </li>
              {user?.admin ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/make-admin"
                      style={{ fontSize: "18px" }}
                    >
                      Make Admin
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/admin"
                      style={{ fontSize: "18px" }}
                    >
                      Dashboard
                    </Link>
                  </li>
                </>
              ) : (
               null
              )}
            </ul>
            {/* {showText && (
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
            )}

            <button
              onClick={() => setShowText(!showText)}
              className="btn btn-outline-success"
              style={{ marginRight:"20px" }}
            >
              Search
            </button>  */}
            {UserId ? (
              <>
                <div className="dropdown text-center">
                  <button
                    className="btn dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ fontSize: "18px", marginLeft: "20px" }}
                  >
                    {user?.displayName}
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-dark text-center"
                    aria-labelledby="dropdownMenuButton2"
                  >
                    <li className="text-center">
                      <Link
                        className="dropdown-item active text-center"
                        onClick={handleSignout}
                        style={{ fontSize: "18px" }}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <Link to="/login" style={{ fontSize: "18px" }}>
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
