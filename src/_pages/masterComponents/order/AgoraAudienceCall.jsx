// AgoraAudienceCall.jsx - Redesigned Layout with 3 Rows
import React, { useState, useEffect } from "react";
import {
  RemoteUser,
  useIsConnected,
  useJoin,
  useRemoteUsers,
  useRTCClient,
} from "agora-rtc-react";
import {
  Volume2,
  VolumeX,
  PhoneOff,
  Phone,
  AlertCircle,
  Video,
  VideoOff,
  Users,
  Radio,
} from "lucide-react";
import { toast } from "react-toastify";
import { useTheme } from "../../../_context/ThemeContext";

const AgoraAudienceCall = ({ appId, channel, token, uid }) => {
  const [calling, setCalling] = useState(false);
  const [error, setError] = useState(null);
  const { isDarkMode } = useTheme();
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
      uid: uid || 3,
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

    setError(null);
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
        width: "100%",
        padding: "0",
        height: "100vh",
        overflowY: "auto",
        boxSizing: "border-box",
      }}
    >
      {/* Error Display */}
      {error && (
        <div
          style={{
            marginBottom: "20px",
            padding: "16px",
            backgroundColor: isDarkMode ? "#3b0f0f" : "#fee2e2",
            border: `1px solid ${isDarkMode ? "#7f1d1d" : "#fca5a5"}`,
            borderRadius: "12px",
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
          }}
        >
          <AlertCircle
            size={20}
            color={isDarkMode ? "#f87171" : "#dc2626"}
            style={{ flexShrink: 0, marginTop: "2px" }}
          />
          <div>
            <div
              style={{
                fontWeight: "600",
                color: isDarkMode ? "#f87171" : "#dc2626",
                marginBottom: "4px",
              }}
            >
              Connection Error
            </div>
            <div style={{ fontSize: "14px", color: isDarkMode ? "#fca5a5" : "#991b1b" }}>{error}</div>
          </div>
        </div>
      )}

      {/* ROW 1: Call Information */}
      <div
        style={{
          backgroundColor: isDarkMode ? "#13131f" : "#f9fafb",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "20px",
          border: `1px solid ${isDarkMode ? "#2a2a3e" : "#e5e7eb"}`,
        }}
      >
        <h3
          style={{
            margin: "0 0 16px 0",
            fontSize: "18px",
            fontWeight: "600",
            color: isDarkMode ? "#e0e0e0" : "#111827",
          }}
        >
          Call Information
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "12px",
          }}
        >
          {[
            { label: "Channel", value: channel, mono: false },
            { label: "App ID", value: appId ? `${appId.substring(0, 8)}...` : "N/A", mono: true, small: true },
            { label: "UID", value: uid || "Auto-assign", mono: true, small: true },
            { label: "Token", value: token ? `${token.substring(0, 15)}...` : "No token", mono: true, small: true, overflow: true },
            { label: "Mode", value: "👁️ Audience (Watch & Listen Only)", mono: false },
          ].map(({ label, value, mono, small, overflow }) => (
            <div key={label}>
              <div style={{ fontSize: "13px", color: isDarkMode ? "#9ca3af" : "#6b7280", marginBottom: "4px" }}>
                {label}
              </div>
              <div
                style={{
                  fontSize: small ? (label === "Token" ? "12px" : "14px") : "15px",
                  color: isDarkMode ? "#e0e0e0" : "#111827",
                  fontWeight: label === "Channel" || label === "Mode" ? "500" : undefined,
                  fontFamily: mono ? "monospace" : undefined,
                  overflow: overflow ? "hidden" : undefined,
                  textOverflow: overflow ? "ellipsis" : undefined,
                  whiteSpace: overflow ? "nowrap" : undefined,
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ROW 2: Three Column Layout */}
      {isConnected ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr 1fr",
            gap: "20px",
            marginBottom: "20px",
          }}
          className="main-content-row"
        >
          {/* COLUMN 1: User Details & Channel Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Connection Status */}
            <div
              style={{
                backgroundColor: isDarkMode ? "#1e1e2e" : "white",
                padding: "20px",
                borderRadius: "12px",
                border: `1px solid ${isDarkMode ? "#2a2a3e" : "#e5e7eb"}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "#10b981",
                    boxShadow: "0 0 8px rgba(16, 185, 129, 0.6)",
                  }}
                />
                <span style={{ fontSize: "16px", fontWeight: "600", color: isDarkMode ? "#e0e0e0" : undefined }}>
                  Connected
                </span>
              </div>
              <p
                style={{
                  margin: "0",
                  fontSize: "13px",
                  color: isDarkMode ? "#9ca3af" : "#6b7280",
                  lineHeight: "1.5",
                }}
              >
                🎧 You can see and hear others, but they cannot see or hear you.
              </p>
            </div>

            {/* Channel Details */}
            <div
              style={{
                backgroundColor: isDarkMode ? "#1e1e2e" : "white",
                padding: "20px",
                borderRadius: "12px",
                border: `1px solid ${isDarkMode ? "#2a2a3e" : "#e5e7eb"}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <Radio size={18} color="#3b82f6" />
                <h4 style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: isDarkMode ? "#e0e0e0" : "#111827" }}>
                  Channel Details
                </h4>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <div style={{ fontSize: "12px", color: isDarkMode ? "#9ca3af" : "#6b7280", marginBottom: "4px" }}>
                    Channel Name
                  </div>
                  <div style={{ fontSize: "14px", color: isDarkMode ? "#e0e0e0" : "#111827", fontWeight: "500" }}>
                    {channel}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: isDarkMode ? "#9ca3af" : "#6b7280", marginBottom: "4px" }}>
                    Your UID
                  </div>
                  <div style={{ fontSize: "14px", color: isDarkMode ? "#e0e0e0" : "#111827", fontFamily: "monospace" }}>
                    {uid || "Auto-assigned"}
                  </div>
                </div>
              </div>
            </div>

            {/* Remote Users List */}
            <div
              style={{
                backgroundColor: isDarkMode ? "#1e1e2e" : "white",
                padding: "20px",
                borderRadius: "12px",
                border: `1px solid ${isDarkMode ? "#2a2a3e" : "#e5e7eb"}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <Users size={18} color="#3b82f6" />
                <h4 style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: isDarkMode ? "#e0e0e0" : "#111827" }}>
                  Active Participants
                </h4>
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: "14px",
                    color: isDarkMode ? "#9ca3af" : "#6b7280",
                    backgroundColor: isDarkMode ? "#13131f" : "#f3f4f6",
                    padding: "2px 8px",
                    borderRadius: "12px",
                  }}
                >
                  {remoteUsers.length}
                </span>
              </div>
              {remoteUsers.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {remoteUsers.map((user) => (
                    <div
                      key={user.uid}
                      style={{
                        padding: "12px",
                        backgroundColor: isDarkMode ? "#13131f" : "#f9fafb",
                        borderRadius: "8px",
                        border: `1px solid ${isDarkMode ? "#2a2a3e" : "#e5e7eb"}`,
                      }}
                    >
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: isDarkMode ? "#e0e0e0" : "#111827",
                          marginBottom: "6px",
                        }}
                      >
                        User {user.uid}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          fontSize: "12px",
                          color: isDarkMode ? "#9ca3af" : "#6b7280",
                        }}
                      >
                        {user.hasVideo ? (
                          <Video size={14} color="#10b981" />
                        ) : (
                          <VideoOff size={14} color={isDarkMode ? "#4b5563" : "#9ca3af"} />
                        )}
                        <span>{user.hasVideo ? "Video On" : "Video Off"}</span>
                        <span>•</span>
                        {user.hasAudio ? (
                          <Volume2 size={14} color="#10b981" />
                        ) : (
                          <VolumeX size={14} color={isDarkMode ? "#4b5563" : "#9ca3af"} />
                        )}
                        <span>{user.hasAudio ? "Audio On" : "Audio Off"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    padding: "16px",
                    textAlign: "center",
                    color: isDarkMode ? "#4b5563" : "#9ca3af",
                    fontSize: "13px",
                  }}
                >
                  No participants yet
                </div>
              )}
            </div>
          </div>

          {/* COLUMN 2: First Remote User Video */}
          <div
            style={{
              backgroundColor: "#1f2937",
              borderRadius: "12px",
              overflow: "hidden",
              border: "2px solid #374151",
              position: "relative",
              aspectRatio: "9/16",
              maxHeight: "calc(100vh - 400px)",
            }}
          >
            {remoteUsers[0] ? (
              <>
                <RemoteUser
                  user={remoteUsers[0]}
                  playVideo={true}
                  playAudio={true}
                  style={{ width: "100%", height: "100%" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    padding: "12px 16px",
                    background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ fontWeight: "600", fontSize: "14px", color: "white" }}>
                    User {remoteUsers[0].uid}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {remoteUsers[0].hasVideo ? (
                      <Video size={18} color="#10b981" />
                    ) : (
                      <VideoOff size={18} color="#6b7280" />
                    )}
                    {remoteUsers[0].hasAudio ? (
                      <Volume2 size={18} color="#10b981" />
                    ) : (
                      <VolumeX size={18} color="#6b7280" />
                    )}
                  </div>
                </div>
                {!remoteUsers[0].hasVideo && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      textAlign: "center",
                      color: "#9ca3af",
                    }}
                  >
                    <VideoOff size={48} style={{ marginBottom: "8px" }} />
                    <div style={{ fontSize: "14px" }}>Camera Off</div>
                  </div>
                )}
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  color: "#9ca3af",
                }}
              >
                <Users size={48} style={{ marginBottom: "12px" }} />
                <div style={{ fontSize: "14px" }}>Waiting for participant 1...</div>
              </div>
            )}
          </div>

          {/* COLUMN 3: Second Remote User Video */}
          <div
            style={{
              backgroundColor: "#1f2937",
              borderRadius: "12px",
              overflow: "hidden",
              border: "2px solid #374151",
              position: "relative",
              aspectRatio: "9/16",
              maxHeight: "calc(100vh - 400px)",
            }}
          >
            {remoteUsers[1] ? (
              <>
                <RemoteUser
                  user={remoteUsers[1]}
                  playVideo={true}
                  playAudio={true}
                  style={{ width: "100%", height: "100%" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    padding: "12px 16px",
                    background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ fontWeight: "600", fontSize: "14px", color: "white" }}>
                    User {remoteUsers[1].uid}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {remoteUsers[1].hasVideo ? (
                      <Video size={18} color="#10b981" />
                    ) : (
                      <VideoOff size={18} color="#6b7280" />
                    )}
                    {remoteUsers[1].hasAudio ? (
                      <Volume2 size={18} color="#10b981" />
                    ) : (
                      <VolumeX size={18} color="#6b7280" />
                    )}
                  </div>
                </div>
                {!remoteUsers[1].hasVideo && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      textAlign: "center",
                      color: "#9ca3af",
                    }}
                  >
                    <VideoOff size={48} style={{ marginBottom: "8px" }} />
                    <div style={{ fontSize: "14px" }}>Camera Off</div>
                  </div>
                )}
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  color: "#9ca3af",
                }}
              >
                <Users size={48} style={{ marginBottom: "12px" }} />
                <div style={{ fontSize: "14px" }}>Waiting for participant 2...</div>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Before Connection State
        <div
          style={{
            backgroundColor: isDarkMode ? "#1e1e2e" : "white",
            padding: "60px 20px",
            borderRadius: "12px",
            border: `2px dashed ${isDarkMode ? "#3a3a5c" : "#e5e7eb"}`,
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <Radio size={64} color={isDarkMode ? "#4b5563" : "#9ca3af"} style={{ marginBottom: "16px" }} />
          <h3
            style={{
              margin: "0 0 8px 0",
              fontSize: "20px",
              fontWeight: "600",
              color: isDarkMode ? "#e0e0e0" : "#111827",
            }}
          >
            {calling ? "Connecting to Channel..." : "Ready to Join"}
          </h3>
          <p style={{ margin: "0", fontSize: "14px", color: isDarkMode ? "#9ca3af" : "#6b7280" }}>
            Click the button below to join as an audience member
          </p>
        </div>
      )}

      {/* ROW 3: Control Buttons */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {!isConnected ? (
          <button
            onClick={handleJoinChannel}
            disabled={!appId || !channel || calling}
            style={{
              flex: 1,
              minWidth: "200px",
              padding: "16px 24px",
              backgroundColor: calling ? "#9ca3af" : "#10b981",
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
            {calling ? "Joining Channel..." : "Join Channel"}
          </button>
        ) : (
          <button
            onClick={handleLeaveChannel}
            style={{
              flex: 1,
              minWidth: "200px",
              padding: "16px 24px",
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

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1200px) {
          .main-content-row {
            grid-template-columns: 280px 1fr 1fr !important;
          }
        }

        @media (max-width: 992px) {
          .main-content-row {
            grid-template-columns: 1fr 1fr !important;
          }
          .main-content-row > div:first-child {
            grid-column: 1 / -1 !important;
          }
        }

        @media (max-width: 768px) {
          .main-content-row {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .main-content-row > div {
            grid-column: 1 / -1 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AgoraAudienceCall;
