import React, { useState } from "react";
import ReactModal from "react-modal";
import { useCreateServiceRateMutation } from "../../../_store/api";
import { UpdateInputField } from "../../../_components/ui/inputForm";

const AddServiceRate = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    service_type: "",
    rate_A: "",
    rate_B: "",
    rate_C: "",
    rate_D: "",
    commission: "",
    user_type: "",
    status: "active",
  });

  // calling api

  const [createService, isloading] = useCreateServiceRateMutation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    const newService = {
      service_type: formData.service_type,
      rate_A: formData.rate_A,
      rate_B: formData.rate_B,
      rate_C: formData.rate_C,
      rate_D: formData.rate_D,
      commission: formData.commission,
      user_type: formData.user_type,
      status: formData.status,
    };

    console.log("New Service", newService);

    try {
      await createService({ body: newService });

      onClose();
    } catch (error) {
      console.error("Failed to add feature", error);
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
          Add Service
        </h2>

        <div style={{ display: "flex" }}>
          <UpdateInputField
            label=" Service Type"
            type="number"
            id="service_type"
            name="service_type"
            placeholder="Service Type"
            value={formData.service_type}
            onChange={handleChange}
          />
          <UpdateInputField
            label=" User Type"
            type="number"
            id="user_type"
            name="user_type"
            placeholder="User Type"
            value={formData.user_type}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: "flex" }}>
          <UpdateInputField
            label="Rate A"
            type="number"
            id="rate_A"
            name="rate_A"
            placeholder="Price"
            value={formData.rate_A}
            onChange={handleChange}
          />
          <UpdateInputField
            label="Rate B"
            type="number"
            id="rate_B"
            name="rate_B"
            placeholder="Price"
            value={formData.rate_B}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: "flex" }}>
          <UpdateInputField
            label="Rate C"
            type="number"
            id="rate_C"
            name="rate_C"
            placeholder="Price"
            value={formData.rate_C}
            onChange={handleChange}
          />
          <UpdateInputField
            label="Rate D"
            type="number"
            id="rate_D"
            name="rate_D"
            placeholder="Price"
            value={formData.rate_D}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: "flex" }}>
          <UpdateInputField
            label="Commission"
            type="number"
            id="commission"
            name="commission"
            placeholder="commission"
            value={formData.commission}
            onChange={handleChange}
          />

          <div className="input-container">
            <label htmlFor="type">Status</label>
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
            {"Submit"}
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default AddServiceRate;
