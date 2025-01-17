import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateServiceRateMutation } from "../../../_store/api";

const UpdateServiceRate = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    rate_A: selectedRow?.rate_A || "",
    rate_B: selectedRow?.rate_B || "",
    rate_C: selectedRow?.rate_C || "",
    rate_D: selectedRow?.rate_D || "",
    commission: selectedRow?.commission || "",
    status: selectedRow?.commission || "Active",
  });

  const [updateService, { isLoadng: isUpdating, errro }] =
    useUpdateServiceRateMutation();

  useEffect(() => {
    if (selectedRow) {
      setFormData({
        rate_A: selectedRow?.rate_A,
        rate_B: selectedRow?.rate_B,
        rate_C: selectedRow?.rate_C,
        rate_D: selectedRow?.rate_D,
        commission: selectedRow?.commission,
        status: selectedRow?.status,
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
      await updateService({
        id: selectedRow.id,
        body: formData,
      });
      onClose();
    } catch (error) {
      console.log("API Error", error);
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
          }}
        >
          Edit Feature
        </h2>

        <div className="input-container">
          <label htmlFor="feature_name"> Rate A</label>
          <input
            type="number"
            id="rate_A"
            name="rate_A"
            value={formData.rate_A}
            onChange={handleChange}
            className="info-input"
          />
        </div>

        <div className="input-container">
          <label htmlFor="feature_name"> Rate B</label>
          <input
            type="number"
            id="rate_B"
            name="rate_B"
            value={formData.rate_B}
            onChange={handleChange}
            className="info-input"
          />
        </div>

        <div className="input-container">
          <label htmlFor="feature_name"> Rate C</label>
          <input
            type="number"
            id="rate_C"
            name="rate_C"
            value={formData.rate_C}
            onChange={handleChange}
            className="info-input"
          />
        </div>

        <div className="input-container">
          <label htmlFor="feature_name"> Rate D</label>
          <input
            type="number"
            id="rate_D"
            name="rate_D"
            value={formData.rate_D}
            onChange={handleChange}
            className="info-input"
          />
        </div>

        <div className="input-container">
          <label htmlFor="feature_name"> Commission</label>
          <input
            type="number"
            id="commission"
            name="commission"
            value={formData.commission}
            onChange={handleChange}
            className="info-input"
          />
        </div>

        <div className="input-container">
          <label htmlFor="type">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="userProfile-input-field"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

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
            onClick={handleSave}
            // disabled={isUpdating}
          >
            {"Save"}
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default UpdateServiceRate;
