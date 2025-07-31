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

const AddUserDesire = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });
  const [message, setMessage] = useState("");
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
    form.append("type", "profile_desires");
    form.append("parent_key", 0);
    form.append("image", formData.image);

    try {
      const response = await createData({ body: form }).unwrap();

      setMessage(response.message);
      if (response.status === true) {
        onClose();
      }

      if (response.status === false) {
        setMessage(response.message);
      }
    } catch (error) {
      setMessage("An error occurred while adding the desire.");
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
            marginBottom: "10px",
            display: "block",
            backgroundColor: "#f0f0f0",
            textAlign: "center",
          }}
        >
          Add Desire
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

        {/* **************************************************************************** show the dynamic message  */}
        <p style={{ color: "red", textAlign: "center", marginTop: "15px" }}>
          {message}
        </p>

        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <button
            className="fifthButton"
            style={{ marginRight: "10px", backgroundColor: "green" }}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
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

export default AddUserDesire;
