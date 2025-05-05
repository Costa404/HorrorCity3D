import React from "react";

interface BtnLadderProps {
  buttonText: string;
  onClick: () => void;
}

const BtnLadder: React.FC<BtnLadderProps> = ({ buttonText, onClick }) => {
  return (
    <button
      className="fs-6 btn"
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
      }}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default BtnLadder;
