import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateCoachSkillsMutation } from "../../../_store/api";

const UpdateData = ({ label, type, id, name, value, onChange, readOnly }) => (
  <div className="input-container">
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="info-input"
      readOnly={readOnly}
    />
  </div>
);

const UpdateCoachSkills = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    id: selectedRow?.id || "",
    category_id: selectedRow.category_id || "",
    skill_name: selectedRow?.skill_name || "",
    icon: selectedRow?.icon || "",
    status: selectedRow?.status || "",
  });


  const [updateCard, { isLoading: isUpdating, error }] =
    useUpdateCoachSkillsMutation();

  useEffect(() => {
    if (selectedRow) {
      const { id, category_id, skill_name, status } = selectedRow;
      setFormData({
        id: id || "",
        category_id: category_id || "",
        skill_name: skill_name || "",
        icon: "",
        status: status || "",
      });
    }
  }, [selectedRow]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "icon" && files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        icon: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("skill_name", formData.skill_name);
    formDataToSend.append("category_id", formData.category_id);

    // Only append the icon if a new one is selected
    if (formData.icon) {
      formDataToSend.append("icon", formData.icon);
    }

    formDataToSend.append("status", formData.status);

    try {
      await updateCard({
        id: formData.id,
        body: formDataToSend,
      });

      onClose();
    } catch (error) {
      console.error("API Error", error);
    }
  };

  if (!isOpen) return null;

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
      aria-labelledby="update-promotional-card-title"
    >
      <div style={{ width: "400px" }}>
        <h2
          className="sub-heading"
          id="update-promotional-card-title"
          style={{
            marginBottom: "20px",
            display: "block",
            backgroundColor: "#f0f0f0",
            textAlign: "center",
          }}
        >
          Update Skill
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <UpdateData
            label="Category id"
            type="number"
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            readOnly
          />

          <UpdateData
            label="Skill Name"
            type="text"
            id="skill_name"
            name="skill_name"
            value={formData.skill_name}
            onChange={handleChange}
          />
          <UpdateData
            label="Card Icon"
            type="file"
            id="icon"
            name="icon"
            onChange={handleChange}
          />
        </div>

        <div style={{ marginTop: "30px", textAlign: 'center' }}>
          <button
            className="fifthButton"
            style={{ marginRight: "10px", backgroundColor: "green" }}
            onClick={handleSave}
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save"}
          </button>
          <button
            className="fifthButton"
            style={{}}
            onClick={onClose}
          >
            Back
          </button>
        </div>
        {error && <p className="error-message">Error: {error?.message}</p>}
      </div>
    </ReactModal>
  );
};

export default UpdateCoachSkills;
