import React, { useState } from "react";
import ReactModal from "react-modal";
import { useCreateConsultantSupportExecutiveMutation } from "../../../../_store/api";
import toast from "react-hot-toast";

const AddConsultantSupport = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    category: "",
  });

  const [createData, { isLoading }] =
    useCreateConsultantSupportExecutiveMutation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    const newData = {
      phone: formData?.phone,
      name: formData?.name,
      category: formData?.category,
    };

    try {
      const response = await createData({ body: newData });
      if (response?.data?.status == true) {
        toast.success(response?.data?.message);
        onClose();
      }

      if (response?.data?.status == false) {
        toast.error(response?.data?.message);
        return;
      }
      if (response?.error?.data?.status == false) {
        toast.error(response?.error?.data?.message);
        return;
      }
    } catch (error) {
      console.log("Failed to add new report reason", error);
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
          Add Consultant Support Excuative
        </h2>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="userProfile-input-field"
            required
          >
            <option value="">Select Category</option>
            <option value="payment">Payment</option>
            <option value="profile">Profile</option>
            <option value="technical">Technical</option>
          </select>
        </div>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Excuative Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={formData?.phone}
            onChange={handleChange}
            placeholder="Excuative Phone Number"
            className="userProfile-input-field"
          />
        </div>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Excuative name
          </label>
          <input
            type="text"
            name="name"
            value={formData?.name}
            onChange={handleChange}
            placeholder="name"
            className="userProfile-input-field"
          />
        </div>

        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <button
            className="fifthButton"
            style={{ marginRight: "10px", backgroundColor: "green" }}
            onClick={handleSubmit}
          >
            {"Submit"}
          </button>
          <button className="fifthButton" style={{}} onClick={onClose}>
            Back
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default AddConsultantSupport;
