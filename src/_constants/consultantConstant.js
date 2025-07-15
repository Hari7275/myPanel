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
      return "Privat Call";
    case 6:
      return "Gifts";
    case 7:
      return "Live Video Call";
    case 8:
      return "Live Audio Call";
    case 9:
      return "Live Chat";
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
      return "Cancelled";
    case 6:
      return "Rejected";
    case 7:
      return "Waiting";
    case 8:
      return "USER_NOT_RESPONDED";
    case 9:
      return "CONSULTANT_NOT_RESPONDED";
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
