import React, { useState } from "react";
import ReactModal from "react-modal";
import { useCreateCmsSocialIconMutation } from "../../../_store/api";
import toast from "react-hot-toast";

const AddCmsSocialIcon = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    icon: null,
    title: "",
    icon_alt: "",
    icon_title: "",
    icon_caption: "",
    icon_description: "",
    is_published: true,
    display_order: "",
    social_url: "",
  });

  const [createData, { isLoading }] = useCreateCmsSocialIconMutation();

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

    if (formData.icon) {
      newData.append("icon", formData.icon);
    }
    newData.append("title", formData.title);
    newData.append("icon_alt", formData.icon_alt);
    newData.append("icon_title", formData.icon_title);
    newData.append("icon_caption", formData.icon_caption);
    newData.append("icon_description", formData.icon_description);
    newData.append("is_published", formData.is_published);
    newData.append("display_order", formData.display_order);
    newData.append("social_url", formData.social_url);

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
      console.log("Failed to add new social icon", error);
      toast.error("Failed to add social icon");
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
        <h2 className="cms-modal-heading">Add Social Icon</h2>

        <div className="cms-form-wrapper">
          {/* General Information */}
          <div className="cms-section">
            <h3 className="cms-section-title">General Information</h3>

            <div className="cms-form-group">
              <label className="cms-label">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter social platform name (e.g., Facebook, Twitter)"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Social URL *</label>
              <input
                type="url"
                name="social_url"
                value={formData.social_url}
                onChange={handleChange}
                placeholder="Enter social media profile URL"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Display Order *</label>
              <input
                type="number"
                name="display_order"
                value={formData.display_order}
                onChange={handleChange}
                placeholder="Enter display order (e.g., 1, 2, 3...)"
                className="cms-input-field"
                min="0"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label cms-checkbox-label">
                <input
                  type="checkbox"
                  name="is_published"
                  checked={formData.is_published}
                  onChange={handleChange}
                  className="cms-checkbox"
                />
                <span>Published</span>
              </label>
            </div>
          </div>

          {/* Icon Section */}
          <div className="cms-section">
            <h3 className="cms-section-title">Icon Details</h3>

            <div className="cms-form-group">
              <label className="cms-label">Icon Image *</label>
              <input
                type="file"
                name="icon"
                onChange={handleChange}
                className="cms-file-input"
                accept="image/*"
              />
              {formData.icon && (
                <span className="cms-file-name">{formData.icon.name}</span>
              )}
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Icon Alt Text</label>
              <input
                type="text"
                name="icon_alt"
                value={formData.icon_alt}
                onChange={handleChange}
                placeholder="Enter alt text for icon"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Icon Title</label>
              <input
                type="text"
                name="icon_title"
                value={formData.icon_title}
                onChange={handleChange}
                placeholder="Enter title for icon"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Icon Caption</label>
              <textarea
                name="icon_caption"
                value={formData.icon_caption}
                onChange={handleChange}
                placeholder="Enter caption for icon"
                className="cms-textarea"
                rows="3"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Icon Description</label>
              <textarea
                name="icon_description"
                value={formData.icon_description}
                onChange={handleChange}
                placeholder="Enter description for icon"
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

export default AddCmsSocialIcon;
