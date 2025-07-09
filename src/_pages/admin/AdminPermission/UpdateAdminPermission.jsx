import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdatePermissionMutation } from "../../../_store/api";
import { UpdateInputField } from "../../../_components/ui/inputForm";
import toast from "react-hot-toast";

const UpdateAdminPermission = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    name: "",
    status: "active",
  });

  const [updateData, { isLoading: isUpdating }] = useUpdatePermissionMutation();

  // Sync form data with selectedRow
  useEffect(() => {
    if (selectedRow) {
      setFormData({
        name: selectedRow.name || "",
        status: selectedRow.status || "active",
      });
    }
  }, [selectedRow]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await updateData({
        id: selectedRow.id,
        body: formData,
      });

      if (response?.data?.status) {
        toast.success(response?.data?.message || "Group updated successfully!");
        onClose(); // Close the modal on success
      } else {
        toast.error(
          response?.data?.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("Failed to update group", error);
      toast.error(error?.data?.message || "An unexpected error occurred.");
    }
  };

  if (!isOpen) return null;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="overlay"
      ariaHideApp={false} // avoid accessibility warning
    >
      <div style={{ width: "500px" }}>
        <h2
          className="sub-heading"
          style={{
            marginBottom: "20px",
            display: "block",
            backgroundColor: "#f0f0f0",
            textAlign: "center",
          }}
        >
          Update Permission
        </h2>

        <form
          className="simple-form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div style={{ display: "flex" }}>
            <UpdateInputField
              label="Permission Name"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="input-container" style={{ marginTop: "20px" }}>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="info-input"
              style={{
                width: "100%",
                height: "56px",
                borderRadius: "4px",
                padding: "10px",
                border: "1px solid #ccc",
              }}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div
            style={{
              marginTop: "20px",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <button
              type="button"
              className="fifthButton"
              style={{ marginRight: "10px" }}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="fifthButton"
              style={{ backgroundColor: "green" }}
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </ReactModal>
  );
};

export default UpdateAdminPermission;
