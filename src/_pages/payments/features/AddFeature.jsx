import React, { useState } from "react";
import { useCreateFeaturesMutation } from "../../../_store/api";
import { UpdateInputField } from "../../../_components/ui/inputForm";
import ReactModal from "react-modal";

const AddFeature = ({ isOpen, onClose }) => {
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

  const [createFeature, { isLoading }] = useCreateFeaturesMutation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    const newFeature = {
      feature_name: formData?.feature_name,
      description: formData?.description,
      type: formData?.type,
      like_count: Number(formData?.like_count),
      good_vibe_count: Number(formData?.good_vibe_count),
      spotlight_count: Number(formData?.spotlight_count),
      rewind_count: Number(formData?.rewind_count),
      location_change: formData?.location_change === "true",
      age_hide: formData?.age_hide === "true",
      glide_search: formData?.glide_search === "true",
      compliment_count: Number(formData?.compliment_count),
      see_who_likes_you: formData?.see_who_likes_you === "true",
    };

    try {
      await createFeature({ body: newFeature });

      onClose();
    } catch (error) {
      console.error("Failed to add feature", error);
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
          Add Feature
        </h2>
        <div style={{ display: "flex" }}>
          <UpdateInputField
            label=" Feature Name"
            type="text"
            name="feature_name"
            id="feature_name"
            value={formData?.feature_name}
            onChange={handleChange}
            placeholder="Feature Name"
          />
          <UpdateInputField
            label=" Description"
            type="text"
            name="description"
            id="description"
            value={formData?.description}
            onChange={handleChange}
            placeholder="Description"
          />
        </div>

        <div style={{ display: "flex" }}>
          <UpdateInputField
            label="  Like Count"
            type="number"
            name="like_count"
            id="like_count"
            value={formData?.like_count}
            onChange={handleChange}
            placeholder="Like Count"
          />
          <UpdateInputField
            label=" Good Vibe Count"
            type="number"
            name="good_vibe_count"
            id="good_vibe_count"
            value={formData?.good_vibe_count}
            onChange={handleChange}
            placeholder="Good Vibe Count"
          />
        </div>

        <div style={{ display: "flex" }}>
          <UpdateInputField
            label="  Spotlight Count"
            type="number"
            name="spotlight_count"
            id="spotlight_count"
            value={formData?.spotlight_count}
            onChange={handleChange}
            placeholder=" Spotlight Count"
          />
          <UpdateInputField
            label="Rewind Count"
            type="number"
            name="rewind_count"
            id="rewind_count"
            value={formData?.rewind_count}
            onChange={handleChange}
            placeholder="Rewind Count"
          />
        </div>
        <div style={{ display: "flex" }}>
          <UpdateInputField
            label="Compliment Count"
            type="number"
            name="compliment_count"
            id="compliment_count"
            value={formData?.compliment_count}
            onChange={handleChange}
            placeholder="Compliment Count"
          />
          <div className="input-container">
            <label htmlFor="gender">Type</label>
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

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="userProfile-grid-item">
            <label style={{ fontSize: "16px", marginTop: "20px" }}>
              Location Change
            </label>
            <div>
              <input
                type="radio"
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
                name="age_hide"
                value="true"
                checked={formData?.age_hide === "true"}
                onChange={handleChange}
              />
              True
              <input
                type="radio"
                name="age_hide"
                value="false"
                checked={formData?.age_hide === "false"}
                onChange={handleChange}
                style={{ marginLeft: "20px" }}
              />
              False
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="userProfile-grid-item">
            <label style={{ fontSize: "16px", marginTop: "20px" }}>
              Glide Search
            </label>
            <div>
              <input
                type="radio"
                name="glide_search"
                value="true"
                checked={formData?.glide_search === "true"}
                onChange={handleChange}
              />
              True
              <input
                type="radio"
                name="glide_search"
                value="false"
                checked={formData?.glide_search === "false"}
                onChange={handleChange}
                style={{ marginLeft: "20px" }}
              />
              False
            </div>
          </div>

          <div className="userProfile-grid-item">
            <label style={{ fontSize: "16px", marginTop: "20px" }}>
              See Who Likes You
            </label>
            <div>
              <input
                type="radio"
                name="see_who_likes_you"
                value="true"
                checked={formData?.see_who_likes_you === "true"}
                onChange={handleChange}
              />
              True
              <input
                type="radio"
                name="see_who_likes_you"
                value="false"
                checked={formData?.see_who_likes_you === "false"}
                onChange={handleChange}
                style={{ marginLeft: "20px" }}
              />
              False
            </div>
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
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
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

export default AddFeature;
