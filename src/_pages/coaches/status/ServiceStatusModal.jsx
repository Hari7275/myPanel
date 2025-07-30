import React, { useState } from "react";
import ReactModal from "react-modal";
import { useUpdateDisplayStatusMutation } from "../../../_store/api";
import toast from "react-hot-toast";
import { getFetaureLabel } from "../../../_constants/consultantConstant";

const ServiceStatusModal = ({ isOpen, onClose, service, onSuccess }) => {
  const [updateDisplayStatus] = useUpdateDisplayStatusMutation();
  const [loading, setLoading] = useState(false);

  const isHiding = service?.newDisplayStatus === 0;
  const actionText = isHiding ? "Hide" : "Show";
  const statusValue = service?.newDisplayStatus;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const body = {
        id: service.id,
        body: {
          status: statusValue,
        },
      };

      const response = await updateDisplayStatus(body).unwrap();

      if (response?.status) {
        toast.success(
          response.message ||
          `Service ${actionText.toLowerCase()}n successfully!`
        );
        // onSuccess(service.id, statusValue);
        onClose();
      } else {
        toast.error(response.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Failed to update status", error);
      toast.error(error?.data?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div style={{ width: "500px" }}>
        <h2
          className="sub-heading"
          style={{
            marginBottom: "20px",
            display: "block",
            color: "#000001c8",
            textAlign: "center",
          }}
        >
          Are you sure you want to{" "}
          <span
            style={{ fontWeight: "bold", color: isHiding ? "red" : "green" }}
          >
            {actionText}
          </span>{" "}
          the{" "}
          <span style={{ color: "rgb(237 70 223)", fontSize: "24px" }}>
            {getFetaureLabel(service?.type)}
          </span>{" "}
          service from display?
        </h2>

        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <button
            className="fifthButton"
            style={{ backgroundColor: "green", marginRight: "10px" }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Processing..." : "Yes"}
          </button>
          <button
            className="fifthButton back-Button"
            style={{}}
            onClick={onClose}
            disabled={loading}
          >
            No
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default ServiceStatusModal;
