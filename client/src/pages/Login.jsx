import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login.css";

import { auth, db } from "./Firebase.jsx";
import { useAuth } from "../context/AuthContext.jsx";

import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username === "" || password === "") {
      alert("Cannot be empty");
      return;
    }

    try {
      // 1. Login using Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );

      const user = userCredential.user;

      // 2. Get user's information from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        alert("User information not found.");
        return;
      }

      const userData = userDoc.data();

      // Register.jsx should store DOB as "birthDate". A few other common
      // names are checked too, in case it was saved under a different one.
      const birthDate =
        userData.birthDate ??
        userData.birthdate ??
        userData.dob ??
        userData.dateOfBirth;

      // 3. Calculate user's age
      const age = calculateAge(birthDate);

      console.log("Logged in user:", userData);
      console.log("Raw birth date value:", birthDate);
      console.log("Age:", age);

      // 4. Decide which personalized dashboard to show
      let ageGroup;

      if (age >= 8 && age <= 12) {
        ageGroup = "8-12";
      } else if (age >= 13 && age <= 16) {
        ageGroup = "13-16";
      } else {
        // For users outside the specified age groups
        ageGroup = "13-16";
      }

      console.log("Dashboard age group:", ageGroup);

      // 5. Tell AuthContext a user is now logged in.
      // ProtectedRoute checks AuthContext's user, not Firebase directly,
      // so without this call it would always redirect back to /login.
      login(
        { ...userData, ageGroup, uid: user.uid },
        await user.getIdToken()
      );

      alert("Login Successful!");

      // 6. Navigate to Dashboard
      // Still pass ageGroup and user via route state too, as a fast path
      // for Dashboard.jsx to use immediately after this navigation.
      nav("/dashboard", {
        state: {
          ageGroup: ageGroup,
          user: { ...userData, ageGroup, uid: user.uid },
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
      } else {
        alert(error.message);
      }
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  // Turn whatever was saved in Firestore into a real Date.
  // Handles Firestore Timestamps, DD/MM/YYYY strings and normal date strings.
  function toDate(value) {
    if (!value) return null;
    if (typeof value.toDate === "function") return value.toDate(); // Firestore Timestamp
    if (value instanceof Date) return value;
    if (typeof value === "object" && "seconds" in value) {
      return new Date(value.seconds * 1000);
    }
    if (typeof value === "string") {
      // DD/MM/YYYY, DD-MM-YYYY or DD.MM.YYYY
      const m = value.match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})$/);
      if (m) return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
    }
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  // Calculate age from birth date
  function calculateAge(birthDate) {
    const dob = toDate(birthDate);
    if (!dob) {
      return 0;
    }

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
    <div className="container">
      <div className="form-box">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">
            Login
          </button>

          <div className="button-group">
            {/* Forgot Password */}
            <button
              type="button"
              onClick={() => nav("/forgot")}
              style={{ backgroundColor: "#ffc107" }}
            >
              Forgot Password
            </button>

            {/* Signup */}
            <button
              type="button"
              onClick={() => nav("/")}
              style={{ backgroundColor: "#28a745" }}
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;