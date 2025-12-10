import React, { useState } from "react";
import ReactModal from "react-modal";
import { useCreateCmsBlogCategoriesMutation } from "../../../_store/api";

import toast from "react-hot-toast";

const AddCmsBlogCategories = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    description: "",
    image_alt: "",
    image_title: "",
    image_caption: "",
    image_description: "",
    is_published: true,
    display_order: "",
  });

  const [createData, { isLoading }] = useCreateCmsBlogCategoriesMutation();

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
    newData.append("description", formData.description);
    newData.append("is_published", formData.is_published ? "1" : "0");
    if (formData.image) {
      newData.append("image", formData.image);
    }
    newData.append("display_order", formData.display_order);
    newData.append("image_title", formData.image_title);
    newData.append("image_caption", formData.image_caption);
    newData.append("image_description", formData.image_description);
    newData.append("image_alt", formData.image_alt);

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
      console.log("Failed to add new category", error);
      toast.error("Failed to add category");
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
        <h2 className="cms-modal-heading">Add Blog Category</h2>

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
                placeholder="Enter category title "
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter category description"
                className="cms-textarea"
                rows="4"
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

          {/* Image Section */}
          <div className="cms-section">
            <h3 className="cms-section-title">Image Details</h3>

            <div className="cms-form-group">
              <label className="cms-label">Category Image *</label>
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
              <label className="cms-label">Image Caption</label>
              <textarea
                name="image_caption"
                value={formData.image_caption}
                onChange={handleChange}
                placeholder="Enter caption for image"
                className="cms-textarea"
                rows="3"
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

export default AddCmsBlogCategories;