import React, { useState } from "react";
import ReactModal from "react-modal";
import { UpdateInputField } from "../../../_components/ui/inputForm";
import { useUpdatefluteMagzineMutation } from "../../../_store/api";


const UpdateMagazineCategories = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    id: selectedRow?.id || "",
    name: selectedRow?.name || "",
    image: selectedRow?.image || "",
    status: selectedRow?.status || "active",
  });

  const [updateCard, { isLoading: isUpdating, error }] =
    useUpdatefluteMagzineMutation();

 
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        image: files[0],
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
    formDataToSend.append("name", formData.name);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("status", formData.status);

    try {
      await updateCard({
        id: formData.id,
        body: formDataToSend,
      });

      console.log("first........", formDataToSend);
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
      <div style={{ width: "500px" }}>
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
          Update Promotional Card
        </h2>
        <UpdateInputField
          label="Id"
          type="number"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
          readOnly
        />
        <UpdateInputField
          label="Name"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <UpdateInputField
          label="Card Image"
          type="file"
          id="image"
          name="image"
          onChange={handleChange}
        />

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
            {isUpdating ? "Saving..." : "Save"}
          </button>
        </div>
        {error && <p className="error-message">Error: {error?.message}</p>}
      </div>
    </ReactModal>
  );
};

export default UpdateMagazineCategories;
