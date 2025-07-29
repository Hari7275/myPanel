import React, { useState } from "react";
import ReactModal from "react-modal";
import { UpdateInputField } from "../../../_components/ui/inputForm";
import { useUpdatemenuOrderMutation } from "../../../_store/api";

const UpdateMenuOrder = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    id: selectedRow?.id || "",
    parent_id: selectedRow?.parent_id,
    title: selectedRow?.title || "",
    icon: selectedRow?.icon || "",
    // status: selectedRow?.status || "active",
  });

  const [updateMenuOrder, { isLoading: isUpdating, error }] =
    useUpdatemenuOrderMutation();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "icon" && files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        icon: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("parent_id", formData.parent_id);
    formDataToSend.append("icon", formData.icon);
    // formDataToSend.append("status", formData.status);

    try {
      await updateMenuOrder({
        id: formData.id,
        body: formDataToSend,
      });

      onClose();
    } catch (error) {
      console.error("API Error", error);
    }
  };

  if (!isOpen) return null;

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
      aria-labelledby="update-promotional-card-title"
    >
      <div style={{ width: "400px" }}>
        <h2
          className="sub-heading"
          id="update-promotional-card-title"
          style={{
            marginBottom: "20px",
            display: "block",
            backgroundColor: "#f0f0f0",
            textAlign: "center",
          }}
        >
          Update menu items
        </h2>
        {/* <UpdateInputField
          label="Id"
          type="number"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
          readOnly
        /> */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <UpdateInputField
            label="Parent id"
            type="number"
            id="parent_id"
            name="parent_id"
            value={formData.parent_id}
            onChange={handleChange}
          />

          <UpdateInputField
            label="Title"
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <UpdateInputField
            label="item Icon"
            type="file"
            id="icon"
            name="icon"
            onChange={handleChange}
          />
        </div>

        <div style={{ marginTop: "30px", textAlign: 'center' }}>
          <button
            className="fifthButton"
            style={{ marginRight: "10px", backgroundColor: "green" }}
            onClick={handleSave}
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save"}
          </button>
          <button
            className="fifthButton"
            style={{}}
            onClick={onClose}
          >
            Back
          </button>
        </div>
        {error && <p className="error-message">Error: {error?.message}</p>}
      </div>
    </ReactModal>
  );
};

export default UpdateMenuOrder;
