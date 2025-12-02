import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.css";
import boardContext from "../../store/board-context";
import Lottie from "lottie-react";
import animation from "../../assets/Login.json";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isUserLoggedIn, setUserLoginStatus } = useContext(boardContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("whiteboard_user_token", data.token);
        setUserLoginStatus(true);
        navigate("/dashboard", { replace: true });
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className="flex items-center justify-center">
          <div className="w-14">
            <Lottie animationData={animation} />
          </div>
        </div>
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
        <button type="submit">Login</button>
        <div className="w-full text-center mt-4">
          <p className="text-xs ">
            Don't have an account?{" "}
            <Link className="font-semibold" to="/register">
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
