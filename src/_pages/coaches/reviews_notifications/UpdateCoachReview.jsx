import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateReviewMutation } from "../../../_store/api";

const UpdateCoachReview = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    user_id: selectedRow?.user_id || "",
    rating: selectedRow?.rating || "",
    review_text: selectedRow?.review_text || "",
  });

  const [updateReviews, { isLoadng: isUpdating, error }] =
    useUpdateReviewMutation();

  useEffect(() => {
    if (selectedRow) {
      setFormData({
        rate_B: selectedRow?.rate_B,
        rating: selectedRow?.rating,
        review_text: selectedRow?.review_text,
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
      await updateReviews({
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
            textAlign: "center",
          }}
        >
          Update Reviews
        </h2>

        <div className="input-container">
          <label htmlFor="feature_name">User Id</label>
          <input
            type="number"
            id="user_id"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            className="info-input"
          />
        </div>
        <div className="input-container">
          <label htmlFor="feature_name">Rating</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="info-input"
          />
        </div>
        <div className="input-container">
          <label htmlFor="feature_name">Review Text</label>
          <input
            type="text"
            id="review_text"
            name="review_text"
            value={formData.review_text}
            onChange={handleChange}
            className="info-input"
          />
        </div>

        <div style={{ marginTop: "30px" }}>
          <button
            className="fifthButton"
            style={{ backgroundColor: "green", marginRight: "10px" }}
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

export default UpdateCoachReview;
