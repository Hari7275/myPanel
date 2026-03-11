import React, { useState } from "react";
import ReactModal from "react-modal";
import { useCreateCmsListenerBannerMutation } from "../../../_store/api";
import "../cms-dashboard-banner/AddCmsDashboardBanner.css";
import toast from "react-hot-toast";

const AddCmsListenerBanner = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    is_published: false,
    image: null,
    image_alt: "",
    image_title: "",
    image_caption: "",
    image_description: "",
  });

  const [createData, { isLoading }] = useCreateCmsListenerBannerMutation();

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
    newData.append("is_published", formData.is_published ? 1 : 0);

    if (formData.image) {
      newData.append("image", formData.image);
    }
    newData.append("image_alt", formData.image_alt);
    newData.append("image_title", formData.image_title);
    newData.append("image_caption", formData.image_caption);
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
      console.log("Failed to add new listener banner", error);
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
        <h2 className="cms-modal-heading">Add Listener Banner</h2>

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
              <div className="cms-label cms-checkbox-label">
                <input
                  type="checkbox"
                  name="is_published"
                  checked={formData.is_published}
                  onChange={handleChange}
                  className="cms-checkbox"
                />
                <span>Published</span>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="cms-section">
            <h3 className="cms-section-title">Banner Image</h3>

            <div className="cms-form-group">
              <label className="cms-label">Image *</label>
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
              <label className="cms-label">Alt Text</label>
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
              <label className="cms-label">Caption</label>
              <textarea
                name="image_caption"
                value={formData.image_caption}
                onChange={handleChange}
                placeholder="Enter caption for banner"
                className="cms-textarea"
                rows="3"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Description</label>
              <textarea
                name="image_description"
                value={formData.image_description}
                onChange={handleChange}
                placeholder="Enter description for banner"
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
            disabled={isLoading || !formData.title || !formData.image}
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

export default AddCmsListenerBanner;
