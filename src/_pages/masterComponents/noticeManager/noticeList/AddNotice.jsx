import React, { useState } from "react";
import ReactModal from "react-modal";
import { useCreateNoticeMutation } from "../../../../_store/api";
import { UpdateInputField } from "../../../../_components/ui/inputForm";

// Import ReactQuill and its CSS
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // You can choose 'quill.bubble.css' for a different theme

const AddNotice = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    description: "", // This will now hold the HTML content from Quill
    image: null,
  });

  const [createData, { isLoading }] = useCreateNoticeMutation();

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Handler for Quill's onChange event
  const handleDescriptionChange = (html) => {
    setFormData((prevData) => ({ ...prevData, description: html }));
  };

  const handleSubmit = async () => {
    const newData = new FormData();
    newData.append("title", formData?.title);
    newData.append("name", formData?.name);
    newData.append("description", formData?.description); // The HTML content
    newData.append("image", formData?.image || "snake.jpg");

    try {
      await createData({ body: newData });
      onClose();
    } catch (error) {
      console.error("Failed to add new notice:", error); // Use console.error for errors
    }
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
      <div style={{ width: "600px", padding: "20px" }}>
        {" "}
        {/* Increased width for editor */}
        <h2
          className="sub-heading"
          style={{
            marginBottom: "20px",
            display: "block",
            backgroundColor: "#f0f0f0",
            textAlign: "center",
            padding: "10px 0",
          }}
        >
          Add Notice
        </h2>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <UpdateInputField
            label="Notice Title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder=" Notice Title"
          />
          <UpdateInputField
            label="Notice Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder=" Notice Name"
          />
        </div>
        {/* --- React-Quill Editor for Description --- */}
        <div className="userProfile-grid-item" style={{ marginTop: "20px" }}>
          <label
            style={{ fontSize: "20px", marginBottom: "10px", display: "block" }}
          >
            Notice Description
          </label>
          <ReactQuill
            theme="snow"
            value={formData.description}
            onChange={handleDescriptionChange} // Use the specific handler for Quill
            modules={quillModules}
            formats={quillFormats}
            style={{ height: "200px", marginBottom: "50px" }} // Adjust height as needed, add marginBottom for toolbar
            placeholder=" Enter Notice Description here..."
          />
        </div>
        {/* --- End React-Quill Editor --- */}
        <div className="userProfile-grid-item" style={{ marginTop: "20px" }}>
          {" "}
          {/* Adjusted margin-top for image field */}
          <label style={{ fontSize: "20px", marginTop: "20px" }}>Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="userProfile-input-field"
          />
        </div>
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <button
            className="fifthButton"
            style={{ marginRight: "10px" }}
            onClick={onClose}
          >
            Back
          </button>

          <button
            className="fifthButton"
            style={{ backgroundColor: "green" }}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default AddNotice;
