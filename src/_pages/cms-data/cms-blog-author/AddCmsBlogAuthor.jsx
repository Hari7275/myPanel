import React, { useState } from "react";
import ReactModal from "react-modal";
import { useCreateCmsBlogAuthorMutation } from "../../../_store/api";
import toast from "react-hot-toast";

const AddCmsBlogAuthor = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    image: null,
    name: "",
    position: "",
    bio: "",
    image_alt: "",
    image_title: "",
    image_description: "",
    is_active: true,
  });

  const [createData, { isLoading }] = useCreateCmsBlogAuthorMutation();

  const handleChange = (event) => {
    const { name, value, type, files, checked } = event.target;

    if (type === "file") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else if (type === "checkbox") {
      setFormData((prevData) => ({ ...prevData, [name]: checked }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const newData = new FormData();

    newData.append("name", formData.name);
    newData.append("position", formData.position);
    newData.append("bio", formData.bio);
    newData.append("is_active", formData.is_active ? "1" : "0");
    if (formData.image) {
      newData.append("image", formData.image);
    }
    newData.append("image_title", formData.image_title);
    newData.append("image_alt", formData.image_alt);
    newData.append("image_description", formData.image_description);

    try {
      const response = await createData({ body: newData }).unwrap();

      if (response.status) {
        toast.success(response.message);
        onClose();
      } else {
        toast.error(response.message);
        return;
      }
    } catch (error) {
      console.log("Failed to add new author", error);
      toast.error("Failed to add author");
    }
  };

  return (
    <ReactModal
      className="cms-modal"
      overlayClassName="cms-overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div className="cms-modal-container">
        <h2 className="cms-modal-heading">Add Author</h2>

        <div className="cms-form-wrapper">
          {/* General Information */}
          <div className="cms-section">
            <h3 className="cms-section-title">General Information</h3>

            <div className="cms-form-group">
              <label className="cms-label">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter author name"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Position *</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Enter author position (e.g., a Flute User)"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Bio *</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Enter author bio"
                className="cms-textarea"
                rows="4"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label cms-checkbox-label">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                  className="cms-checkbox"
                />
                <span>Active</span>
              </label>
            </div>
          </div>

          {/* Image Section */}
          <div className="cms-section">
            <h3 className="cms-section-title">Image Details</h3>

            <div className="cms-form-group">
              <label className="cms-label">Author Image *</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="cms-file-input"
                accept="image/*"
              />
              {formData.image && (
                <span className="cms-file-name">{formData.image.name}</span>
              )}
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Image Alt Text</label>
              <input
                type="text"
                name="image_alt"
                value={formData.image_alt}
                onChange={handleChange}
                placeholder="Enter alt text for image"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Image Title</label>
              <input
                type="text"
                name="image_title"
                value={formData.image_title}
                onChange={handleChange}
                placeholder="Enter title for image"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Image Description</label>
              <textarea
                name="image_description"
                value={formData.image_description}
                onChange={handleChange}
                placeholder="Enter description for image"
                className="cms-textarea"
                rows="4"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="cms-button-group">
          <button
            className="cms-btn cms-btn-submit"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
          <button
            className="cms-btn cms-btn-cancel"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default AddCmsBlogAuthor;
