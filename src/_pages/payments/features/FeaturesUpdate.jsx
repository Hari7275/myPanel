import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateFeaturesMutation } from "../../../_store/api";
import { UpdateInputField } from "../../../_components/ui/inputForm";

const FeaturesUpdate = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    feature_name: "",
    description: "",
    type: "subscription",
    like_count: "",
    good_vibe_count: "",
    spotlight_count: "",
    rewind_count: "",
    location_change: "true",
    age_hide: "true",
    glide_search: "true",
    compliment_count: "",
    see_who_likes_you: "true",
  });

  const [updateFeature, { isLoading: isUpdating, error }] =
    useUpdateFeaturesMutation();

  useEffect(() => {
    if (selectedRow) {
      setFormData({
        feature_name: selectedRow?.feature_name || "",
        description: selectedRow?.description || "",
        type: selectedRow?.type || "subscription",
        like_count: selectedRow?.like_count || "",
        good_vibe_count: selectedRow?.good_vibe_count || "",
        spotlight_count: selectedRow?.spotlight_count || "",
        rewind_count: selectedRow?.rewind_count || "",
        location_change: selectedRow?.location_change ? "true" : "false",
        age_hide: selectedRow?.age_hide ? "true" : "false",
        glide_search: selectedRow?.glide_search ? "true" : "false",
        compliment_count: selectedRow?.compliment_count || "",
        see_who_likes_you: selectedRow?.see_who_likes_you ? "true" : "false",
      });
    }
  }, [selectedRow]);

  const handleChange = (e) => {
    const { name, value } = e?.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateFeature({
        id: selectedRow?.id,
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
          Edit Feature
        </h2>
        <div style={{ display: "flex" }}>
          <div className="input-container">
            <label htmlFor="feature_name">Feature Name</label>
            <input
              type="text"
              id="feature_name"
              name="feature_name"
              value={formData?.feature_name}
              onChange={handleChange}
              className="info-input"
            />
          </div>

          <div className="input-container">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData?.description}
              onChange={handleChange}
              className="info-input"
            />
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div className="input-container">
            <label htmlFor="like_count">Like Count</label>
            <input
              type="number"
              id="like_count"
              name="like_count"
              value={formData?.like_count}
              onChange={handleChange}
              className="info-input"
            />
          </div>

          <div className="input-container">
            <label htmlFor="good_vibe_count">Good Vibe Count</label>
            <input
              type="number"
              id="good_vibe_count"
              name="good_vibe_count"
              value={formData?.good_vibe_count}
              onChange={handleChange}
              className="info-input"
            />
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div className="input-container">
            <label htmlFor="spotlight_count">Spotlight Count</label>
            <input
              type="number"
              id="spotlight_count"
              name="spotlight_count"
              value={formData?.spotlight_count}
              onChange={handleChange}
              className="info-input"
            />
          </div>

          <div className="input-container">
            <label htmlFor="rewind_count">Rewind Count</label>
            <input
              type="number"
              id="rewind_count"
              name="rewind_count"
              value={formData?.rewind_count}
              onChange={handleChange}
              className="info-input"
            />
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div className="input-container">
            <label htmlFor="compliment_count">Compliment Count</label>
            <input
              type="number"
              id="compliment_count"
              name="compliment_count"
              value={formData?.compliment_count}
              onChange={handleChange}
              className="info-input"
            />
          </div>

          <div className="input-container">
            <label htmlFor="type">Type</label>
            <select
              id="type"
              name="type"
              value={formData?.type}
              onChange={handleChange}
              className="info-input"
              style={{
                width: "100%",
                height: "56px",
                borderRadius: "inherit",
              }}
            >
              <option value="subscription">Subscription</option>
              <option value="dating">Dating</option>
            </select>
          </div>
        </div>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "16px", marginTop: "20px" }}>
            Location Change
          </label>
          <div>
            <input
              type="radio"
              id="location_change_true"
              name="location_change"
              value="true"
              checked={formData?.location_change === "true"}
              onChange={handleChange}
            />
            True
            <input
              type="radio"
              name="location_change"
              value="false"
              id="location_change_false"
              checked={formData?.location_change === "false"}
              onChange={handleChange}
              style={{ marginLeft: "20px" }}
            />
            False
          </div>
        </div>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "16px", marginTop: "20px" }}>
            Age Hide
          </label>
          <div>
            <input
              type="radio"
              id="age_hide_true"
              name="age_hide"
              value="true"
              checked={formData?.age_hide === "true"}
              onChange={handleChange}
            />
            <label htmlFor="age_hide_true">True</label>
            <input
              type="radio"
              id="age_hide_false"
              name="age_hide"
              value="false"
              checked={formData?.age_hide === "false"}
              onChange={handleChange}
              style={{ marginLeft: "20px" }}
            />
            <label htmlFor="age_hide_false">False</label>
          </div>
        </div>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "16px", marginTop: "20px" }}>
            Glide Search
          </label>
          <div>
            <input
              type="radio"
              id="glide_search_true"
              name="glide_search"
              value="true"
              checked={formData?.glide_search === "true"}
              onChange={handleChange}
            />
            <label htmlFor="glide_search_true">True</label>
            <input
              type="radio"
              id="glide_search_false"
              name="glide_search"
              value="false"
              checked={formData?.glide_search === "false"}
              onChange={handleChange}
              style={{ marginLeft: "20px" }}
            />
            <label htmlFor="glide_search_false">False</label>
          </div>
        </div>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "16px", marginTop: "20px" }}>
            See Who Likes You
          </label>
          <div>
            <input
              type="radio"
              id="see_who_likes_you_true"
              name="see_who_likes_you"
              value="true"
              checked={formData?.see_who_likes_you === "true"}
              onChange={handleChange}
            />
            <label htmlFor="see_who_likes_you_true">True</label>
            <input
              type="radio"
              id="see_who_likes_you_false"
              name="see_who_likes_you"
              value="false"
              checked={formData?.see_who_likes_you === "false"}
              onChange={handleChange}
              style={{ marginLeft: "20px" }}
            />
            <label htmlFor="see_who_likes_you_false">False</label>
          </div>
        </div>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            className="fifthButton"
            style={{ marginRight: "10px", backgroundColor: "green" }}
            onClick={handleSave}
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save"}
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

export default FeaturesUpdate;
