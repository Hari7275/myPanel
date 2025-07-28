import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateProfileProgressMutation } from "../../../_store/api";
import toast from "react-hot-toast";

const UpdateProfileProgress = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    level_name: selectedRow?.level_name || "",
    display_text: selectedRow?.display_text || "",
    level_group: Number(selectedRow?.level_group) || "",
  });

  const [updateService, { isLoadng: isUpdating, errro }] =
    useUpdateProfileProgressMutation();

  useEffect(() => {
    if (selectedRow) {
      setFormData({
        level_name: selectedRow?.level_name,
        display_text: selectedRow?.display_text,
        level_group: Number(selectedRow?.level_group) || "",
      });
    }
  }, [selectedRow]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "level_group" ? Number(value) : value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await updateService({
        id: selectedRow?.id,
        body: formData,
      });

      console.log("response", response);
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
      console.log("API Error", error);
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
          <label htmlFor="level_name">Level Name</label>
          <input
            type="text"
            id="level_name"
            name="level_name"
            value={formData?.level_name}
            onChange={handleChange}
            className="info-input"
          />
        </div>
        <div className="input-container">
          <label htmlFor="feature_name">Display Text</label>
          <input
            type="text"
            id="display_text"
            name="display_text"
            value={formData?.display_text}
            onChange={handleChange}
            className="info-input"
          />
        </div>

        <div className="input-container">
          <label htmlFor="level_group"> Level Group</label>
          <input
            type="text"
            id="level_group"
            name="level_group"
            value={formData?.level_group}
            onChange={handleChange}
            className="info-input"
          />
        </div>

        <div style={{ marginTop: "30px" }}>
          <button
            className="fifthButton"
            style={{ marginRight: "10px", backgroundColor: "green" }}
            onClick={handleSave}
            disabled={isUpdating}
          >
            {"Save"}
          </button>
          <button
            className="fifthButton"
            style={{}}
            onClick={onClose}
          >
            Back
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default UpdateProfileProgress;
