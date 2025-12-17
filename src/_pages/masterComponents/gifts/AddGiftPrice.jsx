import React, { useState } from "react";
import ReactModal from "react-modal";
import { useCreateGiftPriceMutation } from "../../../_store/api";
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

const AddGiftPrice = ({ isOpen, onClose, gift_id }) => {
  const [formData, setFormData] = useState({
    user_category: "A",
    currency: "INR",
    price: 0,
  });

  const [createData, { isLoading }] = useCreateGiftPriceMutation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    const requestBody = {
      gift_id: gift_id,
      user_category: formData.user_category,
      currency: formData.currency,
      price: parseFloat(formData.price),
    };

    try {
      const response = await createData({ body: requestBody }).unwrap();
      if (response.status) {
        toast.success(response.message);
        onClose();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("Failed to add gift price", error);
      toast.error("Failed to add gift price");
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
          Add Gift Price
        </h2>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            User Category *
          </label>
          <select
            name="user_category"
            value={formData.user_category}
            onChange={handleChange}
            className="userProfile-input-field"
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
          </select>
        </div>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Currency *
          </label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="userProfile-input-field"
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
          </select>
        </div>

        <InputField
          label="Price *"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter price"
        />

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

export default AddGiftPrice;
