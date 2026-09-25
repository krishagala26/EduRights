import React, { useState } from "react";
import { useNavigate } from "react-router-dom";   // <-- add this
import "../Register.css";

import { auth, db } from "./Firebase.jsx";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    birthDate: "",
    password: "",
  });

  const nav = useNavigate();   // <-- initialize navigator

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      // ✅ Redirect to login page
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
