import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateDatingMutation } from "../../../_store/api";

const UpdateDatingProducts = ({
  isOpen,
  onClose,
  selectedRow,
  refetchData,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    currency: "",
    price: "",
    type: "",
    feature_id: "",
    productKey: "",
  });

  const [updateProducts, { isLoading: isUpdating, error }] =
    useUpdateDatingMutation();

  useEffect(() => {
    if (selectedRow) {
      setFormData({
        name: selectedRow.name || "",
        description: selectedRow.description || "",
        currency: selectedRow.currency || "",
        price: selectedRow.price || "",
        type: selectedRow.type || "",
        feature_id: selectedRow.feature_id || "",
        productKey: selectedRow.productKey || "",
      });
    }
  }, [selectedRow]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateProducts({
        id: selectedRow.id,
        body: formData,
      });
      if (refetchData) {
        refetchData();
      }
      onClose();
    } catch (error) {
      console.log("API error", error);
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
          Update Dating Product
        </h2>

        <div style={{ display: "flex" }}>
          <div className="input-container">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="info_input"
            />
          </div>

          <div className="input-container">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="info_input"
            />
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div className="input-container">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="info_input"
            />
          </div>

          <div className="input-container">
            <label htmlFor="type">Duration</label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="info_input"
            />
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div className="input-container">
            <label htmlFor="feature_id">Feature ID</label>
            <input
              type="number"
              id="feature_id"
              name="feature_id"
              value={formData.feature_id}
              onChange={handleChange}
              readOnly
              disabled
              className="info_input"
            />
          </div>

          <div className="input-container">
            <label htmlFor="productKey">Product Key</label>
            <input
              type="text"
              id="productKey"
              name="productKey"
              value={formData.productKey}
              onChange={handleChange}
              className="info_input"
            />
          </div>
        </div>
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
          }}
        >
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

export default UpdateDatingProducts;
