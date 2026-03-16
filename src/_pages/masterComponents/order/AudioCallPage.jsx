// AudioCallPage.jsx - Updated for Redesigned Layout
import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";
import AgoraAudienceCall from "./AgoraAudienceCall";
import { ArrowLeft } from "lucide-react";
import Button from "@mui/material/Button";
import { useUpdateqRunningOrderMutation } from "../../../_store/api";
import toast from "react-hot-toast";
import { useUpdateStatusMutation } from "../../../_store/api";
import { useTheme } from "../../../_context/ThemeContext";

const AudioCallPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const credentials = location.state?.credentials;
  const [updateRunningStatus, { isLoading: isUpdating, error: updateError }] =
    useUpdateqRunningOrderMutation();

  const [updateStatus, { isLoading: isUpdatingStatus, error: isUpdateError }] =
    useUpdateStatusMutation();

  // Create client using useMemo to ensure it's stable and only created once
  const client = useMemo(() => {
    const agoraClient = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
    // Set client role to audience for watch & listen mode (no broadcasting)
    agoraClient.setClientRole("audience");
    return agoraClient;
  }, []); // Empty dependency array ensures this only runs once

  if (!credentials) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isDarkMode ? "#0f0f1a" : undefined,
        }}
      >
        <h2
          style={{ margin: "0 0 16px 0", fontSize: "24px", fontWeight: "600", color: isDarkMode ? "#e0e0e0" : undefined }}
        >
          No call credentials found
        </h2>
        <p style={{ margin: "0 0 24px 0", color: isDarkMode ? "#9ca3af" : "#6b7280" }}>
          Please navigate to this page from a valid call session.
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

  const { appId, channel, token, uid, assignedUserId, orderData } = credentials;

  console.log("consultant id", orderData?.consultant_id);
  console.log("orderData", orderData?.id);

  // Validate credentials
  if (!appId || !channel) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isDarkMode ? "#0f0f1a" : undefined,
        }}
      >
        <h2
          style={{ margin: "0 0 16px 0", fontSize: "24px", fontWeight: "600", color: isDarkMode ? "#e0e0e0" : undefined }}
        >
          Invalid credentials
        </h2>
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

  const handleSaveCompleteOrder = async (e) => {
    e.preventDefault();

    const payload = {
      order_id: orderData?.id,
      consultant_id: orderData?.consultant_id,
      status: 4,
      completed_by: 5,
    };
    console.log("payload", payload);
    // return;
    try {
      const response = await updateRunningStatus({
        body: payload,
      });

      if (response?.data?.status) {
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      if (error.data) {
        console.error("API Error Data:", error.data);
      }
    }
  };

  const handleSaveInactiveConsultant = async (e) => {
    e.preventDefault();

    const payload = {
      status: 8,
    };

    try {
      const response = await updateStatus({
        id: orderData?.consultant_id,
        body: payload,
      });

      if (response?.data?.status) {
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      if (error.data) {
        console.error("API Error Data:", error.data);
      }
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        overflowY: "auto",
        padding: "24px",
        maxWidth: "1600px",
        margin: "0 auto",
        backgroundColor: isDarkMode ? "#0f0f1a" : "#f3f4f6",
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
          borderBottom: `2px solid ${isDarkMode ? "#2a2a3e" : "#e5e7eb"}`,
          backgroundColor: isDarkMode ? "#1e1e2e" : "white",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "10px",
            border: `1px solid ${isDarkMode ? "#3a3a5c" : "#d1d5db"}`,
            backgroundColor: isDarkMode ? "#2a2a3e" : "white",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            color: isDarkMode ? "#e0e0e0" : undefined,
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = isDarkMode ? "#3a3a5c" : "#f9fafb";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = isDarkMode ? "#2a2a3e" : "white";
          }}
        >
          <ArrowLeft size={20} />
        </button>
        <div style={{ flex: 1 }}>
          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: "700",
              color: isDarkMode ? "#e0e0e0" : "#111827",
            }}
          >
            Call Monitor
          </h1>
          {orderData && (
            <p
              style={{
                margin: "8px 0 0 0",
                fontSize: "14px",
                color: isDarkMode ? "#9ca3af" : "#6b7280",
              }}
            >
              Order ID:{" "}
              <span style={{ fontWeight: "500", color: isDarkMode ? "#e0e0e0" : "#374151" }}>
                {orderData.id || orderData.order_id}
              </span>{" "}
              | User ID:{" "}
              <span style={{ fontWeight: "500", color: isDarkMode ? "#e0e0e0" : "#374151" }}>
                {orderData.user_id}
              </span>
              {assignedUserId && (
                <>
                  {" "}
                  | Assigned User:{" "}
                  <span style={{ fontWeight: "500", color: isDarkMode ? "#e0e0e0" : "#374151" }}>
                    {assignedUserId}
                  </span>
                </>
              )}
            </p>
          )}
        </div>

        <div
          style={{ marginLeft: "20px", position: "relative" }}
          className="filter-button-wrapper"
        >
          <Button
            variant="contained"
            style={{
              backgroundColor: "#c01313ff",
              color: "white",
            }}
            onClick={handleSaveCompleteOrder}
          >
            Complete Order
          </Button>

          <Button
            variant="contained"
            style={{
              backgroundColor: "#6165d0ff",
              color: "white",
              marginLeft: "20px",
            }}
            onClick={handleSaveInactiveConsultant}
          >
            Inactive Consultant
          </Button>
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
