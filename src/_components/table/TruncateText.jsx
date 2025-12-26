import React, { useState } from "react";

const TruncateText = ({ text, wordLimit = 5 }) => {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  const words = text?.split(" ");
  const isLong = words?.length > wordLimit;

  const visibleText = expanded
    ? text
    : words?.slice(0, wordLimit).join(" ") + (isLong ? "..." : "");

  return (
    <span>
      {visibleText}{" "}
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            color: "#007bff",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          {expanded ? "See less" : "See more"}
        </button>
      )}
    </span>
  );
};

export default TruncateText;
