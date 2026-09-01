function DeleteButton({ onDelete, text = "Delete", disabled = false }) {
  return (
    <button onClick={onDelete}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? "#9CA3AF" : "#DC2626",
        color: "white",
        border: "none",
        padding: "10px 18px",
        borderRadius: "6px",
        cursor: disabled ? "not-allowed" : "pointer",
      }} >
      {text}
    </button>
  );}

export default DeleteButton;
