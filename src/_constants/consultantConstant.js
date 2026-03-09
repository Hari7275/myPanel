// constants.js

export const getGenderLabel = (value) => {
  switch (value) {
    case 1:
      return "Male";
    case 2:
      return "Female";
    case 3:
      return "Other";
    default:
      return "Unknown";
  }
};

export const getGenderLabelInSort = (value) => {
  switch (value) {
    case 1:
      return "M";
    case 2:
      return "F";
    case 3:
      return "O";
    default:
      return "Unknown";
  }
};

export const getMaritalStatus = (value) => {
  switch (value) {
    case 1:
      return "Single";
    case 2:
      return "Married";
    case 3:
      return "Divorced";
    case 4:
      return "Separated";
    case 5:
      return "Widowed";
    default:
      return "Status is not defined";
  }
};

export const getConsultantTypes = (value) => {
  switch (value) {
    case 1:
      return "Astrologer";
    case 2:
      return "Coach";
    case 3:
      return "Listener";
    default:
      return "Unknown";
  }
};

export const getCategoryTypes = (value) => {
  switch (value) {
    case 1:
      return "Chat";
    case 2:
      return "Audio Call";
    case 3:
      return "Video Call";
    case 4:
      return "Anonymous Call";
    case 5:
      return "Private Call";
    case 6:
      return "Gift";
    case 7:
      return "Live Chat";
    case 8:
      return "Live Audio";
    case 9:
      return "Live Video";
    case 10:
      return "Session Chat";
    case 11:
      return "Session Audio Call";
    case 12:
      return "Session Video Call";
    case 13:
      return "Payout";
    default:
      return "unknown";
  }
};

export const getStatusLabel = (value) => {
  switch (value) {
    case 1:
      return "Registered";
    case 2:
      return "Pending";
    case 3:
      return "Verified";
    case 4:
      return "Suspended";
    case 5:
      return "Blocked";
    case 6:
      return "Rejected";
    case 7:
      return "Deleted";
    case 8:
      return "Inactive";
    default:
      return "Unknown";
  }
};

export const getPriceStatusLabel = (value) => {
  switch (value) {
    case 1:
      return "Pending";
    case 2:
      return "Confirmed";
    case 3:
      return "Canceled";
    case 4:
      return "Rejected";
    case 5:
      return "Price Changed";
    case 6:
      return "Approved";
    case 7:
      return "Default";

    default:
      return "Unknown";
  }
};

export const getConsultantPriceCategory = (value) => {
  switch (value) {
    case 1:
      return "A";
    case 2:
      return "B";
    case 3:
      return "C";
    case 4:
      return "D";

    default:
      return "Unknown";
  }
};

export const getFetaureLabel = (value) => {
  switch (value) {
    case 1:
      return "Chat";
    case 2:
      return "Audio Call";
    case 3:
      return "Video Call";
    case 4:
      return "Anonymous Call";
    case 5:
      return "Private Call";
    case 6:
      return "Live";
    case 7:
      return "Live Chat";
    case 8:
      return "Live Audio";
    case 9:
      return "Live Video";
    case 10:
      return "Session Chat";
    case 11:
      return "Session Audio Call";
    case 12:
      return "Session Video Call";
    default:
      return "unknown";
  }
};

export const getServiceStatusLabel = (value) => {
  switch (value) {
    case 1:
      return "Chat";
    case 2:
      return "Audio Call";
    case 3:
      return "Video Call";
    case 4:
      return "Anonymous Call";
    case 5:
      return "Private Call";
    case 6:
      return "Live";
    case 7:
      return "Live Video Call";
    case 8:
      return "Live Audio Call";
    case 9:
      return "Live Chat";
    // case 10:
    //   return "Session Chat";
    // case 11:
    //   return "Session Audio Call";
    // case 12:
    //   return "Session Video Call";
    default:
      return "unknown";
  }
};
export const UserVerificationStatus = (value) => {
  switch (Number(value)) {
    case 1:
      return "Active";
    case 2:
      return "Inactive";
    case 3:
      return "Blocked";
    case 4:
      return "Deleted";

    default:
      return "unknown";
  }
};

