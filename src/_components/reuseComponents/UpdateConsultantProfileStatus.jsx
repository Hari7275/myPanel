import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateConsultantProfileStatusMutation } from "../../_store/api";
import toast from "react-hot-toast";

const UpdateConsultantProfileStatus = ({
  isOpen,
  onClose,
  selectedRow,
  selectedData,
  consultantId,
}) => {
  const [formData, setFormData] = useState("");

  // Status dropdown options (always static)
  const statusOptions = [
    { id: 1, status_value: "active", status_name: "Active" },
    { id: 2, status_value: "inactive", status_name: "InActive" },
  ];

  // Set selected status string based on numeric value
  useEffect(() => {
    if (selectedData === 1) {
      setFormData("inactive");
    } else if (selectedData === 0) {
      setFormData("active");
    }
  }, [selectedData]);

  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateConsultantProfileStatusMutation();

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // const statusNumber = formData === "active" ? "inactive" : "active";

    try {
      const response = await updateStatus({
        id: consultantId,
        body: { status: formData },
      }).unwrap();

      console.log("response", response);
      if (response.status) {
        toast.success(response.message);
        onClose();
      } else {
        toast.error(response.message);
        return;
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Update failed");
    }
  };

  // Filter options based on selectedData
  const filteredOptions = statusOptions.filter((option) => {
    if (selectedData === 1) {
      return option.status_value === "inactive";
    } else if (selectedData === 0) {
      return option.status_value === "active";
    }
    return false;
  });

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
          Update Profile Status
        </h2>

        <form onSubmit={handleSave} className="simple-form" noValidate>
          <div className="input-container">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData}
              onChange={handleChange}
              className="userProfile-input-field"
            >
              {filteredOptions.map((status) => (
                <option key={status.id} value={status.status_value}>
                  {status.status_name}
                </option>
              ))}
            </select>

            {/* <p style={{ marginTop: "10px" }}>
              Select a status for the consultant.
            </p> */}
          </div>

          <div style={{ margin: "120px 0 0 40px" }}>
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
              onClick={onClose}
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

export default UpdateConsultantProfileStatus;
