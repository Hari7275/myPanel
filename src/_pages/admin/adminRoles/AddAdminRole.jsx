import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useCreateAdminRoleMutation } from "../../../_store/api";
import { UpdateInputField } from "../../../_components/ui/inputForm";
import toast from "react-hot-toast";

const AddAdminRole = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    status: "active",
  });

  const [updateData, { isLoading: isUpdating }] = useCreateAdminRoleMutation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await updateData({
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
      <div style={{ width: "350px" }}>
        <h2
          className="sub-heading"
          style={{
            marginBottom: "20px",
            display: "block",
            backgroundColor: "#f0f0f0",
            textAlign: "center",
          }}
        >
          Add new Role
        </h2>

        <form
          className="simple-form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <div style={{ display: "flex" }}>
            <UpdateInputField
              label="Role Name"
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
              textAlign: 'center'
            }}
          >
            <button
              type="submit"
              className="fifthButton"
              style={{ marginRight: "10px", backgroundColor: "green" }}
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="fifthButton"
              style={{ backgroundColor: 'red' }}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </ReactModal>
  );
};

export default AddAdminRole;
