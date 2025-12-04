import React, { useState } from "react";
import ReactModal from "react-modal";
import { useCreateCmsDashboardBannerMutation } from "../../../_store/api";
import "./AddCmsDashboardBanner.css";
import toast from "react-hot-toast";

const AddCmsDashboardBanner = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    is_published: true,
    web_view_image: null,
    web_alt: "",
    web_title: "",
    web_caption: "",
    web_description: "",
    mobile_view_image: null,
    mobile_alt: "",
    mobile_title: "",
    mobile_caption: "",
    mobile_description: "",
  });

  const [createData, { isLoading }] = useCreateCmsDashboardBannerMutation();

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

    newData.append("title", formData.title);
    newData.append("is_published", formData.is_published);

    if (formData.web_view_image) {
      newData.append("web_view_image", formData.web_view_image);
    }
    newData.append("web_alt", formData.web_alt);
    newData.append("web_title", formData.web_title);
    newData.append("web_caption", formData.web_caption);
    newData.append("web_description", formData.web_description);

    if (formData.mobile_view_image) {
      newData.append("mobile_view_image", formData.mobile_view_image);
    }
    newData.append("mobile_alt", formData.mobile_alt);
    newData.append("mobile_title", formData.mobile_title);
    newData.append("mobile_caption", formData.mobile_caption);
    newData.append("mobile_description", formData.mobile_description);

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
      console.log("Failed to add new banner", error);
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
        <h2 className="cms-modal-heading">Add Dashboard Banner</h2>

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
                placeholder="Enter banner title"
                className="cms-input-field"
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

          {/* Web View Section */}
          <div className="cms-section">
            <h3 className="cms-section-title">Web View</h3>

            <div className="cms-form-group">
              <label className="cms-label">Web Image *</label>
              <input
                type="file"
                name="web_view_image"
                onChange={handleChange}
                className="cms-file-input"
                accept="image/*"
              />
              {formData.web_view_image && (
                <span className="cms-file-name">
                  {formData.web_view_image.name}
                </span>
              )}
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Web Alt Text</label>
              <input
                type="text"
                name="web_alt"
                value={formData.web_alt}
                onChange={handleChange}
                placeholder="Enter alt text for web image"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Web Title</label>
              <input
                type="text"
                name="web_title"
                value={formData.web_title}
                onChange={handleChange}
                placeholder="Enter title for web banner"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Web Caption</label>
              <textarea
                name="web_caption"
                value={formData.web_caption}
                onChange={handleChange}
                placeholder="Enter caption for web banner"
                className="cms-textarea"
                rows="3"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Web Description</label>
              <textarea
                name="web_description"
                value={formData.web_description}
                onChange={handleChange}
                placeholder="Enter description for web banner"
                className="cms-textarea"
                rows="4"
              />
            </div>
          </div>

          {/* Mobile View Section */}
          <div className="cms-section">
            <h3 className="cms-section-title">Mobile View</h3>

            <div className="cms-form-group">
              <label className="cms-label">Mobile Image *</label>
              <input
                type="file"
                name="mobile_view_image"
                onChange={handleChange}
                className="cms-file-input"
                accept="image/*"
              />
              {formData.mobile_view_image && (
                <span className="cms-file-name">
                  {formData.mobile_view_image.name}
                </span>
              )}
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Mobile Alt Text</label>
              <input
                type="text"
                name="mobile_alt"
                value={formData.mobile_alt}
                onChange={handleChange}
                placeholder="Enter alt text for mobile image"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Mobile Title</label>
              <input
                type="text"
                name="mobile_title"
                value={formData.mobile_title}
                onChange={handleChange}
                placeholder="Enter title for mobile banner"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Mobile Caption</label>
              <textarea
                name="mobile_caption"
                value={formData.mobile_caption}
                onChange={handleChange}
                placeholder="Enter caption for mobile banner"
                className="cms-textarea"
                rows="3"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Mobile Description</label>
              <textarea
                name="mobile_description"
                value={formData.mobile_description}
                onChange={handleChange}
                placeholder="Enter description for mobile banner"
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

export default AddCmsDashboardBanner;
