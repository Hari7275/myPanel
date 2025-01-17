import React, { useState } from "react";
import ReactModal from "react-modal";
import { useCreatePromptMutation } from "../../../../_store/api";

const InputField = ({ label, type, name, value, onChange, placeholder }) => (
  <div className="userProfile-grid-item">
    <label style={{ fontSize: "20px", marginTop: "20px" }}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="userProfile-input-field"
    />
  </div>
);

const AddChildFeature = ({ isOpen, onClose, meta_key }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    parent_key: meta_key.profile_feature,
  });

  console.log("meta_key", meta_key.profile_feature);

  const [createData, { isLoading }] = useCreatePromptMutation();

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "image") {
      setFormData((prevData) => ({
        ...prevData,
        image: files[0],  
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const form = new FormData();
    form.append("name", formData.name);
    form.append("type", "profile_feature");
    form.append("parent_key", formData.parent_key);
    form.append("image", formData.image);

    try {
      console.log("form...", form);
      await createData({ body: form });
      onClose();
    } catch (error) {
      console.log("Failed to add new magazine category", error);
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
          Add Prompt
        </h2>

        <InputField
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}  
            placeholder="image"
            className="userProfile-input-field"
          />
        </div>

        <div style={{ marginTop: "30px", textAlign: "center" }}>
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
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default AddChildFeature;
