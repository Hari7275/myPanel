// AudioCallPage.jsx - Updated for Redesigned Layout
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
    // Set client role to audience for watch & listen mode (no broadcasting)
    agoraClient.setClientRole("audience");
    return agoraClient;
  }, []); // Empty dependency array ensures this only runs once

  if (!credentials) {
    return (
      <div style={{ padding: "40px", textAlign: "center", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h2 style={{ margin: "0 0 16px 0", fontSize: "24px", fontWeight: "600" }}>No call credentials found</h2>
        <p style={{ margin: "0 0 24px 0", color: "#6b7280" }}>Please navigate to this page from a valid call session.</p>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "12px 24px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  const { appId, channel, token, uid, assignedUserId, orderData } = credentials;

  // Validate credentials
  if (!appId || !channel) {
    return (
      <div style={{ padding: "40px", textAlign: "center", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h2 style={{ margin: "0 0 16px 0", fontSize: "24px", fontWeight: "600" }}>Invalid credentials</h2>
        <p style={{ color: "#ef4444", margin: "0 0 24px 0" }}>
          Missing App ID or Channel Name
        </p>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "12px 24px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      height: "100vh",
      overflowY: "auto",
      padding: "24px",
      maxWidth: "1600px", 
      margin: "0 auto",
      backgroundColor: "#f3f4f6",
      boxSizing: "border-box",
    }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "24px",
          paddingBottom: "20px",
          borderBottom: "2px solid #e5e7eb",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "10px",
            border: "1px solid #d1d5db",
            backgroundColor: "white",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#f9fafb";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "white";
          }}
        >
          <ArrowLeft size={20} />
        </button>
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: "28px", fontWeight: "700", color: "#111827" }}>
            Call Monitor
          </h1>
          {orderData && (
            <p
              style={{
                margin: "8px 0 0 0",
                fontSize: "14px",
                color: "#6b7280",
              }}
            >
              Order ID: <span style={{ fontWeight: "500", color: "#374151" }}>{orderData.id || orderData.order_id}</span> | 
              User ID: <span style={{ fontWeight: "500", color: "#374151" }}>{orderData.user_id}</span>
              {assignedUserId && (
                <> | Assigned User: <span style={{ fontWeight: "500", color: "#374151" }}>{assignedUserId}</span></>
              )}
            </p>
          )}
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

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          body {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default AudioCallPage;