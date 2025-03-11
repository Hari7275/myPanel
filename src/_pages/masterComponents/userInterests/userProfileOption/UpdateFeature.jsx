import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdatePromptMutation } from "../../../../_store/api";

const UpdateFeature = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    id: selectedRow?.id || "",
    name: selectedRow?.profile_value || "",
    parent_key: selectedRow.profile_feature,
    image: selectedRow?.image,
  });

  const [updateData, { isLoading: isUpdating }] = useUpdatePromptMutation();

  useEffect(() => {
    if (selectedRow) {
      setFormData({
        id: selectedRow?.id || "",
        name: selectedRow?.profile_value || "",
        parent_key: selectedRow?.profile_feature || "",
        image: selectedRow?.image,
      });
    }
  }, [selectedRow]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
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
    formDataToSend.append("name", formData.name);
    formDataToSend.append("id", formData.id);
    formDataToSend.append("parent_key", formData.parent_key);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      await updateData({
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
          Update Passion
        </h2>
        <div className="input-container">
          <label htmlFor="id">Id</label>
          <input
            type="number"
            id="id"
            name="id"
            value={formData.id}
            className="info-input"
            readOnly
          />
        </div>
        <div className="input-container">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="info-input"
          />
        </div>

        <div className="input-container">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            className="info-input"
          />
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
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </ReactModal>
  );
};
export default UpdateFeature;
