import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateUserSupportRequestMutation } from "../../../../_store/api";
import { UpdateInputField } from "../../../../_components/ui/inputForm";
import toast from "react-hot-toast";

const UpdateSupportRequest = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    user_id: selectedRow?.user_id || "",
    status: Number(selectedRow?.status),
  });
  console.log("selectedRow", selectedRow);

  const [updateData, { isLoading: isUpdating, error }] =
    useUpdateUserSupportRequestMutation();

  useEffect(() => {
    if (selectedRow) {
      setFormData({
        status: selectedRow?.status,
        user_id: selectedRow?.user_id,
      });
    }
  }, [selectedRow]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "status" ? Number(value) : value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await updateData({
        id: selectedRow?.id,
        body: formData,
      });

      if (response?.data?.status === true) {
        toast.success(response?.data?.message);
        onClose();
      }

      console.log("response..", response);

      if (response?.data?.status === false) {
        toast.error(response?.data?.message);
        return;
      }
      if (response?.error?.data?.status === false) {
        toast.error(response?.error?.data?.message);
        return;
      }
    } catch (error) {
      console.log("API Error", error);
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
          Update User Support Request
        </h2>

        <UpdateInputField
          label=" User Id"
          id="user_id"
          name="user_id"
          value={formData?.user_id}
          onChange={handleChange}
        />

        <div style={{ margin: "25px 0 0 10px", fontSize: "18px" }}>
          <input
            type="radio"
            name="status"
            value={2}
            checked={formData.status == 2}
            onChange={handleChange}
            style={{ marginRight: "10px", transform: "scale(1.25)" }}
          />

          <label>Closed</label>
        </div>

        <div style={{ marginTop: "30px" }}>
          <button
            className="fifthButton"
            style={{ marginRight: "10px" }}
            onClick={onClose}
          >
            Back
          </button>
          <button
            className="fifthButton"
            style={{ backgroundColor: "green" }}
            onClick={handleSave}
            // disabled={isUpdating}
          >
            {"Save"}
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default UpdateSupportRequest;
