import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateSupportQuestionMutation } from "../../../../_store/api";
import { UpdateInputField } from "../../../../_components/ui/inputForm";
import toast from "react-hot-toast";

const UpdateExecutive = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    support_type: selectedRow?.support_type || "",
    title: selectedRow?.title || "",
    is_active: selectedRow?.is_active || true,
  });

  const [updateData, { isLoadng: isUpdating, error }] =
    useUpdateSupportQuestionMutation();

  useEffect(() => {
    if (selectedRow) {
      setFormData({
        support_type: selectedRow?.support_type,
        title: selectedRow?.title,
        is_active: selectedRow?.is_active,
      });
    }
  }, [selectedRow]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Convert support_type to a number and is_active to a boolean
      const updatedFormData = {
        ...formData,
        support_type: Number(formData.support_type), // Convert to number
        is_active: formData.is_active === "true", // Convert to boolean
      };

      const response = await updateData({
        id: selectedRow?.id,
        body: updatedFormData,
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
          Update Support Question
        </h2>

        <UpdateInputField
          label="Support Type"
          id="support_type"
          name="support_type"
          value={formData.support_type}
          onChange={handleChange}
        />

        <UpdateInputField
          label="Support Title"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <div className="input-container">
          <label htmlFor="gender">Status</label>
          <select
            id="is_active"
            name="is_active"
            value={formData?.is_active}
            onChange={handleChange}
            className="info-input"
            style={{
              width: "100%",
              height: "56px",
              borderRadius: "inherit",
            }}
          >
            <option value="">Select status</option>
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
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

export default UpdateExecutive;
