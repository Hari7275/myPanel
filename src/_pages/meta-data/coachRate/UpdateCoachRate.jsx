import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateCoachRateMutation } from "../../../_store/api";

const UpdateCoachRate = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    rate: selectedRow?.rate || "",
    commission: selectedRow?.commission || "",
    status: selectedRow?.commission || "Active",
  });

  const [updateService, { isLoadng: isUpdating, errro }] =
    useUpdateCoachRateMutation();

  useEffect(() => {
    if (selectedRow) {
      setFormData({
        rate: selectedRow?.rate,
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
      <div style={{ width: "400px" }}>
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="input-container">
            <label htmlFor="feature_name"> Rate A</label>
            <input
              type="number"
              id="rate"
              name="rate"
              value={formData.rate}
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
        </div>

        <div style={{ marginTop: "30px", textAlign: 'center' }}>
          <button
            className="fifthButton"
            style={{ marginRight: "10px", backgroundColor: "green" }}
            onClick={handleSave}
          // disabled={isUpdating}
          >
            {"Save"}
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

export default UpdateCoachRate;
