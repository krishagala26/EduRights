import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Register.css";

import { auth, db } from "./Firebase.jsx";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Latest allowed birth date = yesterday (YYYY-MM-DD, local time).
// Stops today's date or a future date from being saved by mistake,
// which would make the age 0 and send everyone to the teen dashboard.
const getLatestBirthDate = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    birthDate: "",
    password: "",
  });

  const nav = useNavigate();
  const latestBirthDate = getLatestBirthDate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reject today's date or a future date (ISO dates compare correctly as text)
    if (formData.birthDate > latestBirthDate) {
      alert("Please enter your real birth date.");
      return;
    }

    try {
      // 1. Create Firebase Authentication account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // 2. Save additional user information in Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: formData.username,
        email: formData.email,
        birthDate: formData.birthDate,
        createdAt: new Date(),
      });

      alert("Registration Successful!");

      // Redirect to login page
      nav("/login");

      // Optional: clear form
      setFormData({
        username: "",
        email: "",
        birthDate: "",
        password: "",
      });
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <p>Create your account</p>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          {/* Email */}
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Birth Date */}
          <label>Birth Date</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            max={latestBirthDate}
            required
          />

          {/* Password */}
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;