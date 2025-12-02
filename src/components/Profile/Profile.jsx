import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Profile.module.css";
import loadingAnimation from "../../assets/Loading.json";
import Lottie from "lottie-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("whiteboard_user_token");
      if (!token) {
        navigate("/login");
        return;
      }

      // Decode token to get user email
      const payload = JSON.parse(atob(token.split(".")[1]));

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log("Profile data:", data);
      if (response.ok) {
        setUser(data);
      } else {
        setError(data.error || "Failed to fetch profile");
      }
    } catch (err) {
      setError("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="w-14">
          <Lottie animationData={loadingAnimation} />
        </div>
      </div>
    );
  }

  return (
    <div className={classes.profile}>
      <div className={classes.header}>
        <h1>Profile</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className={classes.backBtn}
        >
          Back to Dashboard
        </button>
      </div>

      {error && <div className={classes.error}>{error}</div>}

      {user && (
        <div className={classes.profileCard}>
          <div className={classes.profileField}>
            <label>Email</label>
            <p>{user.email}</p>
          </div>
          <div className={classes.profileField}>
            <label>Member Since</label>
            <p>{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
