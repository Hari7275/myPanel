import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateCmsPhotoGuidelinesMutation } from "../../../_store/api";
import RichTextEditor from "../../../_components/table/RichTextEditor";
import toast from "react-hot-toast";

const UpdatePhotoGuidelines = ({ isOpen, onClose, selectedRow }) => {
  console.log("selectedRow", selectedRow);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    pre_description: "",
    description: "",

    // Do Images (6 images)
    do_images: [
      { file: null, alt: "", existing_url: "" },
      { file: null, alt: "", existing_url: "" },
      { file: null, alt: "", existing_url: "" },
      { file: null, alt: "", existing_url: "" },
      { file: null, alt: "", existing_url: "" },
      { file: null, alt: "", existing_url: "" },
    ],

    // Don't Images (6 images)
    do_not_images: [
      { file: null, alt: "", existing_url: "" },
      { file: null, alt: "", existing_url: "" },
      { file: null, alt: "", existing_url: "" },
      { file: null, alt: "", existing_url: "" },
      { file: null, alt: "", existing_url: "" },
      { file: null, alt: "", existing_url: "" },
    ],
  });

  const [updateData, { isLoading }] = useUpdateCmsPhotoGuidelinesMutation();

  // Populate form with existing data when selectedRow changes
  useEffect(() => {
    if (selectedRow) {
      // Parse do images from JSON string
      let doImagesData = [];
      try {
        doImagesData = selectedRow.do ? JSON.parse(selectedRow.do) : [];
      } catch (error) {
        console.error("Error parsing do images:", error);
        doImagesData = [];
      }

      // Parse do_not images from JSON string
      let doNotImagesData = [];
      try {
        doNotImagesData = selectedRow.do_not
          ? JSON.parse(selectedRow.do_not)
          : [];
      } catch (error) {
        console.error("Error parsing do_not images:", error);
        doNotImagesData = [];
      }

      // Prepare do_images array (6 slots)
      const doImages = Array(6)
        .fill(null)
        .map((_, index) => ({
          file: null,
          alt: doImagesData[index]?.alt || "",
          existing_url: doImagesData[index]?.url || "",
        }));

      // Prepare do_not_images array (6 slots)
      const doNotImages = Array(6)
        .fill(null)
        .map((_, index) => ({
          file: null,
          alt: doNotImagesData[index]?.alt || "",
          existing_url: doNotImagesData[index]?.url || "",
        }));

      setFormData({
        title: selectedRow.title || "",
        slug: selectedRow.slug || "",
        pre_description: selectedRow.pre_description || "",
        description: selectedRow.description || "",
        do_images: doImages,
        do_not_images: doNotImages,
      });
    }
  }, [selectedRow]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handler for RichTextEditor's onChange event
  const handlePreDescriptionChange = (html) => {
    setFormData((prevData) => ({ ...prevData, pre_description: html }));
  };

  const handleDescriptionChange = (html) => {
    setFormData((prevData) => ({ ...prevData, description: html }));
  };

  // Handle Do Image File Change
  const handleDoImageChange = (index, event) => {
    const file = event.target.files[0];
    setFormData((prevData) => {
      const newDoImages = [...prevData.do_images];
      newDoImages[index] = { ...newDoImages[index], file };
      return { ...prevData, do_images: newDoImages };
    });
  };

  // Handle Do Image Alt Text Change
  const handleDoAltChange = (index, event) => {
    const alt = event.target.value;
    setFormData((prevData) => {
      const newDoImages = [...prevData.do_images];
      newDoImages[index] = { ...newDoImages[index], alt };
      return { ...prevData, do_images: newDoImages };
    });
  };

  // Handle Don't Image File Change
  const handleDoNotImageChange = (index, event) => {
    const file = event.target.files[0];
    setFormData((prevData) => {
      const newDoNotImages = [...prevData.do_not_images];
      newDoNotImages[index] = { ...newDoNotImages[index], file };
      return { ...prevData, do_not_images: newDoNotImages };
    });
  };

  // Handle Don't Image Alt Text Change
  const handleDoNotAltChange = (index, event) => {
    const alt = event.target.value;
    setFormData((prevData) => {
      const newDoNotImages = [...prevData.do_not_images];
      newDoNotImages[index] = { ...newDoNotImages[index], alt };
      return { ...prevData, do_not_images: newDoNotImages };
    });
  };

  const handleSubmit = async () => {
    if (!selectedRow?.id && !selectedRow?._id) {
      console.error("No page ID found");
      toast.error("No page ID found");
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
    newData.append("slug", formData.slug);
    newData.append("pre_description", formData.pre_description);
    newData.append("description", formData.description);

    // Append Do Images and their Alt Texts
    formData.do_images.forEach((item) => {
      if (item.file) {
        newData.append("do", item.file);
      }
    });

    formData.do_images.forEach((item) => {
      newData.append("do_alt", item.alt || "");
    });

    // Append Don't Images and their Alt Texts
    formData.do_not_images.forEach((item) => {
      if (item.file) {
        newData.append("do_not", item.file);
      }
    });

    formData.do_not_images.forEach((item) => {
      newData.append("do_not_alt", item.alt || "");
    });

    try {
      const pageId = selectedRow.id || selectedRow._id;
      const response = await updateData({
        id: pageId,
        body: newData,
      }).unwrap();

      if (response.status) {
        toast.success(
          response.message || "Photo guidelines updated successfully"
        );
        onClose();
      } else {
        toast.error(response.message || "Failed to update photo guidelines");
      }
    } catch (error) {
      console.error("Failed to update photo guidelines", error);
      toast.error(error?.data?.message || "Failed to update photo guidelines");
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
        <h2 className="cms-modal-heading">Update Photo Guidelines</h2>

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
                placeholder="Enter title"
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
              <label className="cms-label">Pre Description</label>
              <RichTextEditor
                value={formData.pre_description}
                onChange={handlePreDescriptionChange}
                placeholder="Enter pre-description here..."
                height="200px"
              />
            </div>

            <div className="cms-form-group" style={{ marginTop: "80px" }}>
              <label className="cms-label">Description</label>
              <RichTextEditor
                value={formData.description}
                onChange={handleDescriptionChange}
                placeholder="Enter description here..."
                height="200px"
              />
            </div>
          </div>

          {/* Do Images Section */}
          <div className="cms-section">
            <h3 className="cms-section-title">
              Do Images (Best Practices) - 6 Images
            </h3>

            {formData.do_images.map((item, index) => (
              <div key={`do-${index}`} className="cms-image-group">
                <h4 className="cms-subsection-title">Do Image {index + 1}</h4>

                {/* Display existing image if available and no new file selected */}
                {item.existing_url && !item.file && (
                  <div className="cms-form-group">
                    <label className="cms-label">Current Image</label>
                    <div className="cms-existing-image">
                      <img
                        src={item.existing_url}
                        alt={item.alt || `Do image ${index + 1}`}
                        style={{
                          maxWidth: "200px",
                          maxHeight: "200px",
                          objectFit: "contain",
                          border: "1px solid #ddd",
                          padding: "5px",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="cms-form-group">
                  <label className="cms-label">
                    Image File {item.existing_url && "(Upload new to replace)"}
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleDoImageChange(index, e)}
                    className="cms-file-input"
                    accept="image/*"
                  />
                  {item.file && (
                    <span className="cms-file-name">{item.file.name}</span>
                  )}
                </div>

                <div className="cms-form-group">
                  <label className="cms-label">Alt Text</label>
                  <input
                    type="text"
                    value={item.alt}
                    onChange={(e) => handleDoAltChange(index, e)}
                    placeholder={`Enter alt text for Do image ${index + 1}`}
                    className="cms-input-field"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Don't Images Section */}
          <div className="cms-section">
            <h3 className="cms-section-title">
              Don't Images (What to Avoid) - 6 Images
            </h3>

            {formData.do_not_images.map((item, index) => (
              <div key={`do-not-${index}`} className="cms-image-group">
                <h4 className="cms-subsection-title">
                  Don't Image {index + 1}
                </h4>

                {/* Display existing image if available and no new file selected */}
                {item.existing_url && !item.file && (
                  <div className="cms-form-group">
                    <label className="cms-label">Current Image</label>
                    <div className="cms-existing-image">
                      <img
                        src={item.existing_url}
                        alt={item.alt || `Don't image ${index + 1}`}
                        style={{
                          maxWidth: "200px",
                          maxHeight: "200px",
                          objectFit: "contain",
                          border: "1px solid #ddd",
                          padding: "5px",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="cms-form-group">
                  <label className="cms-label">
                    Image File {item.existing_url && "(Upload new to replace)"}
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleDoNotImageChange(index, e)}
                    className="cms-file-input"
                    accept="image/*"
                  />
                  {item.file && (
                    <span className="cms-file-name">{item.file.name}</span>
                  )}
                </div>

                <div className="cms-form-group">
                  <label className="cms-label">Alt Text</label>
                  <input
                    type="text"
                    value={item.alt}
                    onChange={(e) => handleDoNotAltChange(index, e)}
                    placeholder={`Enter alt text for Don't image ${index + 1}`}
                    className="cms-input-field"
                  />
                </div>
              </div>
            ))}
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

export default UpdatePhotoGuidelines;
