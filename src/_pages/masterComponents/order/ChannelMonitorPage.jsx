// ChannelMonitorPage.jsx - Monitor Agora channels using the same join-channel API as OrderLists
import React, { useState, useEffect, useMemo, useRef } from "react";
import AgoraRTC, {
  AgoraRTCProvider,
  useIsConnected,
  useJoin,
  useRemoteUsers,
  useRTCClient,
} from "agora-rtc-react";
import {
  Volume2,
  VolumeX,
  Video,
  VideoOff,
  Users,
  Radio,
  Phone,
  PhoneOff,
  AlertCircle,
  Search,
} from "lucide-react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useUpdateAgoraCredentialsToJoinCallMutation } from "../../../_store/api";
import { useTheme } from "../../../_context/ThemeContext";

const AGORA_APP_ID = "0bbb5db82c6b440f95944b3fda1f9bd1"; // production
// const AGORA_APP_ID = "ae97c0fbc8694bfdaca062b4ec86b5f8"; // dev

// ─── Inner component (must be inside AgoraRTCProvider) ────────────────────────
const ChannelMonitorContent = ({ credentials, onAutoLeave, hideEmpty, adminUids, isDarkMode }) => {
  const [calling, setCalling] = useState(false);
  const [error, setError] = useState(null);

  const isConnected = useIsConnected();
  const remoteUsers = useRemoteUsers();
  const client = useRTCClient();

  // Filter out other admins monitoring the same channel
  const visibleUsers = remoteUsers.filter((u) => !adminUids?.has(u.uid));

  // Keep a ref so the setTimeout always reads the latest visible (non-admin) user count
  const remoteUsersRef = useRef(visibleUsers);
  // Track whether we've ever seen non-admin remote users after connecting
  const hadUsersRef = useRef(false);

  useEffect(() => {
    remoteUsersRef.current = visibleUsers;
    if (visibleUsers.length > 0) {
      hadUsersRef.current = true;
    }
  }, [visibleUsers]);

  // Auto-join when credentials arrive; leave when they are cleared
  useEffect(() => {
    if (credentials) {
      setCalling(true);
      setError(null);
      hadUsersRef.current = false; // reset for each new channel join
    } else {
      setCalling(false);
      setError(null);
    }
  }, [credentials]);

  // After connecting, wait 4s — if still no non-admin remote users, auto-leave
  useEffect(() => {
    if (!isConnected) return;

    const timer = setTimeout(() => {
      if (remoteUsersRef.current.length === 0) {
        setCalling(false);
        onAutoLeave();
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [isConnected]);

  // When connected and all users leave after having been present → auto-exit after 4s
  useEffect(() => {
    if (!isConnected || !hadUsersRef.current || visibleUsers.length > 0) return;

    const timer = setTimeout(() => {
      // Double-check via ref in case users rejoined during the 4s wait
      if (remoteUsersRef.current.length === 0) {
        setCalling(false);
        onAutoLeave("All users have left the channel.");
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [isConnected, remoteUsers.length]);

  useJoin(
    credentials
      ? {
          appid: credentials.appId,
          channel: credentials.channel,
          token: credentials.token || null,
          uid: credentials.uid || 0,
        }
      : { appid: "", channel: "", token: null, uid: 0 },
    calling && !!credentials
  );

  // Clear error once connected
  useEffect(() => {
    if (isConnected) setError(null);
  }, [isConnected]);

  // Agora client error / disconnect handling
  useEffect(() => {
    if (!client) return;

    const handleError = (err) => {
      console.error("Agora error:", err);
      setError(err.message || "Connection error");
      setCalling(false);
      toast.error(`Agora error: ${err.message}`);
    };

    const handleStateChange = (curState, prevState, reason) => {
      console.log(`Connection: ${prevState} → ${curState} (${reason})`);
      if (curState === "DISCONNECTED" && calling) {
        setError("Disconnected from channel");
        setCalling(false);
      }
      if (curState === "CONNECTED") setError(null);
    };

    client.on("exception", handleError);
    client.on("connection-state-change", handleStateChange);
    return () => {
      client.off("exception", handleError);
      client.off("connection-state-change", handleStateChange);
    };
  }, [client, calling]);

  if (!credentials) {
    if (hideEmpty) return null;
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px 20px",
          backgroundColor: isDarkMode ? "#1e1e2e" : "white",
          borderRadius: "12px",
          border: `2px dashed ${isDarkMode ? "#3a3a5c" : "#e5e7eb"}`,
          color: isDarkMode ? "#6b7280" : "#9ca3af",
        }}
      >
        <Radio size={56} style={{ marginBottom: "16px" }} />
        <h3
          style={{
            margin: "0 0 8px 0",
            fontSize: "18px",
            fontWeight: "600",
            color: isDarkMode ? "#9ca3af" : "#6b7280",
          }}
        >
          No Channel Selected
        </h3>
        <p style={{ margin: 0, fontSize: "14px" }}>
          Enter an Order ID above and click Join to get channel active users.
        </p>
      </div>
    );
  }

  if (calling && !isConnected) {
    return (
      <div>
        {error && <ErrorBanner error={error} isDarkMode={isDarkMode} />}
        <div
          style={{
            textAlign: "center",
            padding: "80px 20px",
            backgroundColor: isDarkMode ? "#1e1e2e" : "white",
            borderRadius: "12px",
            border: `2px dashed ${isDarkMode ? "#1e3a5f" : "#bfdbfe"}`,
            color: "#3b82f6",
          }}
        >
          <Radio size={56} style={{ marginBottom: "16px" }} />
          <h3
            style={{
              margin: "0 0 8px 0",
              fontSize: "18px",
              fontWeight: "600",
              color: isDarkMode ? "#e0e0e0" : undefined,
            }}
          >
            Connecting to &ldquo;{credentials.channel}&rdquo;...
          </h3>
          <p style={{ margin: 0, fontSize: "14px", color: isDarkMode ? "#9ca3af" : "#6b7280" }}>
            Joining as observer — please wait
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {error && <ErrorBanner error={error} isDarkMode={isDarkMode} />}

      {/* Connected status bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
          padding: "14px 20px",
          backgroundColor: isDarkMode ? "#064e3b" : "#ecfdf5",
          border: `1px solid ${isDarkMode ? "#065f46" : "#a7f3d0"}`,
          borderRadius: "12px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#10b981",
              boxShadow: "0 0 6px rgba(16,185,129,0.6)",
              flexShrink: 0,
            }}
          />
          <span style={{ fontWeight: "600", color: isDarkMode ? "#34d399" : "#065f46", fontSize: "15px" }}>
            Connected to: {credentials.channel}
          </span>
        </div>
        <span
          style={{
            backgroundColor: isDarkMode ? "#065f46" : "#d1fae5",
            color: isDarkMode ? "#34d399" : "#065f46",
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <Users size={14} />
          {visibleUsers.length} active user{visibleUsers.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Users grid */}
      {visibleUsers.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "16px",
          }}
        >
          {visibleUsers.map((user) => (
            <div
              key={user.uid}
              style={{
                backgroundColor: isDarkMode ? "#1e1e2e" : "white",
                border: `1px solid ${isDarkMode ? "#2a2a3e" : "#e5e7eb"}`,
                borderRadius: "12px",
                padding: "20px",
                boxShadow: isDarkMode
                  ? "0 1px 3px rgba(0,0,0,0.3)"
                  : "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  backgroundColor: isDarkMode ? "#1a2a3a" : "#eff6ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "12px",
                }}
              >
                <Users size={24} color="#3b82f6" />
              </div>

              <div
                style={{
                  fontWeight: "700",
                  fontSize: "16px",
                  color: isDarkMode ? "#e0e0e0" : "#111827",
                  marginBottom: "4px",
                }}
              >
                User {user.uid}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: isDarkMode ? "#6b7280" : "#9ca3af",
                  marginBottom: "14px",
                  fontFamily: "monospace",
                }}
              >
                UID: {user.uid}
              </div>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <StatusBadge
                  active={user.hasVideo}
                  iconOn={<Video size={13} color="#10b981" />}
                  iconOff={<VideoOff size={13} color={isDarkMode ? "#4b5563" : "#9ca3af"} />}
                  labelOn="Video On"
                  labelOff="Video Off"
                  isDarkMode={isDarkMode}
                />
                <StatusBadge
                  active={user.hasAudio}
                  iconOn={<Volume2 size={13} color="#10b981" />}
                  iconOff={<VolumeX size={13} color={isDarkMode ? "#4b5563" : "#9ca3af"} />}
                  labelOn="Audio On"
                  labelOff="Audio Off"
                  isDarkMode={isDarkMode}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            backgroundColor: isDarkMode ? "#1e1e2e" : "white",
            borderRadius: "12px",
            border: `1px solid ${isDarkMode ? "#2a2a3e" : "#e5e7eb"}`,
            color: isDarkMode ? "#6b7280" : "#9ca3af",
          }}
        >
          <Users size={48} style={{ marginBottom: "12px" }} />
          <p style={{ margin: "0 0 6px 0", fontSize: "15px", fontWeight: "500" }}>
            No active users in this channel
          </p>
          <p style={{ margin: 0, fontSize: "13px" }}>
            The channel is connected but no users are currently publishing.
          </p>
        </div>
      )}
    </div>
  );
};

// ─── Small helpers ─────────────────────────────────────────────────────────────
const StatusBadge = ({ active, iconOn, iconOff, labelOn, labelOff, isDarkMode }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "5px",
      padding: "5px 12px",
      borderRadius: "20px",
      backgroundColor: active
        ? isDarkMode ? "#064e3b" : "#ecfdf5"
        : isDarkMode ? "#1a1a2e" : "#f3f4f6",
      border: `1px solid ${active
        ? isDarkMode ? "#065f46" : "#a7f3d0"
        : isDarkMode ? "#2a2a3e" : "#e5e7eb"}`,
    }}
  >
    {active ? iconOn : iconOff}
    <span
      style={{
        fontSize: "12px",
        fontWeight: "500",
        color: active
          ? isDarkMode ? "#34d399" : "#065f46"
          : isDarkMode ? "#6b7280" : "#6b7280",
      }}
    >
      {active ? labelOn : labelOff}
    </span>
  </div>
);

