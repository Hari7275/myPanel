import React, { useState, useEffect } from "react";

import ReactModal from "react-modal";
import { UpdateInputField } from "../../_components/ui/inputForm";

import { useUpdateConsultantPriceChartMutation } from "../../_store/api";

const EditconsultantPrice = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    current_price: null,
    discount_price: null,
    commission: null,
    consultant_id: null,
    id: null,
  });

  console.log("selectedRow", selectedRow.id);

  // Prefill formData with selectedRow values when modal opens
  useEffect(() => {
    if (selectedRow) {
      setFormData({
        current_price: Number(selectedRow.current_price) || "",
        discount_price: selectedRow.discount_price || "",
        commission: selectedRow.commission || "",
        consultant_id: selectedRow.consultant_id || "",
        id: selectedRow?.id,
      });
    }
  }, [selectedRow]);

  const [UpdatePricePlan, { isLoading }] =
    useUpdateConsultantPriceChartMutation();

  const handleChange = (event) => {
    const { name, value } = event?.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    const payload = {
      // id: formData?.id,
      current_price: Number(formData?.current_price),
      discount_price: formData?.discount_price,
      commission: formData?.commission,
      consultant_id: formData?.consultant_id,
    };

    console.log("Payload being sent:", payload);

    try {
      const response = await UpdatePricePlan({
        id: formData?.id,
        body: payload,
      });
      console.log("Response from API:", response);
      onClose();
    } catch (error) {
      console.error("Error updating price plan:", error);
    }
  };

  return (
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
          Update Price Plan
        </h2>

        <UpdateInputField
          label="Current Price"
          type="number"
          name="current_price"
          value={formData?.current_price}
          onChange={handleChange}
          placeholder="Current Price"
        />

        <UpdateInputField
          label="Discount Price"
          type="number"
          name="discount_price"
          value={formData?.discount_price}
          onChange={handleChange}
          placeholder="Discount Price"
        />

        <UpdateInputField
          label=" Commission"
          type="number"
          name="commission"
          value={formData?.commission}
          onChange={handleChange}
          placeholder="Commission"
        />

        <div style={{ marginTop: "30px" }}>
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

export default EditconsultantPrice;
