import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";

import { toast } from "react-hot-toast";
// Import ReactQuill and its CSS
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // You can choose 'quill.bubble.css' for a different theme

const UpdateParticularNotice = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    description: selectedRow.description || "",
  });
  const handleDescriptionChange = (html) => {
    setFormData((prevData) => ({ ...prevData, description: html }));
  };
  const handleSubmit = async () => {
    // Extract assign_id values from selected consultants
  };

  // Quill modules and formats configuration
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["link", "image", "video"], // Added video for more rich content options
      ["clean"], // Remove formatting button
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "script",
    "indent",
    "direction",
    "color",
    "background",
    "font",
    "align",
    "link",
    "image",
    "video",
  ];

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div style={{ minWidth: "500px", minHeight: "500px" }}>
        <h2
          htmlFor="categories"
          className="sub-heading"
          style={{
            marginBottom: "20px",
            display: "block",
            backgroundColor: "#f0f0f0",
            textAlign: "center",
            padding: "10px 0",
          }}
        >
          Update Paricular Notice
        </h2>
        <div
          className="input-container"
          style={{ width: "unset", marginTop: "20px" }}
        >
          <ReactQuill
            theme="snow"
            value={formData.description}
            onChange={handleDescriptionChange} // Use the specific handler for Quill
            modules={quillModules}
            formats={quillFormats}
            style={{ minHeight: "400px", marginBottom: "50px" }} // Adjust height as needed, add marginBottom for toolbar
            placeholder=" Enter Notice Description here..."
          />
        </div>
      </div>

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <button
          className="fifthButton"
          style={{ backgroundColor: "green" }}
          onClick={handleSubmit}
          // disabled={isLoading}
        >
          Submit
          {/* {isLoading ? "Submitting..." : "Submit"} */}
        </button>
      </div>
    </ReactModal>
  );
};

export default UpdateParticularNotice;
