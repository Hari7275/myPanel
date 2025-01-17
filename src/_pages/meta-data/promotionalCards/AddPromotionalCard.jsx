import React, { useState } from "react";
import ReactModal from "react-modal";
import { useCreatePromotionalCardMutation } from "../../../_store/api";
import { UpdateInputField } from "../../../_components/ui/inputForm";

const AddPromotionalCard = ({ isOpen, onClose, categoryData }) => {
  const [formData, setFormData] = useState({
    category_id: "",
    category_name: "",
    card_image: null,
    type: "",
    status: "active",
  });

  const [createCard, { isLoading }] = useCreatePromotionalCardMutation();

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;

    if (name === "category_id") {
      console.log("categoryData", categoryData);
      console.log("value", value);

      const selectedCategory = categoryData.find(
        (category) => category.id === parseInt(value, 10)
      );

      if (!selectedCategory) {
        console.error("No category found with id", value);
      } else {
        setFormData((prevData) => ({
          ...prevData,
          category_id: value,
          category_name: selectedCategory.category_name,
        }));
      }
    } else {
      // Handle other inputs
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "file" ? files[0] : value,
      }));
    }
  };
  const handleSubmit = async () => {
    const form = new FormData();

    // Append all necessary data to FormData
    form.append("category_id", formData.category_id);
    form.append("category_name", formData.category_name);
    form.append("type", Number(formData.type));
    form.append("status", formData.status);
    if (formData.card_image) {
      form.append("card_image", formData.card_image);
    }

    try {
      await createCard(form).unwrap();
      onClose();
    } catch (error) {
      console.log("Failed to add new card", error);
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
          Add Card
        </h2>

        <div className="input-container">
          <label htmlFor="category_id">Category Name</label>
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="userProfile-input-field"
            style={{ height: "55px" }}
          >
            <option value="">Select a Category</option>
            {categoryData.map((category, index) => (
              <option key={index} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ width: "500px" }}>
          <UpdateInputField
            label="Category Name"
            id="category_name"
            name="category_name"
            type="hidden"
            value={formData.category_name}
            onChange={handleChange}
          />

          <UpdateInputField
            label="Card Image"
            type="file"
            id="card_image"
            name="card_image"
            onChange={handleChange}
          />
        </div>

        <div className="input-container">
          <label htmlFor="type">Category Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="userProfile-input-field"
            style={{ height: "55px" }}
          >
            <option value="">Select a Category Type</option>
            <option value="1">Astrologer</option>
            <option value="2">Coach</option>
            <option value="3">Listener</option>
          </select>
        </div>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "16px", marginTop: "20px" }}>
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

export default AddPromotionalCard;
