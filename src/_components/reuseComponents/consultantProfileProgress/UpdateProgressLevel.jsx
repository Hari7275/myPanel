import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateConsultantProfileProgressMutation } from "../../../_store/api";
import toast from "react-hot-toast";

const UpdateProgressLevel = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    description: selectedRow?.description || "",
    status: selectedRow?.status || "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const [updateService, { isLoadng: isUpdating, error }] =
    useUpdateConsultantProfileProgressMutation();

  useEffect(() => {
    if (selectedRow) {
      setFormData({
        description: selectedRow?.description,
        status: selectedRow?.status,
      });
    }
  }, [selectedRow]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error message when user starts typing
    if (name === "description") {
      setErrorMessage("");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    // Validation: Check if description is empty
    if (!formData.description) {
      setErrorMessage("Description is required.");
      return;
    }
    try {
      const response = await updateService({
        id: selectedRow?.id,
        body: formData,
      });

      if (response?.data?.status == true) {
        toast.success(response?.data?.message);
        onClose();
        return;
      }

      if (response?.data?.status == false) {
        toast.error(response?.data?.message);
        return;
      }
    } catch (error) {
      toast.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div style={{ width: "500px" }}>
        <h2
          className="sub-heading"
          style={{
            marginBottom: "20px",
            display: "block",
            backgroundColor: "#f0f0f0",
          }}
        >
          Edit Update level
        </h2>

        <div className="input-container">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData?.description}
            onChange={handleChange}
            className="info-input"
          />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
        <div className="input-container">
          <label htmlFor="feature_name">Status </label>

          <select
            id="status"
            name="status"
            value={formData?.status}
            onChange={handleChange}
            className="info-input"
            style={{
              width: "100%",
              height: "56px",
              borderRadius: "inherit",
            }}
          >
            <option>Select Status</option>
            <option value="failed">Failed</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div style={{ marginTop: "30px" }}>
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
            onClick={handleSave}
            disabled={isUpdating}
          >
            {"Save"}
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default UpdateProgressLevel;
