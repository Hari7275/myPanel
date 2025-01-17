import React, { useState } from "react";
import ReactModal from "react-modal";
import { UpdateInputField } from "../../../_components/ui/inputForm";
import { useCreatefluteMagzineMutation } from "../../../_store/api";

const AddMagazineCategories = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    status: "active",
  });

  const [error, setError] = useState("");

  const [createCard, { isLoading }] = useCreatefluteMagzineMutation();

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "image") {
      setFormData((prevData) => ({
        ...prevData,
        image: files[0],
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    // Create a FormData object
    const form = new FormData();
    form.append("name", formData.name);
    form.append("image", formData.image);
    form.append("status", formData.status);

    try {
      // Check the FormData content before submission
      console.log("Submitting FormData:", {
        name: formData.name,
        status: formData.status,
        image: formData.image,
      });

      // Send the form data to the API
      const response = await createCard(form);

      // Handle the response if needed
      if (response.error) {
        console.error("API error:", response.error);
        setError(response?.error?.data?.message || "An error occurred.");
      } else {
        onClose();
      }
    } catch (error) {
      console.log("Failed to add new magazine category", error);
    }
  };

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div style={{ width: "400px" }}>
        <h2
          className="sub-heading"
          style={{
            marginBottom: "20px",
            display: "block",
            backgroundColor: "#f0f0f0",
            textAlign: "center",
          }}
        >
          Add Magazine Category
        </h2>

        <UpdateInputField
          label="Magazine Name"
          type="text"
          id="name"
          name="name"
          placeholder="Magazine Name"
          value={formData.name}
          onChange={handleChange}
        />

        <UpdateInputField
          label="Image"
          type="file"
          id="image"
          name="image"
          onChange={handleChange}
        />
        {error}
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

export default AddMagazineCategories;
