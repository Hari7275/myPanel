import React, { useState } from "react";
import ReactModal from "react-modal";
import { useCreateCmsTestimonialMutation } from "../../../_store/api";
import RichTextEditor from "../../../_components/table/RichTextEditor";
import toast from "react-hot-toast";

const CreateTestimonial = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author_name: "",
    is_published: false,
  });

  const [createData, { isLoading }] = useCreateCmsTestimonialMutation();

  //   const handleChange = (event) => {
  //     const { name, value } = event.target;

  //     setFormData((prevData) => ({ ...prevData, [name]: value }));
  //   };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
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

    const payload = {
      title: formData.title,
      description: formData.description,
      author_name: formData.author_name,
      is_active: 1,
      is_published: formData.is_published ? 1 : 0,
    };

    try {
      const response = await createData({ body: payload }).unwrap();

      if (response.status) {
        toast.success(response.message || "Page added successfully");
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
              <label className="cms-label">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter category description"
                className="cms-textarea"
                rows="6"
              />
            </div>

            <div className="cms-form-group" style={{ paddingTop: "40px" }}>
              <label className="cms-label">Author Name</label>
              <input
                type="text"
                name="author_name"
                value={formData.author_name}
                onChange={handleChange}
                placeholder="Enter author name"
                className="cms-input-field"
                required
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

export default CreateTestimonial;
