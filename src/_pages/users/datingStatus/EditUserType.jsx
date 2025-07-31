import React, { useState } from "react";
import ReactModal from "react-modal";
import { useUpdateUserTypeMutation } from "../../../_store/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const EditUserType = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState("");
  const userId = useSelector((state) => state.user.userData);

  const [updateStatus, { isLoading: isUpdating, error: updateError }] =
    useUpdateUserTypeMutation();

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await updateStatus({
        user_id: userId,
        body: { user_type: Number(formData) }, // Wrap user_type in an object
      });

      if (response.data.status == true) {
        toast.success(response.data.message);
        onClose();
      } else {
        toast.error(response.data.message);
      }

      setFormData("");
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
          Edit User Type
        </h2>
        <form
          className="simple-form"
          noValidate
          autoComplete="off"
          onSubmit={handleSave}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: 'center'
          }}
        >
          <div className="input-container">
            <label htmlFor="user_type">Update User Type</label>
            <select
              id="user_type"
              name="user_type"
              value={formData}
              onChange={handleChange}
              className="userProfile-input-field"
              aria-describedby="user_type"
            >
              <option value="">Select Status</option>
              <option value={0}>External</option>
              <option value={1}>Internal</option>
            </select>
            <p style={{ margin: "20px 20px" }}>Select a User Type.</p>
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
            {updateError?.data?.message || "Failed to update status."}
          </p>
        )}
      </div>
    </ReactModal>
  );
};

export default EditUserType;
