// AgoraAudienceCall.jsx - Simplified version
import React, { useState, useEffect } from "react";
import {
  RemoteUser,
  useIsConnected,
  useJoin,
  useRemoteUsers,
  useRTCClient,
} from "agora-rtc-react";
import { Volume2, VolumeX, PhoneOff, Phone, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";

const AgoraAudienceCall = ({ appId, channel, token, uid }) => {
  const [calling, setCalling] = useState(false);
  const [error, setError] = useState(null);
  const isConnected = useIsConnected();
  const remoteUsers = useRemoteUsers();
  const client = useRTCClient();

  // Log client for debugging
  useEffect(() => {
    console.log("Client in AgoraAudienceCall:", client);
    console.log("Client type:", typeof client);
    console.log("Has 'on' method:", client && typeof client.on === "function");
  }, [client]);

  // Join channel - this will trigger when calling becomes true
  useJoin(
    {
      appid: appId,
      channel: channel,
      token: token || null,
      uid: uid,
    },
    calling
  );

  const handleJoinChannel = () => {
    if (!appId || !channel) {
      const errorMsg = "Missing App ID or Channel Name";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    // Clear any previous errors
    setError(null);

    // Log credentials for debugging
    console.log("Attempting to join with:", {
      appId: appId.substring(0, 8) + "...",
      channel,
      hasToken: !!token,
      tokenLength: token ? token.length : 0,
      uid: uid || "auto",
    });

    setCalling(true);
    toast.info("Joining channel...");
  };

  const handleLeaveChannel = () => {
    setCalling(false);
    setError(null);
    toast.success("Left the channel");
  };

  // Monitor connection status
  useEffect(() => {
    if (isConnected) {
      toast.success("Successfully connected to the channel!");
      setError(null);
    }
  }, [isConnected]);

  // Handle client events for errors
  useEffect(() => {
    if (!client) return;

    const handleError = (err) => {
      console.error("Agora client error:", err);
      setError(err.message || "An error occurred");
      setCalling(false);
      toast.error(`Error: ${err.message}`);
    };

    const handleConnectionStateChange = (curState, prevState, reason) => {
      console.log(`Connection: ${prevState} → ${curState}, reason: ${reason}`);

      if (curState === "DISCONNECTED" && calling) {
        setError("Disconnected from channel");
        setCalling(false);
      }

      if (curState === "CONNECTED") {
        setError(null);
      }
    };

    client.on("exception", handleError);
    client.on("connection-state-change", handleConnectionStateChange);

    return () => {
      client.off("exception", handleError);
      client.off("connection-state-change", handleConnectionStateChange);
    };
  }, [client, calling]);

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "24px",
        border: "1px solid #e5e7eb",
      }}
    >
      {/* Error Display */}
      {error && (
        <div
          style={{
            marginBottom: "20px",
            padding: "16px",
            backgroundColor: "#fee2e2",
            border: "1px solid #fca5a5",
            borderRadius: "8px",
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
          }}
        >
          <AlertCircle
            size={20}
            color="#dc2626"
            style={{ flexShrink: 0, marginTop: "2px" }}
          />
          <div>
            <div
              style={{
                fontWeight: "600",
                color: "#dc2626",
                marginBottom: "4px",
              }}
            >
              Connection Error
            </div>
            <div style={{ fontSize: "14px", color: "#991b1b" }}>{error}</div>
            {error.includes("token") && (
              <div
                style={{
                  fontSize: "13px",
                  color: "#7f1d1d",
                  marginTop: "8px",
                }}
              >
                💡 <strong>Possible solutions:</strong>
                <ul style={{ marginTop: "4px", paddingLeft: "20px" }}>
                  <li>Check if the token is valid and not expired</li>
                  <li>Verify token was generated for this channel name</li>
                  <li>Ensure token was generated with "audience" role</li>
                  <li>If testing, disable App Certificate in Agora console</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Connection Status */}
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: isConnected ? "#10b981" : "#6b7280",
              boxShadow: isConnected
                ? "0 0 8px rgba(16, 185, 129, 0.6)"
                : "none",
            }}
          />
          <span style={{ fontSize: "18px", fontWeight: "600" }}>
            {isConnected
              ? "Connected as Audience"
              : calling
              ? "Connecting..."
              : "Ready to Join"}
          </span>
        </div>
        <p
          style={{
            margin: "0 0 0 24px",
            fontSize: "14px",
            color: "#6b7280",
          }}
        >
          {isConnected
            ? "🎧 Your microphone is muted. You can only listen to the call."
            : "Click 'Join Channel' to listen to the ongoing call"}
        </p>
      </div>

      {/* Remote Users Display */}
      {isConnected && (
        <div
          style={{
            marginBottom: "24px",
            padding: "16px",
            backgroundColor: "#f9fafb",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
          }}
        >
          <h3
            style={{
              margin: "0 0 12px 0",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Active Speakers ({remoteUsers.length})
          </h3>
          {remoteUsers.length > 0 ? (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {remoteUsers.map((user) => (
                <div
                  key={user.uid}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <Volume2 size={20} color="#10b981" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "500", fontSize: "14px" }}>
                      User {user.uid}
                    </div>
                    <div style={{ fontSize: "12px", color: "#6b7280" }}>
                      {user.hasAudio ? "🔊 Speaking" : "🔇 Muted"}
                    </div>
                  </div>
                  {/* This renders the audio track */}
                  <RemoteUser user={user} playVideo={false} playAudio={true} />
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#6b7280",
                fontSize: "14px",
                padding: "12px",
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            >
              <VolumeX size={18} />
              <span>No active speakers in the channel</span>
            </div>
          )}
        </div>
      )}

      {/* Control Button */}
      <div style={{ display: "flex", gap: "12px" }}>
        {!isConnected ? (
          <button
            onClick={handleJoinChannel}
            disabled={!appId || !channel || calling}
            style={{
              flex: 1,
              padding: "16px",
              backgroundColor: calling ? "#9ca3af" : "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: !appId || !channel || calling ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              opacity: !appId || !channel ? 0.5 : 1,
            }}
          >
            <Phone size={20} />
            {calling ? "Joining..." : "Join Channel as Audience"}
          </button>
        ) : (
          <button
            onClick={handleLeaveChannel}
            style={{
              flex: 1,
              padding: "16px",
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <PhoneOff size={20} />
            Leave Channel
          </button>
        )}
      </div>

      {/* Info Note */}
      <div
        style={{
          marginTop: "20px",
          padding: "12px",
          backgroundColor: "#eff6ff",
          borderRadius: "6px",
          border: "1px solid #bfdbfe",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            color: "#1e40af",
            lineHeight: "1.5",
          }}
        >
          💡 <strong>Note:</strong> You are joining as an audience member
          (listen-only mode). Your microphone will remain muted throughout the
          call.
        </p>
      </div>

      {/* Debug Info */}
      {process.env.NODE_ENV === "development" && (
        <details
          style={{ marginTop: "16px", fontSize: "12px", color: "#6b7280" }}
        >
          <summary style={{ cursor: "pointer", fontWeight: "500" }}>
            Debug Information
          </summary>
          <pre
            style={{
              marginTop: "8px",
              padding: "12px",
              backgroundColor: "#f9fafb",
              borderRadius: "4px",
              overflow: "auto",
            }}
          >
            {JSON.stringify(
              {
                appId: appId ? `${appId.substring(0, 8)}...` : "missing",
                channel: channel || "missing",
                hasToken: !!token,
                tokenLength: token ? token.length : 0,
                uid: uid || "auto",
                isConnected,
                calling,
                remoteUsersCount: remoteUsers.length,
                clientRole: "audience",
                hasClient: !!client,
              },
              null,
              2
            )}
          </pre>
        </details>
      )}
    </div>
  );
};

export default AgoraAudienceCall;
