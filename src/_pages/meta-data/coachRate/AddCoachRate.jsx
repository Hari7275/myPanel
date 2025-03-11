import React, { useState } from "react";
import ReactModal from "react-modal";
import { useCreateCoachRateMutation } from "../../../_store/api";
import { UpdateInputField } from "../../../_components/ui/inputForm";
import toast from "react-hot-toast";

const AddCoachRate = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    service_type: "",
    consultant_category: "",
    user_category: "",
    commission: "",
    rate: "",
    user_type: "",
    status: "active",
    currency: "INR",
  });

  const [createService] = useCreateCoachRateMutation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      // Update currency based on the new logic
      if (
        updatedData.consultant_category == "A" &&
        updatedData.user_category == "A"
      ) {
        updatedData.currency = "INR";
      } else {
        updatedData.currency = "USD";
      }

      return updatedData;
    });
  };

  const validateForm = () => {
    const {
      service_type,
      consultant_category,
      user_category,
      rate,
      commission,
      user_type,
    } = formData;
    if (
      !service_type ||
      !consultant_category ||
      !user_category ||
      !rate ||
      !commission ||
      !user_type
    ) {
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
      service_type: Number(formData.service_type),
      consultant_category: formData.consultant_category,
      user_category: formData.user_category,
      commission: Number(formData.commission),
      currency: formData.currency,
      user_type: Number(formData.user_type),
      status: formData.status,
      rate: Number(formData.rate),
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
          Add Rate
        </h2>

        <div style={{ display: "flex" }}>
          <div className="input-container">
            <label htmlFor="user_type">Consultant Type</label>
            <select
              id="user_type"
              name="user_type"
              value={formData.user_type}
              onChange={handleChange}
              className="userProfile-input-field"
              style={{ height: "55px" }}
            >
              <option value="">Select Consultant Type</option>
              <option value="1">Astrologer</option>
              <option value="2">Coach</option>
              <option value="3">Listener</option>
            </select>
          </div>

          {/* if user_type == 3 then show this  */}

          {formData.user_type == 3 ? (
            <div className="input-container">
              <label htmlFor="service_type">Service Type</label>
              <select
                id="service_type"
                name="service_type"
                value={formData.service_type}
                onChange={handleChange}
                className="userProfile-input-field"
                style={{ height: "55px" }}
              >
                <option value="">Select Service Type</option>
                <option value={1}>Chat</option>
                <option value="2">Audio Call</option>
                <option value="3">Video Call</option>
              </select>
            </div>
          ) : (
            <div className="input-container">
              <label htmlFor="service_type">Service Type</label>
              <select
                id="service_type"
                name="service_type"
                value={formData.service_type}
                onChange={handleChange}
                className="userProfile-input-field"
                style={{ height: "55px" }}
              >
                <option value="">Select Service Type</option>
                <option value={1}>Chat</option>
                <option value="2">Audio Call</option>
                <option value="3">Video Call</option>
                <option value="4">Anonymous Call</option>
                <option value="5">Private Call</option>
                {/* <option value={6}>Live</option> */}
                {/*option value={7}>Live Chat</option>*/}
                <option value={8}>Live Audio call</option>
                <option value={9}>Live Video call</option>
                {/* <option value={10}>Session Chat</option> */}
                <option value={11}>Session Audio Call</option>
                <option value={12}>Session Video Call</option>
              </select>
            </div>
          )}
        </div>

        <div style={{ display: "flex" }}>
          <div className="input-container">
            <label htmlFor="consultant_category">Consultant Category</label>
            <select
              id="consultant_category"
              name="consultant_category"
              value={formData.consultant_category}
              onChange={handleChange}
              className="userProfile-input-field"
              style={{ height: "55px" }}
            >
              <option value="">Select Consultant Category</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>

          <div className="input-container">
            <label htmlFor="user_category">User Category</label>
            <select
              id="user_category"
              name="user_category"
              value={formData.user_category}
              onChange={handleChange}
              className="userProfile-input-field"
              style={{ height: "55px" }}
            >
              <option value="">Select User Category</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <UpdateInputField
            label="Rate"
            type="number"
            id="rate"
            name="rate"
            placeholder="Price"
            value={formData.rate}
            onChange={handleChange}
          />
          <UpdateInputField
            label="Commission"
            type="number"
            id="commission"
            name="commission"
            placeholder="Price"
            value={formData.commission}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: "flex" }}>
          <div className="input-container">
            <label htmlFor="currency">Currency</label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="userProfile-input-field"
              style={{ height: "55px" }}
              disabled
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
          </div>

          <div className="input-container">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="userProfile-input-field"
              style={{ height: "55px" }}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
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

export default AddCoachRate;
