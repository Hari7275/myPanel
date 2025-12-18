import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateCmsFAQsMutation } from "../../../_store/api";

import toast from "react-hot-toast";

const UpdateFAQs = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    is_published: true,
    display_order: "",
    type: "",
  });

  const [updateData, { isLoading }] = useUpdateCmsFAQsMutation();

  // Populate form with existing data when selectedRow changes
  useEffect(() => {
    if (selectedRow) {
      setFormData({
        title: selectedRow.title || "",
        description: selectedRow.description || "",
        is_published:
          selectedRow.is_published !== undefined
            ? selectedRow.is_published
            : true,
        display_order: selectedRow.display_order || "",
        type: selectedRow.type || "",
      });
    }
  }, [selectedRow]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({ ...prevData, [name]: checked }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!selectedRow?.id) {
      console.error("No category ID found");
      toast.error("No category ID found");
      return;
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      is_published: formData.is_published ? 1 : 0, // Convert boolean to number
      display_order: parseInt(formData.display_order), // Convert string to number
      type: parseInt(formData.type), // Convert string to number
    };

    try {
      const response = await updateData({
        id: selectedRow.id,
        body: payload,
      }).unwrap();

      if (response.status) {
        toast.success(response.message);
        onClose();
      } else {
        toast.error(response.message);
        return;
      }
    } catch (error) {
      console.log("Failed to update category", error);
      toast.error("Failed to update category");
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
        <h2 className="cms-modal-heading">Update Blog Category</h2>

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
                placeholder="Enter category title (e.g., JavaScript, Technology)"
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
                value={formData.type}
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

export default UpdateFAQs;
