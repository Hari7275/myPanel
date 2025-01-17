import React, { useState } from "react";
import ReactModal from "react-modal";
import { useUpdateLiveStreamStatusMutation } from "../../_store/api";

const EditLiveStreamStatus = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState("");

  //   const { data: fetchData, error: fetchError } = useGetConsultantStatusQuery();
  const [updateStatus, { isLoading: isUpdating, error: updateError }] =
    useUpdateLiveStreamStatusMutation();

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!selectedRow) {
      console.error("Selected row is not valid.");
      return;
    }

    const payload = {
      status: Number(formData),
    };

    try {
      await updateStatus({ id: selectedRow, body: payload });
      onClose();
    } catch (error) {
      console.error("Failed to update status:", error);
      if (error.data) {
        console.error("API Error Data:", error.data);
      }
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
              <option value="2">Running</option>
              <option value="3">Finished</option>
              {/* <option value="4">Cancelled</option> */}
            </select>
            <p style={{ marginTop: "20px" }}>
              Select a status for the consultant.
            </p>
          </div>

          <div style={{ margin: "120px 0 0 40px" }}>
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
              onClick={onClose}
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

export default EditLiveStreamStatus;
