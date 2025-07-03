import React, { useState } from "react";
import ReactModal from "react-modal";
import { useCreatePermissionMutation } from "../../../_store/api";
import { UpdateInputField } from "../../../_components/ui/inputForm";
import toast from "react-hot-toast";

const AddAdminPermission = ({ isOpen, onClose, group_id }) => {
  const [formData, setFormData] = useState({
    name: "",
    group_id: Number(group_id),
    status: "active",
  });

  const [createData, { isLoading: isUpdating }] = useCreatePermissionMutation();

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
          Create Permission
        </h2>

        <form className="simple-form" noValidate autoComplete="off">
          <div style={{ display: "flex" }}>
            <UpdateInputField
              label="Permisssion Name"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {/* <UpdateInputField
              label="Group id"
              type="text"
              id="group_id"
              name="group_id"
              value={formData.group_id}
              onChange={handleChange}
              readonly
            /> */}
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

export default AddAdminPermission;
