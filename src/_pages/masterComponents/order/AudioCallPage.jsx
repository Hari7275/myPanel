// AudioCallPage.jsx - Fixed client initialization
import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";
import AgoraAudienceCall from "./AgoraAudienceCall";
import { ArrowLeft } from "lucide-react";

const AudioCallPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const credentials = location.state?.credentials;

  // Create client using useMemo to ensure it's stable and only created once
  const client = useMemo(() => {
    const agoraClient = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
    // Set client role to audience for listen-only mode
    agoraClient.setClientRole("audience");
    return agoraClient;
  }, []); // Empty dependency array ensures this only runs once

  if (!credentials) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>No call credentials found</h2>
        <button
          onClick={() => navigate(-1)}
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  const { appId, channel, token, uid, orderData } = credentials;

  // Validate credentials
  if (!appId || !channel) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Invalid credentials</h2>
        <p style={{ color: "#ef4444", marginTop: "12px" }}>
          Missing App ID or Channel Name
        </p>
        <button
          onClick={() => navigate(-1)}
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "24px",
          paddingBottom: "16px",
          borderBottom: "2px solid #e5e7eb",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "8px",
            border: "1px solid #d1d5db",
            backgroundColor: "white",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "600" }}>
            Audio Call
          </h1>
          {orderData && (
            <p
              style={{
                margin: "4px 0 0 0",
                fontSize: "14px",
                color: "#6b7280",
              }}
            >
              Order ID: {orderData.id || orderData.order_id} | User ID:{" "}
              {orderData.user_id}
            </p>
          )}
        </div>
      </div>

      {/* Call Information */}
      <div
        style={{
          backgroundColor: "#f9fafb",
          padding: "16px",
          borderRadius: "12px",
          marginBottom: "24px",
          border: "1px solid #e5e7eb",
        }}
      >
        <h3
          style={{
            margin: "0 0 12px 0",
            fontSize: "16px",
            fontWeight: "600",
            color: "#374151",
          }}
        >
          Call Information
        </h3>
        <div style={{ display: "grid", gap: "8px" }}>
          <div style={{ display: "flex", gap: "8px", fontSize: "14px" }}>
            <span style={{ color: "#6b7280", minWidth: "120px" }}>
              Channel:
            </span>
            <span style={{ color: "#111827", fontWeight: "500" }}>
              {channel}
            </span>
          </div>
          <div style={{ display: "flex", gap: "8px", fontSize: "14px" }}>
            <span style={{ color: "#6b7280", minWidth: "120px" }}>
              App ID:
            </span>
            <span style={{ color: "#111827", fontFamily: "monospace" }}>
              {appId ? `${appId.substring(0, 8)}...` : "N/A"}
            </span>
          </div>
          <div style={{ display: "flex", gap: "8px", fontSize: "14px" }}>
            <span style={{ color: "#6b7280", minWidth: "120px" }}>UID:</span>
            <span style={{ color: "#111827", fontFamily: "monospace" }}>
              {uid || "Auto-assign"}
            </span>
          </div>
          <div style={{ display: "flex", gap: "8px", fontSize: "14px" }}>
            <span style={{ color: "#6b7280", minWidth: "120px" }}>Token:</span>
            <span
              style={{
                color: "#111827",
                fontFamily: "monospace",
                fontSize: "12px",
                wordBreak: "break-all",
              }}
            >
              {token ? `${token.substring(0, 20)}...` : "No token (Testing mode)"}
            </span>
          </div>
        </div>
      </div>

      {/* Agora Component */}
      <AgoraRTCProvider client={client}>
        <AgoraAudienceCall
          appId={appId}
          channel={channel}
          token={token}
          uid={uid}
        />
      </AgoraRTCProvider>
    </div>
  );
};

export default AudioCallPage;