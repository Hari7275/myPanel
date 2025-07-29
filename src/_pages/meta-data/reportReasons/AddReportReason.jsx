import React, { useState } from "react";
import ReactModal from "react-modal";
import { useCreateReportReasonMutation } from "../../../_store/api";

const AddReportReason = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    parent_id: 0,
    text: "",
    type: "text",
    status: "active",
  });

  const [createData, { isLoading }] = useCreateReportReasonMutation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    const newData = {
      parent_id: formData.parent_id,
      text: formData.text,
      type: formData.type,
      status: formData.status,
    };

    try {
      await createData({ body: newData });
      onClose();
    } catch (error) {
      console.log("Failed to add new report reason", error);
    }
  };

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
          Add Reason
        </h2>



        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Report Reason
          </label>
          <input
            type="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder="text"
            className="userProfile-input-field"
          />
        </div>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Status *
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="userProfile-input-field"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>Type :</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="userProfile-input-field"
          >
            <option value="text">Text</option>
            <option value="select">Select</option>
          </select>
        </div>

        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <button
            className="fifthButton"
            style={{ marginRight: "10px", backgroundColor: "green" }}
            onClick={handleSubmit}
          >
            {"Submit"}
          </button>
          <button
            className="fifthButton"
            style={{}}
            onClick={onClose}
          >
            Back
          </button>

        </div>
      </div>
    </ReactModal>
  );
};

export default AddReportReason;
