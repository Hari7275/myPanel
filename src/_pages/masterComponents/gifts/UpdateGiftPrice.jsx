import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateGiftPriceMutation } from "../../../_store/api";
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
  <div className="userProfile-grid-item">
    <label style={{ fontSize: "20px", marginTop: "20px" }}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="userProfile-input-field"
      readOnly={readOnly}
    />
  </div>
);

const UpdateGiftPrice = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    id: selectedRow.id || "",
    gift_id: selectedRow.gift_id || "",
    user_category: selectedRow.user_category || "A",
    currency: selectedRow.currency || "INR",
    price: selectedRow.price || 0,
  });

  const [initialData, setInitialData] = useState({});
  const [changedFields, setChangedFields] = useState({});

  useEffect(() => {
    const initial = {
      gift_id: selectedRow.gift_id || "",
      user_category: selectedRow.user_category || "A",
      currency: selectedRow.currency || "INR",
      price: selectedRow.price || 0,
    };
    setInitialData(initial);
    setFormData((prev) => ({ ...prev, ...initial, id: selectedRow.id || "" }));
  }, [selectedRow]);

  const [updateData, { isLoading: isUpdating, error }] =
    useUpdateGiftPriceMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
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
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Check if there are any changes
    if (Object.keys(changedFields).length === 0) {
      toast.error("No changes detected");
      return;
    }

    const requestBody = {};

    // Only include changed fields
    if (changedFields.gift_id) {
      requestBody.gift_id = parseInt(formData.gift_id);
    }
    if (changedFields.user_category) {
      requestBody.user_category = formData.user_category;
    }
    if (changedFields.currency) {
      requestBody.currency = formData.currency;
    }
    if (changedFields.price) {
      requestBody.price = parseFloat(formData.price);
    }

    try {
      const response = await updateData({
        id: formData.id,
        body: requestBody,
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
      toast.error("Failed to update gift price");
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
          Update Gift Price
        </h2>

        {/* <InputField
          label="Gift ID *"
          type="number"
          name="gift_id"
          value={formData.gift_id}
          onChange={handleChange}
          placeholder=" Gift ID"
        /> */}

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
          placeholder=" Enter price"
        />

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

export default UpdateGiftPrice;
