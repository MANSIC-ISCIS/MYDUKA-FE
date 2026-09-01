import React from "react";
function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div
      style={{
        backgroundColor: "#FEE2E2",
        color: "#B91C1C",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "16px",
        border: "1px solid #FCA5A5",
      }}>
      {message}
    </div>
  );
}

export default ErrorMessage;