const ErrorBanner = ({ error, isDarkMode }) => (
  <div
    style={{
      marginBottom: "16px",
      padding: "12px 16px",
      backgroundColor: isDarkMode ? "#3b0f0f" : "#fee2e2",
      border: `1px solid ${isDarkMode ? "#7f1d1d" : "#fca5a5"}`,
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    }}
  >
    <AlertCircle size={18} color={isDarkMode ? "#f87171" : "#dc2626"} style={{ flexShrink: 0 }} />
    <div>
      <div style={{ fontWeight: "600", color: isDarkMode ? "#f87171" : "#dc2626", fontSize: "14px" }}>
        Connection Error
      </div>
      <div style={{ color: isDarkMode ? "#fca5a5" : "#991b1b", fontSize: "13px" }}>{error}</div>
    </div>
  </div>
);

// Mapping from admin user.id → the user_id used to join the channel
//for production
const ADMIN_USER_ID_MAP = {
  2: 1,
  3: 2,
  16: 152,
  20: 104,
};

// for dev
// const ADMIN_USER_ID_MAP = {
//   1: 1,
//   3: 2,
//   16:1552,
// };

// ─── Outer page ────────────────────────────────────────────────────────────────
const ChannelMonitorPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { isDarkMode } = useTheme();
  const [orderIdInput, setOrderIdInput] = useState("");
  const [credentials, setCredentials] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [noUsersMsg, setNoUsersMsg] = useState(null);

  const [fetchAgoraCredentials, { isLoading: isFetching }] =
    useUpdateAgoraCredentialsToJoinCallMutation();

  // Stable Agora client — same pattern as AudioCallPage
  const client = useMemo(() => {
    const c = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
    c.setClientRole("audience");
    return c;
  }, []);

  const handleJoin = async () => {
    const orderId = orderIdInput.trim();
    if (!orderId) {
      toast.error("Please enter an Order ID");
      return;
    }
    if (isNaN(Number(orderId))) {
      toast.error("Order ID must be a number");
      return;
    }
    const assignedUserId = ADMIN_USER_ID_MAP[user?.id];
    if (assignedUserId == null) {
      setFetchError("Invalid admin user. You are not authorized to monitor channels.");
      return;
    }

    setFetchError(null);
    setCredentials(null);
    setNoUsersMsg(null);

    try {
      toast.info("Fetching call credentials...");

      const response = await fetchAgoraCredentials({
        body: { user_id: assignedUserId, order_id: Number(orderId) },
      }).unwrap();

      // API returns HTTP 200 even for failures — check status flag
      if (response?.status === false || !response?.data) {
        const serverMsg = response?.message || "";
        const msg =
          serverMsg.toLowerCase() === "invalid order"
            ? "This order has been completed."
            : serverMsg || "Invalid response from server";
        setFetchError(msg);
        toast.error(msg);
        return;
      }

      const { channel, user_token, uid } = response.data;

      if (!channel) {
        const msg = "No channel returned from server";
        setFetchError(msg);
        toast.error(msg);
        return;
      }

      setCredentials({
        appId: AGORA_APP_ID,
        channel,
        token: user_token || null,
        uid: assignedUserId || uid || null,
      });

      toast.success("Credentials received — joining channel...");
    } catch (err) {
      const serverMsg = err?.data?.message || "";
      const msg =
        serverMsg.toLowerCase() === "invalid order"
          ? "This order has been completed "
          : serverMsg || "Failed to fetch credentials";
      setFetchError(msg);
      toast.error(msg);
    }
  };

  const handleLeave = () => {
    setCredentials(null);
    setOrderIdInput("");
    setFetchError(null);
    setNoUsersMsg(null);
  };

  const handleAutoLeave = (msg) => {
    setCredentials(null);
    const message = msg || "No active users found in this channel.";
    setNoUsersMsg(message);
    toast.info(message);
  };

  const isJoined = !!credentials;
  const adminUids = useMemo(() => new Set(Object.values(ADMIN_USER_ID_MAP)), []);

  return (
    <div
      style={{
        height: "calc(100vh - 64px)",
        overflowY: "auto",
        backgroundColor: isDarkMode ? "#0f0f1a" : "#f3f4f6",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      {/* Page header */}
      <div
        style={{
          backgroundColor: isDarkMode ? "#1e1e2e" : "white",
          borderRadius: "12px",
          padding: "20px 24px",
          marginBottom: "20px",
          border: `1px solid ${isDarkMode ? "#2a2a3e" : "#e5e7eb"}`,
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Radio size={22} color="#3b82f6" />
        <div>
          <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "700", color: isDarkMode ? "#e0e0e0" : "#111827" }}>
            Channel Info
          </h2>
          {/* <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: isDarkMode ? "#9ca3af" : "#6b7280" }}>
            Enter an Order ID to fetch credentials and join as an observer
          </p> */}
        </div>
      </div>

      {/* Input section */}
      <div
        style={{
          backgroundColor: isDarkMode ? "#1e1e2e" : "white",
          borderRadius: "12px",
          padding: "20px 24px",
          marginBottom: "20px",
          border: `1px solid ${isDarkMode ? "#2a2a3e" : "#e5e7eb"}`,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "flex-end",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: "160px", maxWidth: "300px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                color: isDarkMode ? "#9ca3af" : "#6b7280",
                marginBottom: "6px",
                fontWeight: "500",
              }}
            >
              Order ID
            </label>
            <input
              type="text"
              value={orderIdInput}
              onChange={(e) => setOrderIdInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isJoined && !isFetching) handleJoin();
              }}
              placeholder="Enter order ID ..."
              disabled={isJoined || isFetching}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "8px",
                border: `1px solid ${isDarkMode ? "#3a3a5c" : "#d1d5db"}`,
                fontSize: "14px",
                outline: "none",
                backgroundColor: isJoined || isFetching
                  ? isDarkMode ? "#13131f" : "#f9fafb"
                  : isDarkMode ? "#1e1e2e" : "white",
                color: isDarkMode ? "#e0e0e0" : "#111827",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Channel name (read-only, shown once credentials are fetched) */}
          {isJoined && (
            <div style={{ flex: 1, minWidth: "180px", maxWidth: "300px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  color: isDarkMode ? "#9ca3af" : "#6b7280",
                  marginBottom: "6px",
                  fontWeight: "500",
                }}
              >
                Channel
              </label>
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: `1px solid ${isDarkMode ? "#065f46" : "#a7f3d0"}`,
                  backgroundColor: isDarkMode ? "#064e3b" : "#ecfdf5",
                  fontSize: "14px",
                  color: isDarkMode ? "#34d399" : "#065f46",
                  fontWeight: "500",
                  fontFamily: "monospace",
                }}
              >
                {credentials.channel}
              </div>
            </div>
          )}

          {!isJoined ? (
            <button
              onClick={handleJoin}
              disabled={!orderIdInput.trim() || isFetching}
              style={{
                padding: "10px 24px",
                backgroundColor:
                  !orderIdInput.trim() || isFetching ? "#9ca3af" : "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                cursor:
                  !orderIdInput.trim() || isFetching ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                whiteSpace: "nowrap",
                height: "40px",
              }}
            >
              {isFetching ? (
                <>
                  <Search size={16} />
                  Fetching...
                </>
              ) : (
                <>
                  {/* <Phone size={16} /> */}
                  Check
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleLeave}
              style={{
                padding: "10px 24px",
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                whiteSpace: "nowrap",
                height: "40px",
              }}
            >
              {/* <PhoneOff size={16} /> */}
              Exit
            </button>
          )}
        </div>

        {/* Fetch error */}
        {fetchError && (
          <div
            style={{
              marginTop: "12px",
              padding: "10px 14px",
              backgroundColor: isDarkMode ? "#3b0f0f" : "#fee2e2",
              border: `1px solid ${isDarkMode ? "#7f1d1d" : "#fca5a5"}`,
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <AlertCircle size={16} color={isDarkMode ? "#f87171" : "#dc2626"} style={{ flexShrink: 0 }} />
            <span style={{ color: isDarkMode ? "#fca5a5" : "#991b1b", fontSize: "13px" }}>{fetchError}</span>
          </div>
        )}
      </div>

      {/* Agora content — always inside provider, inner component handles auto-join */}
      {/* No active users message */}
      {noUsersMsg && !credentials && (
        <div
          style={{
            marginBottom: "16px",
            padding: "16px 20px",
            backgroundColor: isDarkMode ? "#1a1500" : "#fffbeb",
            border: `1px solid ${isDarkMode ? "#78350f" : "#fcd34d"}`,
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Users size={20} color={isDarkMode ? "#fbbf24" : "#d97706"} style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: "600", color: isDarkMode ? "#fcd34d" : "#92400e", fontSize: "14px" }}>
              No Active Users
            </div>
            <div style={{ color: isDarkMode ? "#f59e0b" : "#b45309", fontSize: "13px" }}>{noUsersMsg}</div>
          </div>
        </div>
      )}

      <AgoraRTCProvider client={client}>
        <ChannelMonitorContent
          credentials={credentials}
          onAutoLeave={handleAutoLeave}
          hideEmpty={!!fetchError || !!noUsersMsg}
          adminUids={adminUids}
          isDarkMode={isDarkMode}
        />
      </AgoraRTCProvider>
    </div>
  );
};

export default ChannelMonitorPage;
