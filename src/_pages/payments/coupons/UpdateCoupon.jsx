import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateCouponsMutation } from "../../../_store/api";

const UpdateCoupon = ({ isOpen, onClose, selectedRow, refetchData }) => {
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discount_value: "",
    discount_type: "",
    coupon_type: "",
    minimum_order_amount: "",
    usage_count: "",
    start_date: "",
    end_date: "",
    is_active: "",
  });

  const [updateProducts, { isLoading: isUpdating }] =
    useUpdateCouponsMutation();

  useEffect(() => {
    if (selectedRow) {
      setFormData({
        code: selectedRow?.code || "",
        description: selectedRow?.description || "",
        discount_value: selectedRow?.discount_value || "",
        discount_type: selectedRow?.discount_type || "",
        coupon_type: selectedRow?.coupon_type || "",
        minimum_order_amount: selectedRow?.minimum_order_amount || "",
        usage_count: selectedRow?.usage_count || "",
        start_date: selectedRow?.start_date || "",
        end_date: selectedRow?.end_date || "",
        is_active: selectedRow?.is_active || "",
      });
    }
  }, [selectedRow]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "is_active" ? Number(value) : value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        is_active:
          formData?.is_active === true
            ? 1
            : formData?.is_active === false
            ? 0
            : formData?.is_active,
      };
      await updateProducts({
        id: selectedRow?.id,
        body: payload,
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
          Update Coupon
        </h2>

        <div style={{ display: "flex" }}>
          <div className="input-container">
            <label htmlFor="code"> Coupon Code </label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData?.code}
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
            <label htmlFor="discount_value">Discount Value</label>
            <input
              type="number"
              id="discount_value"
              name="discount_value"
              value={formData?.discount_value}
              onChange={handleChange}
              className="info_input"
            />
          </div>

          <div className="input-container">
            <label htmlFor="minimum_order_amount">Minimum Order Amount</label>
            <input
              type="text"
              id="minimum_order_amount"
              name="minimum_order_amount"
              value={formData.minimum_order_amount}
              onChange={handleChange}
              className="info_input"
            />
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div className="input-container" style={{ marginRight: "20px" }}>
            <label htmlFor="type">Coupon Type</label>
            <select
              id="coupon_type"
              name="coupon_type"
              value={formData?.coupon_type}
              onChange={handleChange}
              className="info-input"
              style={{
                width: "100%",
                height: "56px",
                borderRadius: "6px",
              }}
            >
              <option value="">Select Coupon Type</option>
              <option value="extra">Extra</option>
              <option value="special">special</option>
            </select>
          </div>

          <div className="input-container" style={{ marginRight: "20px" }}>
            <label htmlFor="type">Discount Type</label>
            <select
              id="discount_type"
              name="discount_type"
              value={formData?.discount_type}
              onChange={handleChange}
              className="info-input"
              style={{
                width: "100%",
                height: "56px",
                borderRadius: "6px",
              }}
            >
              <option value="">Select Discount Type</option>
              <option value="percentage">Percentage</option>
              <option value="fixed_amount">Fixed Amount</option>
            </select>
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div className="input-container">
            <label htmlFor="start_date">Start Date</label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={
                formData.start_date
                  ? new Date(formData.start_date).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleChange}
              className="info_input"
            />
          </div>

          <div className="input-container">
            <label htmlFor="end_date">End Date</label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              value={
                formData.end_date
                  ? new Date(formData.end_date).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleChange}
              className="info_input"
            />
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="status">Status</label>
          <select
            id="is_active"
            name="is_active"
            value={formData?.is_active}
            onChange={handleChange}
            className="info-input"
            style={{
              width: "100%",
              height: "56px",
              borderRadius: "6px",
            }}
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
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

export default UpdateCoupon;
