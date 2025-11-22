import React, { useState, useRef } from "react";
import ReactModal from "react-modal";
import { useUploadCsvLeadsFileMutation } from "../../../../_store/api";
import toast from "react-hot-toast";

const UploadsLeadsData = ({ isOpen, onClose }) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null); // Use ref instead of getElementById

  const [uploadMarketLeads, { isLoading }] = useUploadCsvLeadsFileMutation();

  const handleUploadFile = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    toast.success("File selected: " + selectedFile.name);
  };

  const handleSave = async () => {
    if (!file) {
      toast.error("Please select a file before uploading");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await uploadMarketLeads(formData);

      if (response?.data?.status) {
        toast.success(response.data.message || "File uploaded successfully");
        resetAndClose();
      } else {
        toast.error(response?.data?.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading file");
    }
  };

  // Reset function to clear both state and input
  const resetAndClose = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input value
    }
    onClose();
  };

  // Reset state when modal opens/closes
  const handleModalClose = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClose();
  };

  // Clear file selection
  const handleClearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (!isOpen) return null;

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={handleModalClose}
    >
      <div style={{ width: "500px" }}>
        <h2 className="top-main-heading">Upload CSV File</h2>

        <div className="simple-form" style={{ padding: "20px 0" }}>
          {/* Hidden file input with ref */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            style={{ display: "none" }}
            onChange={handleUploadFile}
          />

          <div className="addImageContainer">
            <div
              style={{
                background: "#fff",
                borderRadius: "50%",
                textAlign: "center",
                width: "50px",
                height: "50px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #ddd",
                transition: "all 0.3s ease",
              }}
              onClick={() => fileInputRef.current?.click()}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#4CAF50";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#ddd";
              }}
            >
              <span style={{ fontSize: "35px", color: "#4CAF50" }}>+</span>
            </div>
          </div>

          {file && (
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              <p>
                Selected File: <b>{file.name}</b>
              </p>
              <button
                type="button"
                onClick={handleClearFile}
                style={{
                  background: "none",
                  border: "none",
                  color: "#f44336",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontSize: "12px",
                  marginTop: "5px",
                }}
              >
                Clear selection
              </button>
            </div>
          )}

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              type="button"
              className="fifthButton"
              style={{
                backgroundColor: "green",
                marginRight: "10px",
                opacity: isLoading || !file ? 0.6 : 1,
                cursor: isLoading || !file ? "not-allowed" : "pointer",
              }}
              onClick={handleSave}
              disabled={isLoading || !file}
            >
              {isLoading ? "Uploading..." : "Upload"}
            </button>

            <button
              type="button"
              className="fifthButton"
              style={{ backgroundColor: "red" }}
              onClick={handleModalClose}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default UploadsLeadsData;
