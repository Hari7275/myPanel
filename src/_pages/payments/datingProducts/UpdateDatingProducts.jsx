import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateDatingMutation } from "../../../_store/api";
import toast from "react-hot-toast";

const UpdateDatingProducts = ({
  isOpen,
  onClose,
  selectedRow,
  refetchData,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    currency: "INR",
    device_type: null,
    product_id: "",
    // status: "active",
    count: "",
    group_id: "",
  });

  const [updateProducts, { isLoading: isUpdating, error }] =
    useUpdateDatingMutation();

  console.log("selectedRow", selectedRow);

  useEffect(() => {
    if (selectedRow) {
      setFormData({
        name: selectedRow.name || "",
        description: selectedRow.description || "",
        currency: selectedRow.currency || "",
        price: selectedRow.price || "",
        device_type: selectedRow.device_type || "",
        product_id: selectedRow.product_id || "",
        count: selectedRow.count || "",
        group_id: selectedRow.group_id || "",
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
      const response = await updateProducts({
        id: selectedRow?.id,
        body: formData,
      });
      if (response.data.status == true) {
        toast.success(response.data.message);
        onClose();
      } else {
        toast.error(response.data.message);
        return;
      }
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
            <label htmlFor="product_id">Product Id</label>
            <input
              type="text"
              id="product_id"
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
              className="info_input"
            />
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div className="input-container">
            <label htmlFor="count">Count</label>
            <input
              type="number"
              id="count"
              name="count"
              value={formData.count}
              onChange={handleChange}
              // readOnly
              // disabled
              className="info_input"
            />
          </div>

          <div className="input-container">
            <label htmlFor="group_id">Group Id</label>
            <input
              type="number"
              id="group_id"
              name="group_id"
              value={formData.group_id}
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
      </div>
    </ReactModal>
  );
};

export default UpdateDatingProducts;