export const getUserVerificationColor = (value) => {
  switch (Number(value)) {
    case 1: // Active
      return "#4CAF50"; // Green
    case 2: // Inactive
      return "#FF9800"; // Orange
    case 3: // Blocked
      return "#F44336"; // Red
    case 4: // Deleted
      return "#F44336"; // Grey
    default:
      return "#000000"; // Black
  }
};

// consultant gallery section

export const ConsultantGalleryType = (value) => {
  switch (Number(value)) {
    case 1:
      return "Active";
    case 2:
      return "Inactive";
    case 3:
      return "Blocked";

    default:
      return "unknown";
  }
};

export const ConsultantGalleryStatus = (value) => {
  switch (Number(value)) {
    case 1:
      return "Pending";
    case 2:
      return "Approved";
    case 3:
      return "Rejected";

    default:
      return "unknown";
  }
};

export const OrderType = (value) => {
  switch (Number(value)) {
    case 1:
      return "Chat";
    case 2:
      return "Audio Call";
    case 3:
      return "Video Call";
    case 4:
      return "Anonymous Call";
    case 5:
      return "Private Call";
    case 6:
      return "Gift";
    case 7:
      return "Live Chat";
    case 8:
      return "Live Audio Call";
    case 9:
      return "Live Video Call";
    case 10:
      return "Session Chat";
    case 11:
      return "Session Audio Call";
    case 12:
      return "Session Video Call";
    default:
      return "unknown";
  }
};

export const OrderStatus = (value) => {
  switch (Number(value)) {
    case 1:
      return "Pending";
    case 2:
      return "Confirmed";
    case 3:
      return "Running";
    case 4:
      return "Completed";
    case 5:
      return "User Cancelled";
    case 6:
      return "Consultant Rejected";
    case 7:
      return "Waiting";
    case 8:
      return "User not responded";
    case 9:
      return "Consultant not responded";
  }
};

export const getStatusColor = (value) => {
  switch (Number(value)) {
    case 1:
      return "#F59E0B"; // Amber - Pending
    case 2:
      return "#22c55e"; // Green - Confirmed
    case 3:
      return "#818CF8"; // Indigo - Running
    case 4:
      return "#34D399"; // Emerald - Completed (was #008000, brighter for dark mode)
    case 5:
      return "#F87171"; // Red - User Cancelled
    case 6:
      return "#FB7185"; // Rose - Consultant Rejected
    case 7:
      return "#FCD34D"; // Yellow - Waiting
    case 8:
      return "#FB923C"; // Orange - User Not Responded
    case 9:
      return "#F97316"; // Deep Orange - Consultant Not Responded
    default:
      return "#94A3B8"; // Slate - Unknown
  }
};

export const getStatusColorConsultant = (value) => {
  switch (Number(value)) {
    case 1: // Registered
      return "#1976D2"; // Blue (registered/new account)

    case 2: // Pending
      return "#cd9a01ff"; // Amber / Yellow (pending / in-progress)

    case 3: // Verified
      return "#4CAF50"; // Green (verified / success)

    case 4: // Suspended
      return "#FF9800"; // Orange (suspended — warning)

    case 5: // Blocked
      return "#D32F2F"; // Red (blocked — severe)

    case 6: // Rejected
      return "#B71C1C"; // Darker red (rejected — final negative)

    case 7: // Deleted
      return "#9E9E9E"; // Grey (deleted / removed)

    case 8: // Inactive
      return "#BDBDBD"; // Light grey (inactive / idle)

    default:
      return "#808080"; // Unknown → fallback grey
  }
};

export const statusNameToValue = {
  Registered: 1,
  Pending: 2,
  Verified: 3,
  Suspended: 4,
  Blocked: 5,
  Rejected: 6,
  Deleted: 7,
};

export const COMPLETED_BY_MAP = {
  1: "User",
  2: "User (Consultant Left)",
  3: "Consultant",
  4: "Consultant (User Left)",
  5: "Admin",
  6: "System",
  7: "User (Token Expired)",
  8: "Consultant (Token Expired)",
  9: "Event (User Left)",
  10: "Event (Consultant Left)",
};

export const COMPLETED_BY_COLOR_MAP = {
  1: "#2563eb",
  2: "#60a5fa",
  3: "#a31616",
  4: "#4ade80",
  5: "#9333ea",
  6: "#6b7280",
  7: "#ef4444",
  8: "#ef4444",
  9: "#f97316",
  10: "#f97316",
};
