import React, { useState } from "react";
import ReactModal from "react-modal";
import { useCreateCmsFAQsMutation } from "../../../_store/api";

import toast from "react-hot-toast";

const CreateFAQs = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    is_published: true,
    type: "",
    display_order: "",
  });

  const [createData, { isLoading }] = useCreateCmsFAQsMutation();

  const handleChange = (event) => {
    console.log("event", event);
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({ ...prevData, [name]: checked }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const payload = {
      title: formData.title,
      description: formData.description,
      is_published: formData.is_published ? 1 : 0, // Convert boolean to number
      display_order: parseInt(formData.display_order), // Convert string to number
      type: parseInt(formData.type), // Convert string to number
    };

    try {
      const response = await createData({ body: payload }).unwrap();

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
        <h2 className="cms-modal-heading">Add FAQs</h2>

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
              <label className="cms-label">Type *</label>
              <select
                name="type"
                onChange={handleChange}
                placeholder="Select author..."
                isClearable
                className="cms-input-field"
                classNamePrefix="cms-select"
              >
                <option value="0">Collaborator</option>
                <option value="1">Consultant</option>
                <option value="2">User</option>
              </select>
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

export default CreateFAQs;
