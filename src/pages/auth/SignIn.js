import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../../utils/firebase";

const defaultFormFields = {
  email: "",
  password: "",
};
const SignIn = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // set variables for display errors
  const [errorEmailMessege, setErrorEmailMessege] = useState(null);
  const [errorPasswordMessege, setErrorPasswordMessege] = useState(null);

  //   create a reset fields
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // working with form data
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email && password) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
          resetFormFields();
          // setActive('home');
          navigate("/");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/wrong-password":
              setErrorPasswordMessege("Incorrect password for email");
              break;
            case "auth/user-not-found":
              setErrorEmailMessege("No user associated with this email");
              break;
            default:
              alert("uncounted errors");
          }
        });
    }
  };

  // Create a function for working with fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value.toString() });
  };
  return (
    <>
      <div className="wpo-login-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <form onSubmit={handleSubmit}  className="wpo-accountWrapper">
                <div className="wpo-accountInfo">
                  <div className="wpo-accountInfoHeader">
                    <Link to="/register">
                      <img src="assets/images/logo2.png" alt="" />
                    </Link>
                    <Link className="wpo-accountBtn" to="/register">
                      <span className="">Create Account</span>
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
                    <h2>Login</h2>
                    <p>Sign into your pages account</p>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                      <label>Email</label>
                      <input
                        type="text"
                        required
                        onChange={handleChange}
                        name="email"
                        value={email}
                        placeholder="email"
                      />
                      {errorEmailMessege !== null && (
                          <span className="text-danger">{errorEmailMessege}</span>
                        )}
                    </div>
                    <div className="col-lg-12 col-md-12 col-12">
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          className="pwd6"
                          type="password"
                          placeholder="password"
                          required
                          onChange={handleChange}
                          name="password"
                          value={password}
                        />
                        {errorPasswordMessege !== null && (
                          <span className="text-danger">{errorPasswordMessege}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-12">
                      <div className="check-box-wrap">
                        <div className="forget-btn">
                          {/* <a href="forgot.html">Forgot Password?</a> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-12">
                      <button type="submit" className="wpo-accountBtn">
                        Login
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
                    Don't have an account?{" "}
                    <Link to="/register">Create free account</Link>
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

export default SignIn;
