import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateUserTypeMutation } from "../../../_store/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const UpdateRefferalCode = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState("");
  const userId = useSelector((state) => state.user.userData);

  const [updateStatus, { isLoading: isUpdating, error: updateError }] =
    useUpdateUserTypeMutation();

  // Initialize referral code when modal opens
  useEffect(() => {
    if (isOpen && selectedRow) {
      setFormData(selectedRow);
    }
  }, [isOpen, selectedRow]);

  const handleChange = (e) => {
    // Restrict to 6 characters max
    const value = e.target.value.slice(0, 6);
    setFormData(value);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Validation: must be exactly 6 characters
    if (formData.length !== 6) {
      toast.error("Referral code must be exactly 6 characters long");
      return;
    }

    try {
      const response = await updateStatus({
        user_id: userId,
        body: { referral_code: formData },
      });

      if (response.data.status === true) {
        toast.success(response.data.message);
        onClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
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
          Edit User Referral Code
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
          <div className="input-container" style={{ flex: 1 }}>
            <label htmlFor="referral_code">Referral Code</label>
            <input
              type="text"
              id="referral_code"
              name="referral_code"
              value={formData}
              onChange={handleChange}
              className="info-input"
              maxLength={6}
              style={{
                // textTransform: "uppercase",
                fontSize: "16px",
                letterSpacing: "2px",
                width: "100%",
                textAlign: "center",
              }}
            />
          </div>

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
              aria-label="Save changes"
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="fifthButton"
              style={{ background: "red", marginLeft: "10px" }}
              onClick={() => {
                setFormData("");
                onClose();
              }}
              disabled={isUpdating}
              aria-label="Cancel changes"
            >
              Cancel
            </button>
          </div>
        </form>

        {updateError && (
          <p style={{ color: "red" }}>
            {updateError?.data?.message || "Failed to update status."}
          </p>
        )}
      </div>
    </ReactModal>
  );
};

export default UpdateRefferalCode;
