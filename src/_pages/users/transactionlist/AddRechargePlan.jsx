import React, { useState } from "react";
import ReactModal from "react-modal";

import { useCreateUserRechargeMutation } from "../../../_store/api";

const AddRechargePlan = ({ isOpen, onClose, userId }) => {
  const [formData, setFormData] = useState({
    type: "recharge",
    transaction_type: "credit",
    amount: null,
    status: "successful",
  });

  const [createData, { isLoading }] = useCreateUserRechargeMutation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    const newData = {
      user_id: userId,
      transaction_type: formData.transaction_type,
      type: formData.type,
      amount: formData.amount,
      status: formData.status,
    };

    try {
      await createData({ body: newData });
      onClose();
    } catch (error) {
      console.log("Failed to add new report reason", error);
    }
  };

  if (isLoading) {
    return (
      <span
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Data Loading...
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
          Add Balance
        </h2>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Recharge Amount
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="amount"
            className="userProfile-input-field"
          />
        </div>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>Type</label>
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

        <div style={{ marginTop: "30px", textAlign: "center" }}>
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
          >
            {"Submit"}
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default AddRechargePlan;
