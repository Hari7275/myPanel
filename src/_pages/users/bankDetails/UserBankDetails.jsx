import React, { useState, useEffect } from "react";

import { useGetUserBankListQuery } from "../../../_store/api";
import { useSelector } from "react-redux";
import { Pencil } from "lucide-react";
import UpdateAccountStatus from "./UpdateAccountStatus";

const UserBankDetails = () => {
  const userId = useSelector((state) => state.user.userData);

  const [data, setData] = useState([]);
  const [showAccountStatus, setShowAccountStatus] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const { data: fetchData } = useGetUserBankListQuery(userId);

  useEffect(() => {
    console.log("fetchData?.data", fetchData?.data);
    if (fetchData) {
      setData(fetchData?.data);
    } else {
      setData([]);
    }
  }, [fetchData]);

  // Default data if none provided
  const bankData = data;
  // Format date?
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get status badge styles
  const getStatusStyles = (status) => {
    switch (status) {
      case "pending":
        return { backgroundColor: "#fef3c7", color: "#92400e" };
      case "approved":
        return { backgroundColor: "#d1fae5", color: "#065f46" };
      case "rejected":
        return { backgroundColor: "#fee2e2", color: "#991b1b" };
      default:
        return { backgroundColor: "#f3f4f6", color: "#4b5563" };
    }
  };

  const handleShowUpdateStatus = () => {
    setSelectedRow(bankData);
    setShowAccountStatus(!showAccountStatus);
  };

  // Styles
  const styles = {
    wrapper: {
      maxWidth: "800px",
      margin: "0 auto",
    },
    accountCard: {
      backgroundColor: "white",
      borderRadius: "16px",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      overflow: "hidden",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    },
    cardHeader: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      padding: "24px",
      position: "relative",
      overflow: "hidden",
    },
    accountTitle: {
      fontSize: "24px",
      fontWeight: "600",
      marginBottom: "8px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    bankIcon: {
      width: "32px",
      height: "32px",
      background: "rgba(255, 255, 255, 0.2)",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    accountSubtitle: {
      fontSize: "16px",
      opacity: 0.9,
    },
    statusBadge: {
      display: "inline-flex",
      position: "relative",
      alignItems: "center",
      gap: "6px",
      padding: "6px 12px",
      borderRadius: "20px",
      fontSize: "14px",
      fontWeight: "500",
      marginTop: "12px",
      ...getStatusStyles(bankData?.status),
    },
    cardBody: {
      padding: "24px",
    },
    infoGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      marginBottom: "24px",
    },
    infoItem: {
      background: "#f8fafc",
      padding: "16px",
      borderRadius: "12px",
      border: "1px solid #e5e7eb",
      transition: "all 0.2s ease",
    },
    infoLabel: {
      fontSize: "12px",
      color: "#6b7280",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      marginBottom: "4px",
      fontWeight: "600",
    },
    infoValue: {
      fontSize: "16px",
      color: "#1f2937",
      fontWeight: "500",
      wordBreak: "break-all",
    },
    documentsSection: {
      marginTop: "32px",
      paddingTop: "24px",
      borderTop: "1px solid #e5e7eb",
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: "16px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    documentsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "16px",
    },
    documentCard: {
      background: "#f8fafc",
      border: "2px dashed #e5e7eb",
      borderRadius: "12px",
      padding: "20px",
      textAlign: "center",
      cursor: "pointer",
      transition: "all 0.2s ease",
      position: "relative",
      overflow: "hidden",
    },
    documentIcon: {
      width: "48px",
      height: "48px",
      margin: "0 auto 12px",
      background: "#667eea",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
    },
    documentTitle: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: "4px",
    },
    documentStatus: {
      fontSize: "12px",
      color: "#6b7280",
    },
    timestamps: {
      marginTop: "24px",
      padding: "16px",
      background: "#f8fafc",
      borderRadius: "12px",
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "16px",
    },
    timestampItem: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "14px",
      color: "#6b7280",
    },
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes shimmer {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div style={styles.wrapper}>
        <div style={styles.accountCard}>
          <div style={styles.cardHeader}>
            <div style={styles.headerShimmer}></div>
            <div style={styles.headerContent}>
              <div style={styles.accountTitle}>
                <div style={styles.bankIcon}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 21h18M3 10h18M5 21V10M9 21V10M15 21V10M19 21V10M12 7L3 2v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V2l-9 5z" />
                  </svg>
                </div>
                <span>{bankData?.bank_name} Bank Account</span>
              </div>
              <div style={styles.accountSubtitle}>
                {bankData?.account_holder_name} - {bankData?.account_type}{" "}
                Account
              </div>
              <div style={styles.statusBadge}>
                {bankData?.status}
                <button
                  className="edit-profile-active-status"
                  onClick={handleShowUpdateStatus}
                >
                  <Pencil
                    style={{
                      background: "none",
                      height: "14px",
                      width: "14px",
                    }}
                  />
                </button>{" "}
              </div>
            </div>
          </div>

          <div style={styles.cardBody}>
            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <div style={styles.infoLabel}>Account Number</div>
                <div style={styles.infoValue}>{bankData?.account_number}</div>
              </div>
              <div style={styles.infoItem}>
                <div style={styles.infoLabel}>IFSC Code</div>
                <div style={styles.infoValue}>{bankData?.ifsc_code}</div>
              </div>
              <div style={styles.infoItem}>
                <div style={styles.infoLabel}>Branch</div>
                <div style={styles.infoValue}>{bankData?.branch_name}</div>
              </div>
              <div style={styles.infoItem}>
                <div style={styles.infoLabel}>Account Type</div>
                <div style={styles.infoValue}>{bankData?.account_type}</div>
              </div>
            </div>

            <div style={styles.documentsSection}>
              <h3 style={styles.sectionTitle}>Uploaded Documents</h3>
              <div style={styles.documentsGrid}>
                <div
                  style={styles.documentCard}
                  onClick={() =>
                    window.open(bankData?.pan_card_photo, "_blank")
                  }
                >
                  <div style={styles.documentIcon}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="10"
                        rx="2"
                        ry="2"
                      ></rect>
                      <circle cx="12" cy="16" r="1"></circle>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <div style={styles?.documentTitle}>PAN Card</div>
                  <div style={styles?.documentStatus}>Click to view</div>
                </div>
                <div
                  style={styles.documentCard}
                  onClick={() =>
                    window.open(bankData?.passbook_photo, "_blank")
                  }
                >
                  <div style={styles.documentIcon}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <div style={styles.documentTitle}>Passbook</div>
                  <div style={styles.documentStatus}>Click to view</div>
                </div>
              </div>
            </div>

            <div style={styles.timestamps}>
              <div style={styles.timestampItem}>
                Created: {formatDate(bankData?.createdAt)}
              </div>
              <div style={styles.timestampItem}>
                Updated: {formatDate(bankData?.updatedAt)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAccountStatus && (
        <UpdateAccountStatus
          isOpen={showAccountStatus}
          onClose={handleShowUpdateStatus}
          currentStatus={selectedRow}
        />
      )}
    </div>
  );
};

export default UserBankDetails;
