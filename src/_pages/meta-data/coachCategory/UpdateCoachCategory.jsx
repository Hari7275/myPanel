import React, { useState } from "react";
import ReactModal from "react-modal";
import { useUpdateCoachCategoryMutation } from "../../../_store/api";

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

const UpdateCoachCategory = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    id: selectedRow?.id || "",
    category_name: selectedRow?.category_name || "",
    image: selectedRow?.image || "",
    status: selectedRow?.status || "",
    category_bg_color: selectedRow?.category_bg_color || [
      { offset: 0, color: "rgb(255, 244, 207)" },
      { offset: 1, color: "rgb(144, 113, 53)" },
    ],
    category_card_bg_color: selectedRow?.category_card_bg_color || [
      { offset: 0, color: "rgb(255, 244, 207)" },
      { offset: 1, color: "rgb(144, 113, 53)" },
    ],
  });

  const [updateCategory, { isLoading: isUpdating, error }] =
    useUpdateCoachCategoryMutation();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        image: files[0],
      }));
    } else if (
      name === "category_bg_color" ||
      name === "category_card_bg_color"
    ) {
      try {
        setFormData((prevData) => ({
          ...prevData,
          [name]: JSON.parse(value),
        }));
      } catch (error) {
        console.error("Invalid JSON input for colors:", error);
      }
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
    formDataToSend.append("image", formData.image);
    formDataToSend.append(
      "category_bg_color",
      JSON.stringify(formData.category_bg_color)
    );
    formDataToSend.append(
      "category_card_bg_color",
      JSON.stringify(formData.category_card_bg_color)
    );
    formDataToSend.append("status", formData.status);

    try {
      await updateCategory({
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
          Update coach category
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <UpdateData
            label="Id"
            type="number"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            readOnly
          />
          <UpdateData
            label="Category Name"
            type="text"
            id="category_name"
            name="category_name"
            value={formData.category_name}
            onChange={handleChange}
          />
          <UpdateData
            label="Card Image"
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
          <div className="input-container">
            <label htmlFor="category_bg_color">Category bg Color</label>
            <textarea
              name="category_bg_color"
              id="category_bg_color"
              value={JSON.stringify(formData.category_bg_color, null, 2)}
              onChange={handleChange}
              rows="4"
              className="info-input"
            ></textarea>
          </div>
          <div className="input-container">
            <label htmlFor="category_card_bg_color">Category card bg Color</label>
            <textarea
              name="category_card_bg_color"
              id="category_card_bg_color"
              value={JSON.stringify(formData.category_card_bg_color, null, 2)}
              onChange={handleChange}
              rows="4"
              className="info-input"
            />
          </div>
          <div className="input-container">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="userProfile-input-field"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
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

export default UpdateCoachCategory;
