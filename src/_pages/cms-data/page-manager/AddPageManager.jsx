import React, { useState } from "react";
import ReactModal from "react-modal";
import { useCreateCmsPageManagerMutation } from "../../../_store/api";
import RichTextEditor from "../../../_components/table/RichTextEditor";
import toast from "react-hot-toast";

const AddPageManager = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    is_published: false,
    meta_keywords: "",
    meta_description: "",

    // Featured Image
    featured_image: null,
    featured_image_alt: "",
    featured_image_title: "",
    featured_image_caption: "",
    featured_image_description: "",
  });

  const [createData, { isLoading }] = useCreateCmsPageManagerMutation();

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

  // Handler for RichTextEditor's onChange event
  const handleDescriptionChange = (html) => {
    setFormData((prevData) => ({ ...prevData, description: html }));
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!formData.slug.trim()) {
      toast.error("Slug is required");
      return;
    }

    const newData = new FormData();

    // Basic Information
    newData.append("title", formData.title);
    newData.append("slug", formData.slug);
    newData.append("description", formData.description);
    newData.append("is_published", formData.is_published ? "1" : "0");
    newData.append("meta_keywords", formData.meta_keywords);
    newData.append("meta_description", formData.meta_description);

    // Featured Image
    if (formData.featured_image) {
      newData.append("featured_image", formData.featured_image);
    }
    newData.append("featured_image_alt", formData.featured_image_alt);
    newData.append("featured_image_title", formData.featured_image_title);
    newData.append("featured_image_caption", formData.featured_image_caption);
    newData.append(
      "featured_image_description",
      formData.featured_image_description
    );

    try {
      const response = await createData({ body: newData }).unwrap();

      if (response.status) {
        toast.success(response.message || "Page added successfully");
        // Reset form
        setFormData({
          title: "",
          slug: "",
          description: "",
          is_published: false,
          meta_keywords: "",
          meta_description: "",
          featured_image: null,
          featured_image_alt: "",
          featured_image_title: "",
          featured_image_caption: "",
          featured_image_description: "",
        });
        onClose();
      } else {
        toast.error(response.message || "Failed to add page");
      }
    } catch (error) {
      console.error("Failed to add new page", error);
      toast.error(error?.data?.message || "Failed to add page");
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
        <h2 className="cms-modal-heading">Add Page </h2>

        <div className="cms-form-wrapper">
          {/* Basic Information */}
          <div className="cms-section">
            <h3 className="cms-section-title">Basic Information</h3>

            <div className="cms-form-group">
              <label className="cms-label">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter page title"
                className="cms-input-field"
                required
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Slug *</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="Enter URL slug"
                className="cms-input-field"
                required
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Description</label>
              <RichTextEditor
                value={formData.description}
                onChange={handleDescriptionChange}
                placeholder="Enter page description here..."
                height="300px"
              />
            </div>
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

          {/* SEO Information */}
          <div className="cms-section">
            <h3 className="cms-section-title">SEO Information</h3>

            <div className="cms-form-group">
              <label className="cms-label">Meta Keywords</label>
              <input
                type="text"
                name="meta_keywords"
                value={formData.meta_keywords}
                onChange={handleChange}
                placeholder="Enter meta keywords"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Meta Description</label>
              <textarea
                name="meta_description"
                value={formData.meta_description}
                onChange={handleChange}
                placeholder="Enter meta description"
                className="cms-textarea"
                rows="3"
              />
            </div>
          </div>

          {/* Featured Image */}
          <div className="cms-section">
            <h3 className="cms-section-title">Featured Image</h3>

            <div className="cms-form-group">
              <label className="cms-label">Featured Image</label>
              <input
                type="file"
                name="featured_image"
                onChange={handleChange}
                className="cms-file-input"
                accept="image/*"
              />
              {formData.featured_image && (
                <span className="cms-file-name">
                  {formData.featured_image.name}
                </span>
              )}
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Alt Text</label>
              <input
                type="text"
                name="featured_image_alt"
                value={formData.featured_image_alt}
                onChange={handleChange}
                placeholder="Enter alt text"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Image Title</label>
              <input
                type="text"
                name="featured_image_title"
                value={formData.featured_image_title}
                onChange={handleChange}
                placeholder="Enter image title"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Caption</label>
              <textarea
                name="featured_image_caption"
                value={formData.featured_image_caption}
                onChange={handleChange}
                placeholder="Enter caption"
                className="cms-textarea"
                rows="2"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Description</label>
              <textarea
                name="featured_image_description"
                value={formData.featured_image_description}
                onChange={handleChange}
                placeholder="Enter description"
                className="cms-textarea"
                rows="3"
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

export default AddPageManager;
