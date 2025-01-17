import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateConsultantPriceStatusMutation } from "../../_store/api";

const EditPriceStatus = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState("");

  const [updatePriceStatus, { isLoading: isUpdating, error: updateError }] =
    useUpdateConsultantPriceStatusMutation();

  // Populate the form data when the modal opens with the current status
  useEffect(() => {
    if (isOpen && selectedRow) {
      setFormData(selectedRow.status);
    }
  }, [isOpen, selectedRow]);

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!formData || formData === "") {
      console.error("Form data is empty or null. Cannot update status.");
      return;
    }

    try {
      const payload = { status: Number(formData), id: selectedRow.id };
      await updatePriceStatus(payload).unwrap();
      onClose();
      setFormData(""); // Reset form data on successful save
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
    >
      <div>
        <h2
          className="sub-heading"
          style={{
            marginBottom: "20px",
            display: "block",
            backgroundColor: "#f0f0f0",
          }}
        >
          Edit Price Status
        </h2>
        <form
          className="simple-form"
          noValidate
          autoComplete="off"
          onSubmit={handleSave}
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
              {/* <option value="1">Pending</option> */}
              <option value="4">Rejected</option>
              <option value="6">Approved</option>
            </select>
            <p style={{ marginTop: "30px" }}>Select a status for the User.</p>
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
                setFormData(""); // Reset form data on cancel
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
            {updateError.data?.message || "Failed to update status."}
          </p>
        )}
      </div>
    </ReactModal>
  );
};

export default EditPriceStatus;
