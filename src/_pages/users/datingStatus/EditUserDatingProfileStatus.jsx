import React, { useState } from "react";
import ReactModal from "react-modal";
import { useUpdateUserDatingStatusMutation } from "../../../_store/api";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const rejectionReasons = [
  // 🖼️ PHOTO REJECTION REASONS
  {
    label: "Vulgar or sexually suggestive photo",
    message:
      "Your profile photo was rejected as it contains sexually suggestive or inappropriate content. Please upload respectful, appropriate pictures.",
  },
  {
    label: "Contains phone number or contact info (Photo)",
    message:
      "Your photo was rejected because it includes contact information or numbers. Please remove any text or numbers and re-upload.",
  },
  {
    label: "Contains text, watermark, or logo",
    message:
      "Your photo was rejected because it includes text, watermark, or logo. Please upload a clean image without added elements.",
  },
  {
    label: "Poor quality or unclear photo",
    message:
      "Your profile photo was unclear or low quality. Please upload a clear, recent photo showing your face properly.",
  },
  {
    label: "Irrelevant image (not user’s face)",
    message:
      "Your photo doesn’t appear to show you clearly. Please upload a picture that genuinely represents you.",
  },
  {
    label: "Group photo or misleading identity",
    message:
      "Your photo includes multiple people or doesn’t clearly identify you. Please upload a solo photo of yourself.",
  },
  {
    label: "Celebrity or known public figure photo",
    message:
      "Your photo appears to be of a celebrity or public figure. Please upload your own picture to ensure authenticity.",
  },
  {
    label: "Duplicate or reused image from the web",
    message:
      "Your photo seems to be taken from the internet. Please use your own original pictures.",
  },
  {
    label: "Filtered or excessively edited photo",
    message:
      "Your photo appears overly filtered or heavily edited. Please upload a natural, unfiltered image.",
  },
  {
    label: "Inappropriate pose or gesture",
    message:
      "Your profile picture includes a pose or gesture that doesn’t align with Flute’s guidelines. Please choose a more neutral image.",
  },
  {
    label: "Not as per Flute photo standards",
    message:
      "Your photo didn’t meet Flute’s quality and content standards. Please upload a better image that represents you respectfully.",
  },

  // ✍️ TEXT / BIO / PROMPT REJECTION REASONS
  {
    label: "Vulgar or offensive language",
    message:
      "Your profile text was rejected as it contained vulgar or offensive language. Please rewrite it respectfully.",
  },
  {
    label: "Contains phone number or contact info (Text/Bio)",
    message:
      "Your bio or text includes contact information, which isn’t allowed on Flute. Please remove it and resubmit.",
  },
  {
    label: "Contains links or external handles",
    message:
      "Your bio contains links or external handles. Please keep all communication within the Flute app.",
  },
  {
    label: "Suggestive or adult content",
    message:
      "Your bio or answers included suggestive or adult content. Please modify them to align with Flute’s guidelines.",
  },
  {
    label: "Misleading or false information",
    message:
      "Your profile information seems inaccurate or misleading. Please ensure your details are genuine.",
  },
  {
    label: "Promoting external services or apps",
    message:
      "Your text promotes an external service or app, which isn’t allowed. Please update your profile accordingly.",
  },
  {
    label: "Incomplete bio or empty prompts",
    message:
      "Your profile was rejected because it’s incomplete. Please fill in your bio and prompts to get approved.",
  },
  {
    label: "Poorly written or irrelevant text",
    message:
      "Your profile text was unclear or irrelevant. Please rewrite it thoughtfully to express your personality.",
  },
  {
    label: "Not aligned with Flute’s values or tone",
    message:
      "Your content didn’t align with Flute’s respectful and authentic community standards. Please edit and resubmit.",
  },
  {
    label: "Duplicate or copied content",
    message:
      "Your profile text appears copied or reused. Please write original responses in your own words.",
  },
];

const EditUserDatingProfileStatus = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const { userId } = useParams();

  const [updateStatus, { isLoading: isUpdating, error: updateError }] =
    useUpdateUserDatingStatusMutation();

  const handleChange = (e) => {
    setFormData(e.target.value);
    if (e.target.value !== "10") {
      setReason("");
      setMessage("");
    }
  };

  const handleReasonChange = (e) => {
    const selectedReason = rejectionReasons.find(
      (item) => item.label === e.target.value
    );
    setReason(selectedReason?.label || "");
    setMessage(selectedReason?.message || "");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const body = {
        user_id: userId,
        id: Number(formData),
      };

      if (formData === "10" && reason) {
        body.reason = reason;
        body.message = message; // send message to API
      }

      const payload = {
        user_id: userId,
        id: Number(formData),
        body, // 👈 send body inside payload
      };

      const response = await updateStatus(payload).unwrap();

      if (response.status) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }

      onClose();
      setFormData("");
      setReason("");
      setMessage("");
    } catch (error) {
      toast.error(`${error?.data?.message}. Please log in again.`);
      console.error("Failed to update status:", error);
    }
  };

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
    >
      <div style={{ width: "350px", height: "400px" }}>
        <h2
          className="sub-heading"
          style={{
            marginBottom: "20px",
            display: "flex",
            backgroundColor: "#f0f0f0",
            justifyContent: "center",
          }}
        >
          Edit Status
        </h2>

        <form
          className="simple-form"
          noValidate
          autoComplete="off"
          onSubmit={handleSave}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="input-container">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData}
              onChange={handleChange}
              className="userProfile-input-field"
              aria-describedby="status-desc"
            >
              <option value="">Select Status</option>
              <option value="1">Uncreated</option>
              <option value="2">Active</option>
              <option value="3">Inactive</option>
              <option value="4">Blocked</option>
              <option value="5">Suspended</option>
              <option value="6">Terminated</option>
              <option value="7">Deleted</option>
              <option value="10">Rejected</option>
            </select>
          </div>

          {formData === "10" && (
            <div className="input-container">
              <label htmlFor="reason">Reject Reason</label>
              <select
                id="reason"
                name="reason"
                value={reason}
                onChange={handleReasonChange}
                className="userProfile-input-field"
                required
              >
                <option value="">Select Reason</option>
                {rejectionReasons.map((r, idx) => (
                  <option key={idx} value={r.label}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div
            style={{
              marginTop: "70px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              type="submit"
              className="fifthButton"
              style={{ marginRight: "10px" }}
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="fifthButton"
              style={{ background: "red", marginLeft: "10px" }}
              onClick={() => {
                setFormData("");
                setReason("");
                setMessage("");
                onClose();
              }}
              disabled={isUpdating}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </ReactModal>
  );
};

export default EditUserDatingProfileStatus;
