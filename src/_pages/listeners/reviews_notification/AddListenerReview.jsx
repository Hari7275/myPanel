import React, { useState } from "react";
import ReactModal from "react-modal";
import { useCreateReviewMutation } from "../../../_store/api";

const AddListenerReview = ({ isOpen, onClose, coachId }) => {
  const [formData, setFormData] = useState({
    order_id: "",
    user_id: "",
    rating: "",
    review_text: "",
    order_type: "order",
  });

  const [createReview, isloading] = useCreateReviewMutation();
  const [ratingError, setRatingError] = useState("");

  console.log("listener id", coachId);
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "rating") {
      if (value > 5 || value < 0) {
        setRatingError("Rating must be between 1 and 5");
        return;
      } else {
        setRatingError("");
      }
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    const { rating } = formData;

    // Final check for rating before submission
    if (rating < 1 || rating > 5) {
      setRatingError("Rating must be between 1 and 5");
      return;
    }

    const newReview = {
      coach_id: coachId,
      order_id: formData.order_id,
      user_id: formData.user_id,
      rating: formData.rating,
      review_text: formData.review_text,
      order_type: formData.order_type,
    };

    try {
      await createReview({ body: newReview });
      onClose();
    } catch (error) {
      console.log("Failed to add new review", error);
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
          Add Review
        </h2>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Order Id
          </label>
          <input
            type="number"
            name="order_id"
            value={formData.order_id}
            onChange={handleChange}
            placeholder="order_id"
            className="userProfile-input-field"
          />
        </div>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>User Id</label>
          <input
            type="number"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            placeholder="user_id"
            className="userProfile-input-field"
          />
        </div>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>Rating</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="rating"
            className="userProfile-input-field"
            max={5}
          />
        </div>
        {/* Display error message for rating */}
        {ratingError && (
          <div style={{ color: "red", marginTop: "5px" }}>{ratingError}</div>
        )}

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Review Text
          </label>
          <input
            type="text"
            name="review_text"
            value={formData.review_text}
            onChange={handleChange}
            placeholder="review_text"
            className="userProfile-input-field"
          />
        </div>

        <div className="input-container">
          <label htmlFor="currency">Order Type</label>
          <select
            id="order_type"
            name="order_type"
            value={formData.order_type}
            onChange={handleChange}
            className="userProfile-input-field"
            style={{ height: "55px" }}
          >
            <option value="order">Order</option>
            <option value="session">Session</option>
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

export default AddListenerReview;
