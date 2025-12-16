import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateGiftMutation } from "../../../_store/api";
import toast from "react-hot-toast";

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  readOnly,
}) => (
  <div className="input-container">
    <label htmlFor={label}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="info-input"
      readOnly={readOnly}
    />
  </div>
);

const UpdateGifts = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    id: selectedRow.id || "",
    name: selectedRow.name || "",
    description: selectedRow.description || "",
    image_url: selectedRow?.image_url,
    is_active: String(selectedRow.is_active ?? "true"),
    consultant_type: String(selectedRow.consultant_type || "1"),
  });

  const [initialData, setInitialData] = useState({});
  const [changedFields, setChangedFields] = useState({});

  useEffect(() => {
    const initial = {
      name: selectedRow.name || "",
      description: selectedRow.description || "",
      image_url: selectedRow?.image_url,
      is_active: String(selectedRow.is_active ?? "true"),
      consultant_type: String(selectedRow.consultant_type || "1"),
    };
    setInitialData(initial);
    setFormData((prev) => ({ ...prev, ...initial, id: selectedRow.id || "" }));
  }, [selectedRow]);

  const [updateData, { isLoading: isUpdating, error }] =
    useUpdateGiftMutation();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        image: files[0],
        image_url: URL.createObjectURL(files[0]),
      }));
      setChangedFields((prev) => ({ ...prev, image: true }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      // Track if the value has actually changed
      if (String(initialData[name]) !== String(value)) {
        setChangedFields((prev) => ({ ...prev, [name]: true }));
      } else {
        setChangedFields((prev) => {
          const updated = { ...prev };
          delete updated[name];
          return updated;
        });
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Check if there are any changes
    if (Object.keys(changedFields).length === 0) {
      toast.error("No changes detected");
      return;
    }

    const formDataToSend = new FormData();

    // Only append changed fields
    if (changedFields.name) {
      formDataToSend.append("name", formData.name);
    }
    if (changedFields.description) {
      formDataToSend.append("description", formData.description);
    }
    if (changedFields.image && formData.image) {
      formDataToSend.append("image", formData.image);
    }
    if (changedFields.is_active) {
      formDataToSend.append("is_active", formData.is_active);
    }
    if (changedFields.consultant_type) {
      formDataToSend.append("consultant_type", formData.consultant_type);
    }

    try {
      const response = await updateData({
        id: formData.id,
        body: formDataToSend,
      }).unwrap();

      if (response.status) {
        toast.success(response.message);
        setChangedFields({});
        onClose();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("API Error", error);
      toast.error("Failed to update gift");
    }
  };

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
      aria-labelledby="update-gift-title"
    >
      <div style={{ width: "500px" }}>
        <h2
          className="sub-heading"
          id="update-gift-title"
          style={{
            marginBottom: "20px",
            display: "block",
            backgroundColor: "#f0f0f0",
            textAlign: "center",
          }}
        >
          Update Gift
        </h2>

        <InputField
          label="Gift Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Gift Name"
        />

        <InputField
          label="Gift Description"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Gift Description"
        />

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Consultant Type *
          </label>
          <select
            name="consultant_type"
            value={formData.consultant_type}
            onChange={handleChange}
            className="userProfile-input-field"
          >
            <option value="1">Astrologer</option>
            <option value="2">Coach</option>
            <option value="3">Listener</option>
          </select>
        </div>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="userProfile-input-field"
          />
          {formData.image_url && (
            <img
              src={formData.image_url}
              alt="Preview"
              style={{ width: "100px", marginTop: "10px" }}
            />
          )}
        </div>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Status *
          </label>
          <select
            name="is_active"
            value={formData.is_active}
            onChange={handleChange}
            className="userProfile-input-field"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <button
            className="fifthButton"
            style={{ marginRight: "10px", backgroundColor: "green" }}
            onClick={handleSave}
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save"}
          </button>
          <button className="fifthButton" style={{}} onClick={onClose}>
            Back
          </button>
        </div>
        {error && <p className="error-message">Error: {error?.message}</p>}
      </div>
    </ReactModal>
  );
};

export default UpdateGifts;