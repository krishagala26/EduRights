
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login.css";

import { auth, db } from "./Firebase.jsx";
import { useAuth } from "../context/AuthContext.jsx";

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();
  const { login } = useAuth();

  // Login handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username.trim() || !password) {
      alert("Please enter your email and password.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username.trim(),
        password
      );

      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        alert("User information not found.");
        return;
      }

      const userData = userDoc.data();

      const birthDate =
        userData.birthDate ??
        userData.birthdate ??
        userData.dob ??
        userData.dateOfBirth;

      const age = calculateAge(birthDate);

      let ageGroup;

      if (age >= 8 && age <= 12) {
        ageGroup = "8-12";
      } else if (age >= 13 && age <= 16) {
        ageGroup = "13-16";
      } else {
        ageGroup = "13-16";
      }

      const loggedInUser = {
        ...userData,
        ageGroup,
        uid: user.uid,
      };

      login(loggedInUser, await user.getIdToken());

      alert("Login Successful!");

      nav("/dashboard", {
        state: {
          ageGroup,
          user: loggedInUser,
        },
      });
    } catch (error) {
      console.error("Login error:", error);

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        alert("Invalid email or password.");
      } else if (error.code === "auth/invalid-email") {
        alert("Please enter a valid email address.");
      } else if (error.code === "auth/too-many-requests") {
        alert("Too many attempts. Please try again later.");
      } else {
        alert(error.message);
      }
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  // Forgot Password handler
  const handleForgotPassword = async () => {
    const email = username.trim();

    if (!email) {
      alert("Please enter your registered email address first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);

      alert(
        "Password reset email sent! Please check your inbox and spam folder."
      );
    } catch (error) {
      console.error("Password reset error:", error);

      if (error.code === "auth/invalid-email") {
        alert("Please enter a valid email address.");
      } else if (error.code === "auth/user-not-found") {
        alert("No account found with this email address.");
      } else {
        alert(error.message);
      }
    }
  };

  // Convert stored birth date into a Date object
  function toDate(value) {
    if (!value) return null;

    if (typeof value.toDate === "function") {
      return value.toDate();
    }

    if (value instanceof Date) {
      return value;
    }

    if (typeof value === "object" && "seconds" in value) {
      return new Date(value.seconds * 1000);
    }

    if (typeof value === "string") {
      const match = value.match(
        /^(\d{1,2})[/. -](\d{1,2})[/. -](\d{4})$/
      );

      if (match) {
        return new Date(
          Number(match[3]),
          Number(match[2]) - 1,
          Number(match[1])
        );
      }
    }

    const date = new Date(value);

    return Number.isNaN(date.getTime()) ? null : date;
  }

  // Calculate age
  function calculateAge(birthDate) {
    const dob = toDate(birthDate);

    if (!dob) return 0;

    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();

    const monthDifference = today.getMonth() - dob.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < dob.getDate())
    ) {
      age--;
    }

    return age;
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back!</h2>
        <p>Login to continue your EduRights journey</p>

        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your registered email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="login-form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-submit-btn">
            Login
          </button>
        </form>

        <button
          type="button"
          className="login-forgot-btn"
          onClick={handleForgotPassword}
        >
          Forgot Password?
        </button>

        <button
          type="button"
          className="login-signup-btn"
          onClick={() => nav("/register")}
        >
          Create an Account
        </button>

        <button
          type="button"
          className="login-home-btn"
          onClick={() => nav("/")}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

export default Login;
