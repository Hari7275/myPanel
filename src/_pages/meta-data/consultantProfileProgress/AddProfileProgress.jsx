import React, { useState } from "react";
import ReactModal from "react-modal";
import { useCreateProfileProgressMutation } from "../../../_store/api";
import { UpdateInputField } from "../../../_components/ui/inputForm";
import toast from "react-hot-toast";

const AddProfileProgress = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    level_name: "",
    display_text: "",
    level_group: "",
  });

  const [createService] = useCreateProfileProgressMutation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      return updatedData;
    });
  };

  const validateForm = () => {
    const { level_name, display_text, level_group } = formData;
    if (!level_name || !display_text || !level_group) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    const newService = {
      level_group: Number(formData.level_group),
      display_text: formData.display_text,
      level_name: formData.level_name,
    };

    try {
      const response = await createService({ body: newService }).unwrap(); // Use unwrap() to get the full response

      if (response?.status) {
        toast.success(response.message || "Service added successfully!");
        onClose(); // Close the modal only on success
      } else {
        toast.error(
          response.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("Failed to add service", error);
      toast.error(error?.data?.message || "An unexpected error occurred.");
    }
  };

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
            textAlign: "center",
          }}
        >
          Add Profile Progress
        </h2>

        <div style={{ display: "flex" }}>
          <UpdateInputField
            label="Level Name"
            type="text"
            id="level_name"
            name="level_name"
            placeholder="Level Name"
            value={formData.level_name}
            onChange={handleChange}
          />
          <UpdateInputField
            label="Display Text"
            type="text"
            id="display_text"
            name="display_text"
            placeholder="Display Text"
            value={formData.display_text}
            onChange={handleChange}
          />
        </div>

        <div style={{ width: "100%" }}>
          <UpdateInputField
            label="Level Group"
            type="number"
            id="level_group"
            name="level_group"
            placeholder="Level Group"
            value={formData?.level_group}
            onChange={handleChange}
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
          >
            Submit
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default AddProfileProgress;
