import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingIndicator = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100px",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      <CircularProgress size={40} thickness={4} style={{ color: "#3f51b5" }} />
      <span
        style={{
          marginLeft: "10px",
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#3f51b5",
        }}
      >
        Loading...
      </span>
    </div>
  );
};

export default LoadingIndicator;
