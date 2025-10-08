import React, { useState } from "react";
import ReactModal from "react-modal";
import { useCreateGiftMutation } from "../../../_store/api";
import toast from "react-hot-toast";

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

const AddGift = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    currency: "INR",
    price: "",
    image: null,
    is_active: "true",
    commission: "",
  });

  const [createData, { isLoading }] = useCreateGiftMutation();

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const newData = new FormData();
    newData.append("name", formData.name);
    newData.append("description", formData.description);
    newData.append("currency", formData.currency);
    newData.append("price", formData.price);
    newData.append("image", formData.image || "snake.jpg");
    newData.append("is_active", formData.is_active);
    newData.append("commission", formData.commission);

    try {
      const response = await createData({ body: newData }).unwrap();
      if (response.status) {
        toast.success(response.message);
        onClose();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("Failed to add new category", error);
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
          Add Gift
        </h2>

        <InputField
          label="Gift Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder=" Gift Name"
        />
        <InputField
          label="Gift Description"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder=" Gift description"
        />

        <InputField
          label="Price"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder=" Gift price"
        />

        <InputField
          label="Commission"
          type="number"
          name="commission"
          value={formData.commission}
          onChange={handleChange}
          placeholder=" Gift Commission"
        />
        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="userProfile-input-field"
          />
        </div>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "16px", marginTop: "20px" }}>
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
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
          <button className="fifthButton" style={{}} onClick={onClose}>
            Back
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default AddGift;
