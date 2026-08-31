import React from "react";

function ActiveButton({ active, onClick }) {
  return (
    <button type="button" onClick={onClick}>
      {active ? "Active" : "Inactive"}
    </button>
  );
}

export default ActiveButton;
