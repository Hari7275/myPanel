import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateReportReasonMutation } from "../../../_store/api";
import { UpdateInputField } from "../../../_components/ui/inputForm";

const UpdateReportReason = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    user_id: selectedRow?.user_id || "",
    text: selectedRow?.text || "",
    type: selectedRow?.type || "text",
  });

  const [updateData, { isLoadng: isUpdating, error }] =
    useUpdateReportReasonMutation();

  useEffect(() => {
    if (selectedRow) {
      setFormData({
        rate_B: selectedRow?.rate_B,
        rating: selectedRow?.rating,
        type: selectedRow?.type,
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
      await updateData({
        id: selectedRow.id,
        body: formData,
      });
      onClose();
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
          Update report reason
        </h2>

        <UpdateInputField
          label="Report Reason"
          id="text"
          name="text"
          value={formData.text}
          onChange={handleChange}
        />

        <div className="input-container">
          <label htmlFor="gender">Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="info-input"
            style={{
              width: "100%",
              height: "56px",
              borderRadius: "inherit",
            }}
          >
            <option value="select">Select</option>
            <option value="text">Text</option>
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

export default UpdateReportReason;
