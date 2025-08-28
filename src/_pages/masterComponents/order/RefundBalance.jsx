import React, { useState } from "react";
import ReactModal from "react-modal";

import { useCreateUserRechargeMutation } from "../../../_store/api";
import { Atom } from "react-loading-indicators";
import toast from "react-hot-toast";

const RefundBalance = ({ isOpen, onClose, selectedRow }) => {
  const [transactionMode, setTransactionMode] = useState("userRefund");
  const [formData, setFormData] = useState({
    userId: selectedRow.user_id,
    amount: selectedRow?.flute_earning || "",
    description: "",
    is_forgin: selectedRow.description.userData.is_foreigner || null,
    conversion_rate: selectedRow.conversion_rate || "",
  });
  const [wordCount, setWordCount] = useState(0);

  console.log("selectedRow", selectedRow);

  const [createData, { isLoading }] = useCreateUserRechargeMutation();

  const countWords = (text) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Validate amount based on flute_earning
    if (name === "amount") {
      const numValue = parseFloat(value);
      const maxAmount = parseFloat(selectedRow?.flute_earning || 0);

      if (numValue > maxAmount) {
        toast.error(`Amount cannot exceed flute earning of ${maxAmount}`);
        return;
      }
    }

    // Validate description word count
    if (name === "description") {
      const words = countWords(value);
      if (words > 40) {
        toast.error("Description cannot exceed 40 words");
        return;
      }
      setWordCount(words);
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    // Check if description is empty
    if (!formData.description.trim()) {
      toast.error("Description is required");
      return;
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (countWords(formData.description) > 40) {
      toast.error("Description cannot exceed 40 words");
      return;
    }

    // Calculate the final amount based on is_forgin flag
    let finalAmount = parseFloat(formData.amount);

    // If is_forgin is true, multiply by conversion_rate
    if (formData.is_forgin && formData.conversion_rate) {
      finalAmount = finalAmount * parseFloat(formData.conversion_rate);
    }

    console.log("finalAmount", finalAmount);
    console.log("formData.amount", formData.amount);
    console.log(
      "parseFloat(formData.conversion_rate)",
      parseFloat(formData.conversion_rate)
    );

    let apiPayload = {};

    if (transactionMode === "userRefund") {
      // User Refund API payload
      apiPayload = {
        user_id: formData.userId,
        transaction_type: "credit",
        type: "refund",
        amount: finalAmount, // Use the calculated final amount
        status: "successful",
        description: formData.description || "User Refund",
        reference_id: selectedRow?.id,
      };
    } else {
      // Consultant Debit API payload
      apiPayload = {
        consultant_id: selectedRow?.consultant_id,
        transaction_type: "debit",
        type: "consultant_debit",
        amount: finalAmount, // Use the calculated final amount
        status: "successful",
        description: formData.description || "Consultant Debit",
        order_id: selectedRow?.id,
        user_id: formData.userId,
      };
    }
    console.log("apiPayload", apiPayload);

    try {
      const response = await createData({ body: apiPayload });
      console.log("response", response);
      if (response?.data?.status) {
        toast.success(response?.data?.message);
        onClose();
        // Reset form
        setFormData({
          userId: selectedRow.user_id,
          amount: selectedRow?.flute_earning || "",
          description: "",
          is_forgin: selectedRow.description.userData.is_foreigner || null,
          conversion_rate: selectedRow.conversion_rate || "",
        });
        setWordCount(0);
      } else {
        toast.error(response?.data?.error);
        return;
      }
    } catch (error) {
      console.log("Failed to process transaction", error);
      toast.error("Failed to process transaction");
    }
  };

  // Helper function to format amount display
  const formatAmountDisplay = (amount) => {
    const num = parseFloat(amount);
    return isNaN(num) ? "0" : Math.floor(num).toString();
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
          {transactionMode === "userRefund"
            ? "User Refund"
            : "Consultant Debit"}
        </h2>

        {/* Transaction Mode Selection */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "25px",
            gap: "20px",
          }}
        >
          <button
            onClick={() => setTransactionMode("userRefund")}
            style={{
              padding: "10px 20px",
              backgroundColor:
                transactionMode === "userRefund" ? "#1c2434" : "#e0e0e0",
              color: transactionMode === "userRefund" ? "white" : "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: transactionMode === "userRefund" ? "bold" : "normal",
            }}
          >
            User Refund
          </button>
          <button
            onClick={() => setTransactionMode("consultantDebit")}
            style={{
              padding: "10px 20px",
              backgroundColor:
                transactionMode === "consultantDebit" ? "#1c2434" : "#e0e0e0",
              color: transactionMode === "consultantDebit" ? "white" : "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight:
                transactionMode === "consultantDebit" ? "bold" : "normal",
            }}
          >
            Consultant Debit
          </button>
        </div>

        {/* Amount Field */}
        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Amount
            <span
              style={{ fontSize: "14px", color: "#666", marginLeft: "10px" }}
            >
              (Max: {formatAmountDisplay(selectedRow?.flute_earning)})
            </span>
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="userProfile-input-field"
            min={0}
            max={selectedRow?.flute_earning || 0}
            step="1"
          />
          {formData.is_forgin && formData.conversion_rate && (
            <div style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
              Conversion rate: {formData.conversion_rate} (Final amount:{" "}
              {formatAmountDisplay(
                parseFloat(formData.amount || 0) *
                  parseFloat(formData.conversion_rate)
              )}
              )
            </div>
          )}
        </div>

        {/* Description Field */}
        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Description
            <span
              style={{ fontSize: "14px", color: "#666", marginLeft: "10px" }}
            >
              <span style={{ color: "red" }}>*</span>
            </span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description (required, max 40 words)"
            className="userProfile-input-field"
            rows="3"
            style={{ resize: "vertical" }}
            required
          />
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <button
            className="fifthButton"
            style={{ marginRight: "10px", backgroundColor: "green" }}
            onClick={handleSubmit}
            disabled={
              !formData.amount ||
              parseFloat(formData.amount) <= 0 ||
              !formData.description.trim()
            }
          >
            Submit
          </button>
          <button className="back-Button fifthButton" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default RefundBalance;
