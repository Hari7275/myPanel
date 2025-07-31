import React, { useState, useEffect } from "react";
import { useCreateCouponsMutation } from "../../../_store/api";
import ReactModal from "react-modal";
import { UpdateInputField } from "../../../_components/ui/inputForm";

const AddCoupon = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discount_value: "INR",
    minimum_order_amount: "",
    discount_type: "percentage",
    coupon_type: "extra",
    usage_count: "",
    start_date: "",
    end_date: "",
    is_active: "1",
  });

  const [createProducts, { isLoading }] = useCreateCouponsMutation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    const newProduct = {
      code: formData?.code,
      description: formData?.description,
      discount_value: formData?.discount_value,
      minimum_order_amount: formData?.minimum_order_amount,
      discount_type: formData?.discount_type,
      coupon_type: formData?.coupon_type,
      usage_count: formData?.usage_count,
      start_date: formData?.start_date,
      end_date: formData?.end_date,
      is_active: formData?.is_active,
    };
    try {
      await createProducts({ body: newProduct });
      onClose();
    } catch (error) {
      console.log("failed to add products ", error);
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
          Add Coupon
        </h2>
        <div style={{ display: "flex" }}>
          <UpdateInputField
            label="Coupon Code"
            type="code"
            name="code"
            id="code"
            value={formData?.code}
            onChange={handleChange}
            placeholder="Code"
          />
          <UpdateInputField
            label="Description"
            type="text"
            name="description"
            id="description"
            value={formData?.description}
            onChange={handleChange}
            placeholder="Description"
          />
        </div>

        <div style={{ display: "flex" }}>
          <UpdateInputField
            label="Discount Value"
            type="number"
            name="discount_value"
            id="discount_value"
            value={formData?.discount_value}
            onChange={handleChange}
            placeholder="Discount Value"
          />

          <UpdateInputField
            label="Minimum Order Amount"
            type="text"
            name="minimum_order_amount"
            id="minimum_order_amount"
            value={formData?.minimum_order_amount}
            onChange={handleChange}
            placeholder="Minimum Order Amount"
          />
        </div>

        <div style={{ display: "flex" }}>
          <UpdateInputField
            label="Start Date"
            type="Date"
            name="start_date"
            id="start_date"
            value={formData?.start_date}
            onChange={handleChange}
            placeholder="Start Date"
          />

          <UpdateInputField
            label="End Date"
            type="Date"
            name="end_date"
            id="end_date"
            value={formData?.end_date}
            onChange={handleChange}
            placeholder="End Date"
          />
        </div>

        <div style={{ display: "flex" }}>
          <UpdateInputField
            label="Usage Count"
            type="text"
            name="usage_count"
            id="usage_count"
            value={formData?.usage_count}
            onChange={handleChange}
            placeholder="Usage Count"
          />
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
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
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
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
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

export default AddCoupon;
