// import React from 'react'
import { Link } from "react-router-dom"
import {  useContext, useState } from "react";
import  AuthContext  from "../context/authContext";
import ToastContext from "../context/toastContext";

function Login() {
  const { loginUser } = useContext(AuthContext)
  const {toast} = useContext(ToastContext)
  
  console.log(loginUser)
  
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!credentials.email || !credentials.password) {
      toast.error("Please enter all the required fileds")
      return 
    }
    loginUser(credentials)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target 
    setCredentials({...credentials , [name] : value})
  }
  return (
    <>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
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
        <input type="submit" value="Login" className="btn btn-primary my-3" />
        <p>You Dont have an account ? <Link to="/register">Create One</Link></p>
      </form>
    </>
  )
}

export default Login
