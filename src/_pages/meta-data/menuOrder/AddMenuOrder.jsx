import React, { useState } from "react";
import ReactModal from "react-modal";
import { UpdateInputField } from "../../../_components/ui/inputForm";
import { useCreatemenuOrderMutation } from "../../../_store/api";

const AddMenuOrder = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    parent_id: 0,
    title: "",
    icon: null,
    status: 1,
    navigate: "",
  });

  const [error, setError] = useState("");

  const [createMenuItem, { isLoading }] = useCreatemenuOrderMutation();

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "icon") {
      setFormData((prevData) => ({
        ...prevData,
        icon: files[0],
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const form = new FormData();
    form.append("parent_id", formData.parent_id);
    form.append("title", formData.title);
    form.append("icon", formData.icon);
    form.append("status", formData.status);
    form.append("navigate", formData.navigate);

    try {
      // Log the FormData content
      console.log("Submitting FormData:", {
        title: formData.title,
        status: formData.status,
        icon: formData.icon,
      });

      // Send the form data to the API
      const response = await createMenuItem(form).unwrap();

      // Handle the response if needed
      if (response.error) {
        console.error("API error:", response.error);
        setError(response?.error?.data?.message || "An error occurred.");
      } else {
        setError("");
        onClose();
      }
    } catch (error) {
      console.log("Failed to add new menu order", error);
      setError("An error occurred while submitting.");
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
          Add Menu Item
        </h2>
        <UpdateInputField
          label="Parent Id"
          type="number"
          id="parent_id"
          name="parent_id"
          placeholder="Parent Id"
          value={formData.parent_id}
          onChange={handleChange}
        />
        <UpdateInputField
          label="Menu Title"
          type="text"
          id="title"
          name="title"
          placeholder="Item Title"
          value={formData.title}
          onChange={handleChange}
        />
        <UpdateInputField
          label="Menu Navigate"
          type="text"
          id="navigate"
          name="navigate"
          placeholder="Navigate"
          value={formData.navigate} // Corrected value
          onChange={handleChange}
        />
        <UpdateInputField
          label="Icon"
          type="file"
          id="icon"
          name="icon"
          onChange={handleChange}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        {/* Display error if any */}
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

export default AddMenuOrder;
