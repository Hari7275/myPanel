import React, { useState } from "react";
import ReactModal from "react-modal";

import { useCreateConsultantWalletTransMutation } from "../../../_store/api";
import { Atom } from "react-loading-indicators";
import toast from "react-hot-toast";

const ListenerWalletTrans = ({ isOpen, onClose, consultantId }) => {
  const [formData, setFormData] = useState({
    order_id: "",
    duration: "",
    amount: "",
    transaction_type: "credit",
    description: "",
  });

  const [createData, { isLoading }] = useCreateConsultantWalletTransMutation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.amount || formData.amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const newData = {
      consultant_id: consultantId,
      duration: parseInt(formData.duration) || 0,
      amount: parseFloat(formData.amount),
      transaction_type: formData.transaction_type,
      description: formData.description || "",
    };

    // Add order_id only if provided
    if (formData.order_id) {
      newData.order_id = parseInt(formData.order_id);
    }

    try {
      const response = await createData({ body: newData });
      if (response?.data?.status) {
        toast.success(
          response?.data?.message || "Transaction created successfully",
        );
        setFormData({
          order_id: "",
          duration: "",
          amount: "",
          transaction_type: "credit",
          description: "",
        });
        onClose();
      } else {
        toast.error(response?.data?.error || "Failed to create transaction");
      }
    } catch (error) {
      console.log("Failed to add wallet transaction", error);
      toast.error("An error occurred while creating the transaction");
    }
  };

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

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
          Consultant Wallet Transactions
        </h2>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Order ID
          </label>
          <input
            type="number"
            name="order_id"
            value={formData.order_id}
            onChange={handleChange}
            placeholder="Enter order ID (optional)"
            className="userProfile-input-field"
          />
        </div>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Duration
          </label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Enter duration (default: 0)"
            className="userProfile-input-field"
          />
        </div>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Amount *
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="userProfile-input-field"
            required
          />
        </div>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Transaction Type *
          </label>
          <select
            name="transaction_type"
            value={formData.transaction_type}
            onChange={handleChange}
            className="userProfile-input-field"
          >
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </div>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            className="userProfile-input-field"
          />
        </div>

        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <button
            className="fifthButton"
            style={{ marginRight: "10px", backgroundColor: "green" }}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
          <button
            className="back-Button fifthButton"
            onClick={onClose}
            disabled={isLoading}
          >
            Back
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default ListenerWalletTrans;
