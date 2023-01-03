import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "../../utils/firebase";
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = ({ setUser }) => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const [errorMessege, setErrorMessege] = useState(null);

  //   create a reset fields
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // Create a function for working with fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value.toString() });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessege("passwords do not match");
      return;
    }

    if (displayName && email && password & confirmPassword) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((response) => {
          updateProfile(response.user, { displayName }).then(() => {
            // we must reload user when update user info so than user's info can display after sign up
            auth.currentUser.reload();
            setUser(auth.currentUser);
            //   setActive("home");
            navigate("/");
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <div className="wpo-login-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <form onSubmit={handleSubmit} className="wpo-accountWrapper">
                <div className="wpo-accountInfo">
                  <div className="wpo-accountInfoHeader">
                    <Link to="/login">
                      <img src="assets/images/logo2.png" alt="" />
                    </Link>
                    <Link className="wpo-accountBtn" to="/login">
                      <span className="">Log in</span>
                    </Link>
                  </div>
                  <div className="image">
                    <img src="assets/images/login.svg" alt="" />
                  </div>
                  <div className="back-home">
                    <Link className="wpo-accountBtn" to="/">
                      <span className="">Back To Home</span>
                    </Link>
                  </div>
                </div>
                <div className="wpo-accountForm form-style">
                  <div className="fromTitle">
                    <h2>Signup</h2>
                    <p>Sign into your pages account</p>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                      <label>Full Name</label>
                      <input
                        type="text"
                        required
                        onChange={handleChange}
                        name="displayName"
                        value={displayName}
                        placeholder="Your name here.."
                      />
                    </div>
                    <div className="col-lg-12 col-md-12 col-12">
                      <label>Email</label>
                      <input
                      type="email"
                        required
                        onChange={handleChange}
                        name="email"
                        value={email}
                        placeholder="Your email here.."
                      />
                    </div>
                    <div className="col-lg-12 col-md-12 col-12">
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          className="pwd2"
                          type="password"
                          placeholder="Your password here.."
                          required
                          onChange={handleChange}
                          name="password"
                          value={password}
                        />
                        <span className="input-group-btn">
                          <button
                            className="btn btn-default reveal3"
                            type="button"
                          >
                            <i className="ti-eye"></i>
                          </button>
                        </span>
                        {errorMessege !== null && (
                          <span className="text-danger">{errorMessege}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-12">
                      <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                          className="pwd3"
                          type="password"
                          placeholder="Your password here.."
                          required
                          onChange={handleChange}
                          name="confirmPassword"
                          value={confirmPassword}
                        />
                        <span className="input-group-btn">
                          <button
                            className="btn btn-default reveal2"
                            type="button"
                          >
                            <i className="ti-eye"></i>
                          </button>
                        </span>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-12">
                      <button type="submit" className="wpo-accountBtn">
                        Signup
                      </button>
                    </div>
                  </div>
                  <h4 className="or">
                    <span>OR</span>
                  </h4>
                  <ul className="wpo-socialLoginBtn">
                    <li>
                      <button className="facebook" tabIndex="0" type="button">
                        <span>
                          <i className="ti-facebook"></i>
                        </span>
                      </button>
                    </li>
                    <li>
                      <button className="twitter" tabIndex="0" type="button">
                        <span>
                          <i className="ti-twitter"></i>
                        </span>
                      </button>
                    </li>
                    <li>
                      <button className="linkedin" tabIndex="0" type="button">
                        <span>
                          <i className="ti-linkedin"></i>
                        </span>
                      </button>
                    </li>
                  </ul>
                  <p className="subText">
                    Do you have an account? <Link to="/login">Sign In</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
