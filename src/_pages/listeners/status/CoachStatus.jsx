import React, { useState } from "react";

const CoachStatus = () => {
  const [status, setStatus] = useState({
    id: "Id",
    anonymous_call: "unavailable",
    audio_call: "available",
    chat: "unavailable",
    private_call: "available",
    video_call: "unavailable",
  });

  const getButtonClassName = (statusValue) =>
    statusValue === "available"
      ? "statusIcon_active activeStatus"
      : "statusIcon-inactive inactiveStatus";

  return (
    <div className="card">
      <label className="sub-heading">STATUS(AVAILABILITY) :</label>
      <div className="dividerm"></div>

      <footer className="card-foote">
        <div className="info-pair">
          <p className="info-item">
            <strong>Anonymous Call :</strong>
          </p>
          <p className="info-item">
            <button className={getButtonClassName(status.anonymous_call)}>
              {status.anonymous_call}
            </button>
          </p>
        </div>
        <div className="dividerm"></div>

        <div className="card-footer-content">
          <div className="info-pair">
            <p className="info-item">
              <strong>Chat :</strong>
            </p>
            <p className="info-item">
              <button className={getButtonClassName(status.chat)}>
                {status.chat}
              </button>
            </p>
          </div>
        </div>
        <div className="dividerm"></div>

        <div className="card-footer-content">
          <div className="info-pair">
            <p className="info-item">
              <strong>Audio Call :</strong>
            </p>
            <p className="info-item">
              <button className={getButtonClassName(status.audio_call)}>
                {status.audio_call}
              </button>
            </p>
          </div>
        </div>
        <div className="dividerm"></div>

        <div className="card-footer-content">
          <div className="info-pair">
            <p className="info-item">
              <strong>Video Call :</strong>
            </p>
            <p className="info-item">
              <button className={getButtonClassName(status.video_call)}>
                {status.video_call}
              </button>
            </p>
          </div>
        </div>
        <div className="dividerm"></div>

        <div className="card-footer-content">
          <div className="info-pair">
            <p className="info-item">
              <strong>Private Call :</strong>
            </p>
            <p className="info-item">
              <button className={getButtonClassName(status.private_call)}>
                {status.private_call}
              </button>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CoachStatus;
