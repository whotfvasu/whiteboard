import toast from "react-hot-toast";

export const showSuccessToast = (message) => {
  toast.success(message, {
    duration: 2000,
    position: "bottom-center",
    style: {
      background: "white",
      color: "black",
      border: "1px solid black",
      borderRadius: "8px",
      padding: "12px 16px",
      fontSize: "14px",
      boxShadow: "none",
    },
    iconTheme: {
      primary: "black",
      secondary: "white",
    },
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    duration: 3000,
    position: "bottom-center",
    style: {
      background: "white",
      color: "black",
      border: "1px solid black",
      borderRadius: "8px",
      padding: "12px 16px",
      fontSize: "14px",
      boxShadow: "none",
    },
    iconTheme: {
      primary: "#ff0000",
      secondary: "white",
    },
  });
};

export const showLoadingToast = (message) => {
  return toast.loading(message, {
    position: "bottom-center",
    style: {
      background: "white",
      color: "black",
      border: "1px solid black",
      borderRadius: "8px",
      padding: "12px 16px",
      fontSize: "14px",
      boxShadow: "none",
    },
  });
};

