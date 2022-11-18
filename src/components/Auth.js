import React, { useState } from "react";
// import { Navigation } from "react-router-dom";
import "./Auth.css";
export default function Auth() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const handleSubmit = async (event) => {
    // Prevent page reload
    event.preventDefault();
    const response = await fetch(
      "http://localhost:3000/api/v1/auth/admin-login",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (data && data.token) {
      localStorage.setItem("token", data.token);
      alert("Login successfully");
      window.location.href = "/dashboard";
    } else {
      alert("Invalid Username and password");
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {renderErrorMessage("email")}
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {renderErrorMessage("password")}
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
