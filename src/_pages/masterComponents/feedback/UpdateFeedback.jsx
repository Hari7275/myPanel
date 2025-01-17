import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateRechargeMutation } from "../../../_store/api";

const UpdateFeedback = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    feedback: selectedRow?.feedback || "",
    rating: selectedRow?.rating || 0,
  });

  const [updateRecharge, { isLoading: isUpdating, error }] =
    useUpdateRechargeMutation();

  useEffect(() => {
    if (selectedRow) {
      setFormData({
        feedback: selectedRow.feedback,
        discount: selectedRow.rating,
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

  const handleSave = (e) => {
    e.preventDefault();
    updateRecharge({ id: selectedRow.id, body: formData })
      .then((response) => {
        onClose();
      })
      .catch((error) => {
        console.log("API Error", error);
      });
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
            }}
          >
            Edit Feedback
          </h2>
          <form className="simple-form" noValidate autoComplete="off">
            <div className="input-container">
              <label htmlFor="plan_name">Feedback</label>
              <input
                type="text"
                id="feedback"
                name="feedback"
                className="info-input"
                value={formData.feedback}
                onChange={handleChange}
              />
            </div>

            <div className="input-container">
              <label htmlFor="price">Rating</label>
              <input
                type="number"
                id="rating"
                name="rating"
                className="info-input"
                value={formData.rating}
                onChange={handleChange}
              />
            </div>

            <div style={{ marginTop: "20px" }}>
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
          {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
        </div>
      </ReactModal>
    </>
  );
};

export default UpdateFeedback;
