import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateRechargeMutation } from "../../../_store/api";

const EditRechargePlans = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    plan_name: selectedRow?.plan_name || "",
    discount: selectedRow?.discount || 0,
    currency: selectedRow?.currency || "INR",
    price: selectedRow?.price || 0,
    status: selectedRow?.status || "active",
    coupon_id: selectedRow?.coupon_id,
    promotional_heading: selectedRow?.promotional_heading,
  });

  const [updateRecharge, { isLoading: isUpdating, error }] =
    useUpdateRechargeMutation();

  useEffect(() => {
    if (selectedRow) {
      setFormData({
        plan_name: selectedRow?.plan_name,
        discount: selectedRow?.discount,
        currency: selectedRow?.currency,
        price: selectedRow?.price,
        status: selectedRow?.status,
        coupon_id: selectedRow?.coupon_id,
        promotional_heading: selectedRow?.promotional_heading,
      });
    }
  }, [selectedRow]);

  const handleChange = (e) => {
    const { name, value } = e?.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await updateRecharge({
        id: selectedRow?.id,
        body: formData,
      });

      onClose();
    } catch (error) {
      console.log("API Error", error);
    }
  };
  if (!isOpen) return null;

  return (
    <>
      <ReactModal
        className="modal"
        overlayClassName="overlay"
        isOpen={isOpen}
        onRequestClose={onClose}
      >
        <div>
          <h2
            className="sub-heading"
            style={{
              marginBottom: "20px",
              display: "block",
              backgroundColor: "#f0f0f0",
              textAlign: "center",
            }}
          >
            Edit Recharge Plan
          </h2>
          <form className="simple-form" noValidate autoComplete="off">
            <div className="input-container">
              <label htmlFor="plan_name">Recharge Plan Name</label>
              <input
                type="text"
                id="plan_name"
                name="plan_name"
                className="info-input"
                value={formData?.plan_name}
                onChange={handleChange}
              />
            </div>

            <div className="input-container">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                className="info-input"
                value={formData?.price}
                onChange={handleChange}
              />
            </div>

            <div className="input-container">
              <label htmlFor="discount">Discount</label>
              <input
                type="number"
                id="discount"
                name="discount"
                className="info-input"
                value={formData?.discount}
                onChange={handleChange}
              />
            </div>

            <div className="input-container">
              <label htmlFor="currency">Currency</label>
              <input
                type="text"
                id="currency"
                name="currency"
                className="info-input"
                value={formData?.currency}
                onChange={handleChange}
              />
            </div>

            <div className="input-container">
              <label htmlFor="plan_name">Coupon Id</label>
              <input
                type="text"
                id="coupon_id"
                name="coupon_id"
                className="info-input"
                value={formData?.coupon_id}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <label htmlFor="plan_name">Promotional Heading</label>
              <input
                type="text"
                id="promotional_heading"
                name="promotional_heading"
                className="info-input"
                value={formData?.promotional_heading}
                onChange={handleChange}
              />
            </div>

            <div className="input-container">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData?.status}
                onChange={handleChange}
                className="userProfile-input-field"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div style={{ marginTop: "20px", display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <button
                type="submit"
                className="fifthButton"
                style={{ marginRight: "10px" }}
                onClick={handleSave}
              >
                {isUpdating ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                className="fifthButton"
                style={{ background: "red", marginLeft: "10px" }}
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
          {error && <p style={{ color: "red" }}>Error: {error?.message}</p>}
        </div>
      </ReactModal>
    </>
  );
};

export default EditRechargePlans;
