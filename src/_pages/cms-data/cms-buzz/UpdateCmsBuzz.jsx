import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateCmsBuzzListMutation } from "../../../_store/api";
import RichTextEditor from "../../../_components/table/RichTextEditor";
import toast from "react-hot-toast";

const UpdateCmsBuzz = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    slug: "",
    reference_url: "",
    description: "",
    is_featured: false,
    is_published: false,

    // General Image
    image: null,
    image_alt: "",
    image_title: "",
    image_caption: "",
    image_description: "",

    // Desktop Image
    desktop_image: null,
    desktop_image_alt: "",
    desktop_image_title: "",
    desktop_image_caption: "",
    desktop_image_description: "",

    // Mobile Image
    mobile_image: null,
    mobile_image_alt: "",
    mobile_image_title: "",
    mobile_image_caption: "",
    mobile_image_description: "",
  });

  const [UpdateData, { isLoading }] = useUpdateCmsBuzzListMutation();

  // Populate form data when selectedRow changes
  useEffect(() => {
    if (selectedRow && isOpen) {
      setFormData({
        title: selectedRow.title || "",
        subTitle: selectedRow.subTitle || "",
        // Handle slug object structure
        slug: selectedRow.slug?.current || selectedRow.slug || "",
        reference_url: selectedRow.reference_url || "",
        description: selectedRow.description || "",
        is_featured:
          selectedRow.is_featured === 1 || selectedRow.is_featured === true,
        is_published:
          selectedRow.is_published === 1 || selectedRow.is_published === true,

        // General Image - Keep null, will only update if new file is selected
        image: null,
        image_alt: selectedRow.image?.alt || "",
        image_title: selectedRow.image?.title || "",
        image_caption: selectedRow.image?.caption || "",
        image_description: selectedRow.image?.description || "",

        // Desktop Image
        desktop_image: null,
        desktop_image_alt: selectedRow.desktop_image?.alt || "",
        desktop_image_title: selectedRow.desktop_image?.title || "",
        desktop_image_caption: selectedRow.desktop_image?.caption || "",
        desktop_image_description: selectedRow.desktop_image?.description || "",

        // Mobile Image (note: API uses camelCase 'mobileImage')
        mobile_image: null,
        mobile_image_alt: selectedRow.mobileImage?.alt || "",
        mobile_image_title: selectedRow.mobileImage?.title || "",
        mobile_image_caption: selectedRow.mobileImage?.caption || "",
        mobile_image_description: selectedRow.mobileImage?.description || "",
      });
    }
  }, [selectedRow, isOpen]);

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
    if (!selectedRow?._id) {
      toast.error("Blog ID is missing");
      return;
    }

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
    newData.append("sub_title", formData.subTitle);
    newData.append("slug", formData.slug);
    newData.append("reference_url", formData.reference_url);
    newData.append("description", formData.description);
    newData.append("is_featured", formData.is_featured ? "1" : "0");
    newData.append("is_published", formData.is_published ? "1" : "0");

    // General Image - only append if new file is selected
    if (formData.image) {
      newData.append("image", formData.image);
    }
    newData.append("image_alt", formData.image_alt);
    newData.append("image_title", formData.image_title);
    newData.append("image_caption", formData.image_caption);
    newData.append("image_description", formData.image_description);

    // Desktop Image
    if (formData.desktop_image) {
      newData.append("desktop_image", formData.desktop_image);
    }
    newData.append("desktop_image_alt", formData.desktop_image_alt);
    newData.append("desktop_image_title", formData.desktop_image_title);
    newData.append("desktop_image_caption", formData.desktop_image_caption);
    newData.append(
      "desktop_image_description",
      formData.desktop_image_description
    );

    // Mobile Image
    if (formData.mobile_image) {
      newData.append("mobile_image", formData.mobile_image);
    }
    newData.append("mobile_image_alt", formData.mobile_image_alt);
    newData.append("mobile_image_title", formData.mobile_image_title);
    newData.append("mobile_image_caption", formData.mobile_image_caption);
    newData.append(
      "mobile_image_description",
      formData.mobile_image_description
    );

    try {
      // Pass the blog ID along with the form data
      const response = await UpdateData({
        id: selectedRow._id,
        body: newData,
      }).unwrap();

      if (response.status) {
        toast.success(response.message || "Blog updated successfully");
        onClose();
      } else {
        toast.error(response.message || "Failed to update blog");
      }
    } catch (error) {
      console.error("Failed to update blog", error);
      toast.error(error?.data?.message || "Failed to update blog");
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
        <h2 className="cms-modal-heading">Update Flute Buzz</h2>

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
                placeholder="Enter blog title"
                className="cms-input-field"
                required
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Sub Title</label>
              <input
                type="text"
                name="subTitle"
                value={formData.subTitle}
                onChange={handleChange}
                placeholder="Enter subtitle"
                className="cms-input-field"
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
              <label className="cms-label">Reference URL</label>
              <input
                type="url"
                name="reference_url"
                value={formData.reference_url}
                onChange={handleChange}
                placeholder="https://example.com/blog/post"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Description</label>
              <RichTextEditor
                value={formData.description}
                onChange={handleDescriptionChange}
                placeholder="Enter blog description here..."
                height="300px"
              />
            </div>
          </div>

          {/* Publishing Options */}
          <div className="cms-section">
            <h3 className="cms-section-title">Publishing Options</h3>

            <div className="cms-form-group">
              <label className="cms-label cms-checkbox-label">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleChange}
                  className="cms-checkbox"
                />
                <span>Featured</span>
              </label>
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

          {/* General Image */}
          <div className="cms-section">
            <h3 className="cms-section-title">General Image</h3>

            <div className="cms-form-group">
              <label className="cms-label">Image</label>
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
              {selectedRow?.image?.url && !formData.image && (
                <span className="cms-file-info">
                  Current image exists (upload new to replace)
                </span>
              )}
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Alt Text</label>
              <input
                type="text"
                name="image_alt"
                value={formData.image_alt}
                onChange={handleChange}
                placeholder="Enter alt text"
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
                placeholder="Enter image title"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Caption</label>
              <textarea
                name="image_caption"
                value={formData.image_caption}
                onChange={handleChange}
                placeholder="Enter caption"
                className="cms-textarea"
                rows="2"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Description</label>
              <textarea
                name="image_description"
                value={formData.image_description}
                onChange={handleChange}
                placeholder="Enter description"
                className="cms-textarea"
                rows="3"
              />
            </div>
          </div>

          {/* Desktop Image */}
          <div className="cms-section">
            <h3 className="cms-section-title">Desktop Image</h3>

            <div className="cms-form-group">
              <label className="cms-label">Desktop Image</label>
              <input
                type="file"
                name="desktop_image"
                onChange={handleChange}
                className="cms-file-input"
                accept="image/*"
              />
              {formData.desktop_image && (
                <span className="cms-file-name">
                  {formData.desktop_image.name}
                </span>
              )}
              {selectedRow?.desktop_image?.url && !formData.desktop_image && (
                <span className="cms-file-info">
                  Current image exists (upload new to replace)
                </span>
              )}
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Alt Text</label>
              <input
                type="text"
                name="desktop_image_alt"
                value={formData.desktop_image_alt}
                onChange={handleChange}
                placeholder="Enter alt text"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Image Title</label>
              <input
                type="text"
                name="desktop_image_title"
                value={formData.desktop_image_title}
                onChange={handleChange}
                placeholder="Enter image title"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Caption</label>
              <textarea
                name="desktop_image_caption"
                value={formData.desktop_image_caption}
                onChange={handleChange}
                placeholder="Enter caption"
                className="cms-textarea"
                rows="2"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Description</label>
              <textarea
                name="desktop_image_description"
                value={formData.desktop_image_description}
                onChange={handleChange}
                placeholder="Enter description"
                className="cms-textarea"
                rows="3"
              />
            </div>
          </div>

          {/* Mobile Image */}
          <div className="cms-section">
            <h3 className="cms-section-title">Mobile Image</h3>

            <div className="cms-form-group">
              <label className="cms-label">Mobile Image</label>
              <input
                type="file"
                name="mobile_image"
                onChange={handleChange}
                className="cms-file-input"
                accept="image/*"
              />
              {formData.mobile_image && (
                <span className="cms-file-name">
                  {formData.mobile_image.name}
                </span>
              )}
              {selectedRow?.mobileImage?.url && !formData.mobile_image && (
                <span className="cms-file-info">
                  Current image exists (upload new to replace)
                </span>
              )}
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Alt Text</label>
              <input
                type="text"
                name="mobile_image_alt"
                value={formData.mobile_image_alt}
                onChange={handleChange}
                placeholder="Enter alt text"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Image Title</label>
              <input
                type="text"
                name="mobile_image_title"
                value={formData.mobile_image_title}
                onChange={handleChange}
                placeholder="Enter image title"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Caption</label>
              <textarea
                name="mobile_image_caption"
                value={formData.mobile_image_caption}
                onChange={handleChange}
                placeholder="Enter caption"
                className="cms-textarea"
                rows="2"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Description</label>
              <textarea
                name="mobile_image_description"
                value={formData.mobile_image_description}
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
            {isLoading ? "Updating..." : "Update"}
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

export default UpdateCmsBuzz;
