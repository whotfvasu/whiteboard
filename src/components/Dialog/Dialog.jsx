import Modal from "react-modal";
import classes from "./Dialog.module.css";
import { useState } from "react";

Modal.setAppElement("#root");

export const ConfirmDialog = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={classes.modal}
      overlayClassName={classes.overlay}
      closeTimeoutMS={100}
    >
      <p className={classes.message}>{message}</p>
      <div className={classes.buttons}>
        <button onClick={onClose} className={classes.cancelBtn}>
          Cancel
        </button>
        <button onClick={onConfirm} className={classes.confirmBtn}>
          Delete
        </button>
      </div>
    </Modal>
  );
};

export const ShareDialog = ({ isOpen, onClose, onShare }) => {
  const [email, setEmail] = useState("");

  const handleShare = () => {
    if (email.trim()) {
      onShare(email);
      setEmail("");
    }
  };

  const handleClose = () => {
    setEmail("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className={classes.modal}
      overlayClassName={classes.overlay}
      closeTimeoutMS={200}
    >
      <p className={classes.message}>Share Canvas</p>
      <input
        type="email"
        placeholder="Enter email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={classes.input}
        autoFocus
        onKeyDown={(e) => e.key === "Enter" && handleShare()}
      />
      <div className={classes.buttons}>
        <button onClick={handleClose} className={classes.cancelBtn}>
          Cancel
        </button>
        <button onClick={handleShare} className={classes.confirmBtn}>
          Share
        </button>
      </div>
    </Modal>
  );
};
