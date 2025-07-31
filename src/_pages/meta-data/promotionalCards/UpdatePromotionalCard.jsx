import React, { useState } from "react";
import ReactModal from "react-modal";
import { UpdateInputField } from "../../../_components/ui/inputForm";
import { useUpdatePromotionalCardMutation } from "../../../_store/api";

const UpdatePromotionalCard = ({
  isOpen,
  onClose,
  selectedRow,
  categoryData,
}) => {
  const [formData, setFormData] = useState({
    id: selectedRow?.id || "",
    category_name: selectedRow?.category_name || "",
    card_image: selectedRow?.card_image || "",
    type: selectedRow?.type || "",
    status: selectedRow?.status || "active",
  });

  const [updateCard, { isLoading, error: error }] =
    useUpdatePromotionalCardMutation();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "card_image" && files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        card_image: files[0],
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
    formDataToSend.append("category_name", formData.category_name);
    formDataToSend.append("card_image", formData.card_image);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("status", formData.status);

    try {
      await updateCard({
        id: selectedRow.id,
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
      <div style={{ width: "500px" }}>
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
          Update Promotional Card
        </h2>

        <div style={{ display: "flex" }}>
          <div className="input-container">
            <label htmlFor="category_id">Category Name</label>
            <select
              id="category_name"
              name="category_name"
              value={formData.category_name}
              onChange={handleChange}
              className="userProfile-input-field"
              style={{ height: "55px" }}
            >
              <option value="">Select a Category</option>
              {categoryData.map((category, index) => (
                <option key={index} value={category.category_name}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>

          <UpdateInputField
            label="Card Image"
            type="file"
            id="card_image"
            name="card_image"
            onChange={handleChange}
          />
        </div>

        <div style={{ display: "flex" }}>
          <UpdateInputField
            label="Type"
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
          <div className="input-container">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="userProfile-input-field"
              style={{ height: "55px" }}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <button
            className="fifthButton"
            style={{ marginRight: "10px", backgroundColor: "green" }}
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Submiting..." : "submit"}
          </button>
          <button
            className="fifthButton"
            style={{}}
            onClick={onClose}
          >
            Back
          </button>
        </div>
        {error && <p className="error-message"> {error?.message}</p>}
      </div>
    </ReactModal>
  );
};

export default UpdatePromotionalCard;
