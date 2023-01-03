import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFunctions, httpsCallable } from "firebase/functions";
import {functions} from "../../utils/firebase";

const MakeAdmin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);

  // working with form data
  const handleSubmit = async (event) => {
    event.preventDefault();
    const addAdminRole = httpsCallable(functions, 'addAdminRole');
    addAdminRole({ email: email.email })
      .then((result) => {
        console.log(result.data);
      });
  };

  // Create a function for working with fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmail({ ...email, [name]: value });
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Make Admin</label>
                <input
                  className="form-control"
                  type="text"
                  required
                  onChange={handleChange}
                  name="email"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Make Admin
              </button>
            </form>
          </div>
          
        </div>
      </div>
      <br></br>
    </>
  );
};

export default MakeAdmin;
