import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Dashboard.module.css";
import {
  showErrorToast,
  showSuccessToast,
  showLoadingToast,
} from "../../utils/toast";
import toast from "react-hot-toast";
import animation from "../../assets/Dashboard.json";
import Lottie from "lottie-react";
import { ConfirmDialog, ShareDialog } from "../Dialog/Dialog";
import loadingAnimation from "../../assets/Loading.json";

const Dashboard = () => {
  const [canvases, setCanvases] = useState([]);
  const [canvasName, setCanvasName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    canvasId: null,
  });
  const [shareDialog, setShareDialog] = useState({
    isOpen: false,
    canvasId: null,
  });

  useEffect(() => {
    fetchCanvases();
  }, []);

  const token = localStorage.getItem("whiteboard_user_token");

  const fetchCanvases = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/canvas`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setCanvases(data);
      } else {
        setError(data.error || "Failed to fetch canvases");
      }
    } catch (err) {
      setError("Failed to fetch canvases");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCanvas = async (e) => {
    e.preventDefault();
    if (!canvasName.trim()) return;

    try {
      const token = localStorage.getItem("whiteboard_user_token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/canvas`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: canvasName }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setCanvasName("");
        navigate(`/canvas/${data._id}`);
      } else {
        setError(data.error || "Failed to create canvas");
      }
    } catch (err) {
      setError("Failed to create canvas");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("whiteboard_user_token");
    window.location.href = "/login";
  };

  const handleDeleteCanvas = (e, canvasId) => {
    e.stopPropagation();
    setDeleteDialog({ isOpen: true, canvasId });
  };

  const confirmDelete = async () => {
    const canvasId = deleteDialog.canvasId;
    setDeleteDialog({ isOpen: false, canvasId: null });

    const loadingToast = showLoadingToast("Deleting canvas...");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/canvas/delete/${canvasId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.dismiss(loadingToast);

      if (response.ok) {
        setCanvases(canvases.filter((canvas) => canvas._id !== canvasId));
        showSuccessToast("Canvas deleted successfully!");
      } else {
        const error = await response.json();
        showErrorToast(error.error || "Failed to delete canvas");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error("Error deleting canvas:", error);
      showErrorToast("Failed to delete canvas. Please try again.");
    }
  };

  const handleShareCanvas = (e, canvasId) => {
    e.stopPropagation();
    setShareDialog({ isOpen: true, canvasId });
  };

  const confirmShare = async (email) => {
    const canvasId = shareDialog.canvasId;
    setShareDialog({ isOpen: false, canvasId: null });

    const loadingToast = showLoadingToast("Sharing canvas...");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/canvas/share/${canvasId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ shareWith: email }),
        }
      );

      toast.dismiss(loadingToast);

      if (response.ok) {
        showSuccessToast("Canvas shared successfully!");
      } else {
        const error = await response.json();
        showErrorToast(error.error || "Failed to share canvas");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error("Error sharing canvas:", error);
      showErrorToast("Failed to share canvas. Please try again.");
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
    <div className={classes.dashboard}>
      <div className={classes.header}>
        <div className="w-14 relative top-2">
          <Lottie animationData={animation} />
        </div>
        <div className={classes.headerButtons}>
          <button
            onClick={() => navigate("/profile")}
            className={classes.profileBtn}
          >
            Profile
          </button>
          <button onClick={handleLogout} className={classes.logoutBtn}>
            Logout
          </button>
        </div>
      </div>

      <div className={classes.createSection}>
        <form onSubmit={handleCreateCanvas} className={classes.createForm}>
          <input
            type="text"
            placeholder="Canvas name"
            value={canvasName}
            onChange={(e) => setCanvasName(e.target.value)}
            className={classes.input}
          />
          <button type="submit" className={classes.createBtn}>
            Create Canvas
          </button>
        </form>
      </div>

      {error && <div className={classes.error}>{error}</div>}

      <div className={classes.canvasList}>
        {canvases.length === 0 ? (
          <p className={classes.noCanvas}>
            No canvases yet. Create your first one!
          </p>
        ) : (
          <div className={classes.grid}>
            {canvases.map((canvas) => (
              <div key={canvas._id} className={classes.canvasCard}>
                <div className={classes.cardActions}>
                  <button
                    className={classes.shareButton}
                    onClick={(e) => handleShareCanvas(e, canvas._id)}
                    aria-label="Share canvas"
                  >
                    <img src="/share.svg" alt="Share" />
                  </button>
                  <button
                    className={classes.deleteButton}
                    onClick={(e) => handleDeleteCanvas(e, canvas._id)}
                    aria-label="Delete canvas"
                  >
                    <img src="/delete.svg" alt="Delete" />
                  </button>
                </div>
                <div onClick={() => navigate(`/canvas/${canvas._id}`)}>
                  <h3>{canvas.name || "Untitled Canvas"}</h3>
                  <p className={classes.date}>
                    Created: {new Date(canvas.createdAt).toLocaleDateString()}
                  </p>
                  <p className={classes.elements}>
                    {canvas.elements?.length || 0} elements
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, canvasId: null })}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this canvas?"
      />

      <ShareDialog
        isOpen={shareDialog.isOpen}
        onClose={() => setShareDialog({ isOpen: false, canvasId: null })}
        onShare={confirmShare}
      />
    </div>
  );
};

export default Dashboard;
