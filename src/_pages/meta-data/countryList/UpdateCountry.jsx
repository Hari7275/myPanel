import React, { useState } from "react";
import ReactModal from "react-modal";
import { UpdateInputField } from "../../../_components/ui/inputForm";
import { useUpdateCountryListMutation } from "../../../_store/api";

const UpdateCountry = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    id: selectedRow?.id || "",
    country_name: selectedRow?.country_name || "",
    image: selectedRow?.image || "",
  });

  const [updateCountry, { isLoading: isUpdating, error }] =
    useUpdateCountryListMutation();

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
    formDataToSend.append("country_name", formData.country_name);
    formDataToSend.append("image", formData.image);

    try {
      await updateCountry({
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
          Update Country List
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <UpdateInputField
            label="Id"
            id="id"
            name="id"
            value={formData.id}
            readOnly
            disabled
          />
          <UpdateInputField
            label="Country Name"
            type="text"
            id="country_name"
            name="country_name"
            value={formData.country_name}
            onChange={handleChange}
          />
          <UpdateInputField
            label="Card Image"
            type="file"
            id="image"
            name="image"
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

export default UpdateCountry;
