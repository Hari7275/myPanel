import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateCmsTheAppPageMutation } from "../../../_store/api";
import RichTextEditor from "../../../_components/table/RichTextEditor";
import toast from "react-hot-toast";

const UpdateTheAppPage = ({ isOpen, onClose, selectedRow }) => {
  console.log("selectedRow", selectedRow);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    is_published: false,
  });

  const [updateData, { isLoading }] = useUpdateCmsTheAppPageMutation();

  // Populate form with existing data when selectedRow changes
  useEffect(() => {
    if (selectedRow) {
      setFormData({
        title: selectedRow.title || "",
        description: selectedRow.description || "",
        is_published:
          selectedRow.is_published === 1 || selectedRow.is_published === true,
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

  // Handler for RichTextEditor's onChange event
  const handleDescriptionChange = (html) => {
    setFormData((prevData) => ({ ...prevData, description: html }));
  };

  const handleSubmit = async () => {
    if (!selectedRow?.id) {
      toast.error("No page ID found");
      return;
    }

    // Validation
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      is_published: formData.is_published ? 1 : 0,
    };

    try {
      const pageId = selectedRow.id || selectedRow.id;
      const response = await updateData({
        id: pageId,
        body: payload,
      }).unwrap();

      if (response.status) {
        toast.success(response.message || "Page updated successfully");
        onClose();
      } else {
        toast.error(response.message || "Failed to update page");
      }
    } catch (error) {
      console.error("Failed to update page", error);
      toast.error(error?.data?.message || "Failed to update page");
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
        <h2 className="cms-modal-heading">Update Page</h2>

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

export default UpdateTheAppPage;
