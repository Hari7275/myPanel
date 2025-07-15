import React, { useState } from "react";
import ReactModal from "react-modal";

import { useCreateUserRechargeMutation } from "../../../_store/api";
import { Atom } from "react-loading-indicators";
import toast from "react-hot-toast";

const AddRechargePlan = ({ isOpen, onClose, userId }) => {
  const [formData, setFormData] = useState({
    type: "recharge",
    description: "Recharge",
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
      description: formData.description || "Recharge",
    };

    try {
      const response = await createData({ body: newData });
      console.log("response", response);
      if (response?.data?.status) {
        toast.success(response?.data?.message);
        onClose();
      } else {
        toast.error(response?.data?.error);
        return;
      }
    } catch (error) {
      console.log("Failed to add new report reason", error);
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

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="type here"
            className="userProfile-input-field"
          />
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
