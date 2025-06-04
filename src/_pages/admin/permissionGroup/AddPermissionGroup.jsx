import React, { useState } from "react";
import ReactModal from "react-modal";
import { useCreateAdminPermissionGroupMutation } from "../../../_store/api";
import { UpdateInputField } from "../../../_components/ui/inputForm";
import toast from "react-hot-toast";

const AddPermissionGroup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "active",
  });

  const [createData, { isLoading: isUpdating }] =
    useCreateAdminPermissionGroupMutation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await createData({ body: formData });
      console.log("reaposnse", response);

      if (response?.data?.status) {
        toast.success(response?.data?.message || "group added successfully!");
        onClose(); // Close the modal only on success
      } else {
        toast.error(
          response?.data?.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("Failed to add group", error);
      toast.error(error?.data?.message || "An unexpected error occurred.");
    }
  };

  if (!isOpen) return null;

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
            backgroundColor: "#f0f0f0",
            textAlign: "center",
          }}
        >
          Update Info
        </h2>

        <form className="simple-form" noValidate autoComplete="off">
          <div style={{ display: "flex" }}>
            <UpdateInputField
              label="Group Name"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <label
            htmlFor="description"
            style={{ width: "100%", marginTop: "20px" }}
          >
            Description:
          </label>
          <div style={{ width: "100%", marginTop: "4px" }}>
            <textarea
              style={{
                width: "100%",
                height: "150px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "14px",
                fontFamily: "'Arial', sans-serif",
                resize: "vertical",
              }}
              label="description"
              type="text"
              id="description"
              name="description"
              value={formData?.description}
              onChange={handleChange}
              placeholder="this is description field"
            />
          </div>

          <div className="input-container">
            <label htmlFor="status">status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="info-input"
              style={{
                width: "100%",
                height: "56px",
                borderRadius: "inherit",
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
              onClick={handleSubmit}
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

export default AddPermissionGroup;
