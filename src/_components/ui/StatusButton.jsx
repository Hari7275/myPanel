import React from "react";
import "./StatusButton.css";

const StatusButton = ({ row }) => {
  const getStatusText = (status) => {
    if (status === "active") return "ACTIVE";
    if (status === "verification_pending") return "PENDING";
    return status.toUpperCase();
  };

  const statusText = getStatusText(row.original.status);

  const iconSrc =
    row.original.status === "active"
      ? "https://cdn2.iconfinder.com/data/icons/greenline/512/check-512.png"
      : "https://openclipart.org/image/800px/292064";

  return (
    <>
      <div
        className={
          row.original.status === "active"
            ? "statusIcon-active"
            : "statusIcon-inactive"
        }
      >
        <img style={{ width: "15px" }} src={iconSrc} alt="status icon" />
        <span>{statusText}</span>
      </div>
    </>
  );
};

export default StatusButton;
