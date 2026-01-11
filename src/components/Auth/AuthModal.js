import React, { useState } from "react";
import "./AuthModal.css";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthModal = ({ onClose }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // Will be stored in Firebase
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // NEW

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // show loading

    try {
      if (isSignup) {
        // Create new user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Update the displayName (username)
        await updateProfile(userCredential.user, {
          displayName: username || "Anime", // fallback if empty
        });

        // ✅ Close modal after signup instead of using alert
        setLoading(false);
        onClose();
      } else {
        // Login existing user
        await signInWithEmailAndPassword(auth, email, password);

        setLoading(false);
        onClose();
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        <button className="close-btn" onClick={onClose}>✖</button>

        <h2>{isSignup ? "Sign Up" : "Login"}</h2>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? (isSignup ? "Signing up..." : "Logging in...") : isSignup ? "Create Account" : "Login"}
          </button>
        </form>

        <p className="toggle-text">
          {isSignup ? "Already have an account?" : "New user?"}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? " Login" : " Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
