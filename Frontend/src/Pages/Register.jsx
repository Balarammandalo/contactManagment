// import React from 'react'
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/authContext";
import ToastContext from "../context/toastContext";

function Register() {
  const {toast} = useContext(ToastContext)
  const{registerUser} = useContext(AuthContext)
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault()
    
    if (!credentials.name || !credentials.email || !credentials.password || !credentials.confirmPassword) {
      toast.error("Please enter all the required fields")
      return
    }
    if (credentials.password !== credentials.confirmPassword) {
      toast.error("Please enter confirm password correctly")
      return
    }

    const userData = { ...credentials, confirmPassword: undefined }
    registerUser(userData)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target 
    setCredentials({ ...credentials, [name]: value })
  }

  return (
    <>
      <h3>CREATE YOUR ACCOUNT</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nameInput" className="form-label mt-4">
            Your Name
          </label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            name="name"
            value={credentials.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailInput" className="form-label mt-4">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            placeholder="johndoe@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput" className="form-label mt-4">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Enter Password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label mt-4">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleInputChange}
            placeholder="Enter Password"
            required
          />
        </div>
        <button type="submit" value="Register" className="btn btn-primary my-3">Register</button>
        <p>
          Already have an account ? <Link to="/login">Login</Link>
        </p>
      </form>
    </>
  );
}

export default Register;
